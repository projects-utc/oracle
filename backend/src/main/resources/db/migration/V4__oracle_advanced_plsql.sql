-- Migration V4: Oracle 23ai Advanced PL/SQL Objects
-- Author: Nhóm 3 - Sinh viên UTC
-- Nội dung: View báo cáo, Function-based Index, Triggers tự động và Package xử lý giao dịch đặt hàng

-- 1. VIEW BÁO CÁO CHỈ SỐ DASHBOARD
CREATE OR REPLACE VIEW VW_DASHBOARD_METRICS AS
SELECT
    COALESCE(o.total_revenue, 0) AS total_revenue,
    COALESCE(o.total_orders, 0) AS total_orders,
    COALESCE(o.pending_orders, 0) AS pending_orders,
    COALESCE(o.completed_orders, 0) AS completed_orders,
    COALESCE(o.cancelled_orders, 0) AS cancelled_orders,
    p.total_products,
    p.low_stock_products,
    u.total_customers,
    pr.active_promotions,
    s.total_subscriptions
FROM (
    SELECT
        SUM(CASE WHEN order_status <> 'CANCELLED' THEN total_amount ELSE 0 END) AS total_revenue,
        COUNT(id) AS total_orders,
        COUNT(CASE WHEN order_status = 'PENDING' THEN 1 END) AS pending_orders,
        COUNT(CASE WHEN order_status = 'COMPLETED' THEN 1 END) AS completed_orders,
        COUNT(CASE WHEN order_status = 'CANCELLED' THEN 1 END) AS cancelled_orders
    FROM sep_orders
) o
CROSS JOIN (
    SELECT
        COUNT(*) AS total_products,
        COUNT(CASE WHEN stock_qty <= 10 THEN 1 END) AS low_stock_products
    FROM sep_products
    WHERE is_active = 1
) p
CROSS JOIN (
    SELECT COUNT(*) AS total_customers FROM sep_users
) u
CROSS JOIN (
    SELECT COUNT(*) AS active_promotions FROM sep_promo_offers WHERE is_active = 1
) pr
CROSS JOIN (
    SELECT COUNT(*) AS total_subscriptions FROM sep_subscriptions
) s;

-- 2. VIEW THỐNG KÊ DOANH THU THEO THÁNG
CREATE OR REPLACE VIEW VW_MONTHLY_REVENUE AS
SELECT
    EXTRACT(YEAR FROM created_at) AS order_year,
    EXTRACT(MONTH FROM created_at) AS order_month,
    COUNT(id) AS order_count,
    COALESCE(SUM(CASE WHEN order_status <> 'CANCELLED' THEN total_amount ELSE 0 END), 0) AS revenue
FROM sep_orders
GROUP BY EXTRACT(YEAR FROM created_at), EXTRACT(MONTH FROM created_at)
ORDER BY order_year DESC, order_month DESC;

-- 3. FUNCTION-BASED INDEXES TỐI ƯU TÌM KIẾM KHÔNG PHÂN BIỆT HOA THƯỜNG
CREATE INDEX idx_products_upper_name ON sep_products(UPPER(name));
CREATE INDEX idx_products_upper_brand ON sep_products(UPPER(brand));

-- 4. TRIGGER TỰ ĐỘNG THĂNG HẠNG KHÁCH HÀNG (LOYALTY TIER)
CREATE OR REPLACE TRIGGER TRG_UPDATE_LOYALTY_TIER
BEFORE UPDATE OF points_balance ON sep_users
FOR EACH ROW
BEGIN
    IF :NEW.points_balance >= 1000 THEN
        :NEW.loyalty_tier := 'ROUGE';
    ELSIF :NEW.points_balance >= 350 THEN
        :NEW.loyalty_tier := 'VIB';
    ELSE
        :NEW.loyalty_tier := 'INSIDER';
    END IF;
END;
/

-- 5. TRIGGER KIỂM TOÁN TỰ ĐỘNG KHI THAY ĐỔI GIÁ SẢN PHẨM
CREATE OR REPLACE TRIGGER TRG_AUDIT_PRODUCT_PRICE
AFTER UPDATE OF price_value ON sep_products
FOR EACH ROW
WHEN (NEW.price_value <> OLD.price_value)
BEGIN
    INSERT INTO sep_audit_logs (
        actor_user_id,
        actor_username,
        action_type,
        target_type,
        target_id,
        detail_text,
        created_at
    ) VALUES (
        NULL,
        'TRIGGER_PRICE_AUDIT',
        'UPDATE_PRICE',
        'PRODUCT',
        :NEW.sku_id,
        'Thay doi gia san pham (' || :NEW.name || ') tu ' || TO_CHAR(:OLD.price_value) || ' sang ' || TO_CHAR(:NEW.price_value),
        CURRENT_TIMESTAMP
    );
END;
/

-- 6. TRIGGER HOÀN TỒN KHO TỰ ĐỘNG KHI HỦY ĐƠN HÀNG
CREATE OR REPLACE TRIGGER TRG_RESTORE_STOCK_ON_CANCEL
AFTER UPDATE OF order_status ON sep_orders
FOR EACH ROW
WHEN (NEW.order_status = 'CANCELLED' AND OLD.order_status <> 'CANCELLED')
BEGIN
    FOR r IN (SELECT product_id, quantity FROM sep_order_items WHERE order_id = :NEW.id) LOOP
        UPDATE sep_products
        SET stock_qty = stock_qty + r.quantity,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = r.product_id;
    END LOOP;
END;
/

-- 7. PACKAGE ĐẶT HÀNG VÀ XỬ LÝ GIAO DỊCH (ACID & PESSIMISTIC LOCKING)
CREATE OR REPLACE PACKAGE PKG_ORDER_PROCESSING AS
    FUNCTION FN_CALCULATE_DISCOUNT(
        p_subtotal IN NUMBER,
        p_promo_code IN VARCHAR2,
        p_loyalty_tier IN VARCHAR2
    ) RETURN NUMBER;

    PROCEDURE SP_PLACE_ORDER(
        p_user_id IN NUMBER,
        p_shipping_name IN VARCHAR2,
        p_shipping_phone IN VARCHAR2,
        p_shipping_address IN VARCHAR2,
        p_fulfillment_store IN VARCHAR2,
        p_promo_code IN VARCHAR2,
        o_order_id OUT NUMBER,
        o_order_code OUT VARCHAR2,
        o_total_amount OUT NUMBER,
        o_points_earned OUT NUMBER
    );
END PKG_ORDER_PROCESSING;
/

CREATE OR REPLACE PACKAGE BODY PKG_ORDER_PROCESSING AS
    FUNCTION FN_CALCULATE_DISCOUNT(
        p_subtotal IN NUMBER,
        p_promo_code IN VARCHAR2,
        p_loyalty_tier IN VARCHAR2
    ) RETURN NUMBER IS
        v_discount NUMBER := 0;
        v_pct NUMBER := 0;
        v_code VARCHAR2(50);
    BEGIN
        IF p_promo_code IS NULL OR TRIM(p_promo_code) IS NULL THEN
            RETURN 0;
        END IF;
        v_code := UPPER(TRIM(p_promo_code));
        IF v_code = 'ALLONSALE' THEN
            v_pct := 30;
        ELSIF v_code = 'ROUGE20' THEN
            v_pct := 20;
        ELSIF v_code = 'VIB15' THEN
            v_pct := 15;
        ELSIF v_code = 'INSIDER10' THEN
            v_pct := 10;
        ELSE
            BEGIN
                SELECT discount_percent INTO v_pct
                FROM sep_promo_offers
                WHERE UPPER(promo_code) = v_code AND is_active = 1;
            EXCEPTION
                WHEN NO_DATA_FOUND THEN
                    RAISE_APPLICATION_ERROR(-20002, 'Ma giam gia ' || p_promo_code || ' khong hop le hoac da het han');
            END;
        END IF;
        v_discount := ROUND(p_subtotal * v_pct / 100, 2);
        RETURN v_discount;
    END FN_CALCULATE_DISCOUNT;

    PROCEDURE SP_PLACE_ORDER(
        p_user_id IN NUMBER,
        p_shipping_name IN VARCHAR2,
        p_shipping_phone IN VARCHAR2,
        p_shipping_address IN VARCHAR2,
        p_fulfillment_store IN VARCHAR2,
        p_promo_code IN VARCHAR2,
        o_order_id OUT NUMBER,
        o_order_code OUT VARCHAR2,
        o_total_amount OUT NUMBER,
        o_points_earned OUT NUMBER
    ) IS
        v_username VARCHAR2(50);
        v_loyalty_tier VARCHAR2(20);
        v_cart_count NUMBER;
        v_subtotal NUMBER := 0;
        v_discount NUMBER := 0;
        v_total NUMBER := 0;
        v_order_code VARCHAR2(50);
        v_order_id NUMBER;
        v_points NUMBER := 0;
        v_stock NUMBER;
        v_price NUMBER;
        v_name VARCHAR2(255);
        v_brand VARCHAR2(150);
        v_sku VARCHAR2(50);
        v_image VARCHAR2(500);
        v_item_total NUMBER;
    BEGIN
        -- 1. Khoa va kiem tra nguoi dung
        BEGIN
            SELECT username, loyalty_tier INTO v_username, v_loyalty_tier
            FROM sep_users
            WHERE id = p_user_id
            FOR UPDATE;
        EXCEPTION
            WHEN NO_DATA_FOUND THEN
                RAISE_APPLICATION_ERROR(-20003, 'Nguoi dung ID ' || p_user_id || ' khong ton tai');
        END;

        -- 2. Kiem tra gio hang
        SELECT COUNT(*) INTO v_cart_count
        FROM sep_cart_items
        WHERE user_id = p_user_id;

        IF v_cart_count = 0 THEN
            RAISE_APPLICATION_ERROR(-20004, 'Gio hang cua ban dang trong, khong the dat hang');
        END IF;

        -- 3. Tinh tong tien va khoa dong san pham (Pessimistic Locking)
        FOR c IN (SELECT product_id, quantity FROM sep_cart_items WHERE user_id = p_user_id) LOOP
            BEGIN
                SELECT stock_qty, price_value, name, brand, sku_id, image_url
                INTO v_stock, v_price, v_name, v_brand, v_sku, v_image
                FROM sep_products
                WHERE id = c.product_id
                FOR UPDATE;
            EXCEPTION
                WHEN NO_DATA_FOUND THEN
                    RAISE_APPLICATION_ERROR(-20005, 'San pham ID ' || c.product_id || ' khong ton tai');
            END;

            IF v_stock < c.quantity THEN
                RAISE_APPLICATION_ERROR(-20001, 'San pham "' || v_name || '" khong du ton kho (con ' || v_stock || ', yeu cau ' || c.quantity || ')');
            END IF;

            v_subtotal := v_subtotal + (v_price * c.quantity);
        END LOOP;

        -- 4. Tinh giam gia va tong thanh toan
        v_discount := FN_CALCULATE_DISCOUNT(v_subtotal, p_promo_code, v_loyalty_tier);
        v_total := GREATEST(0, v_subtotal - v_discount);
        v_points := TRUNC(v_total);

        -- 5. Sinh ma don hang format SEP-YYYYMMDD-XXXXXX
        v_order_code := 'SEP-' || TO_CHAR(SYSDATE, 'YYYYMMDD') || '-' || UPPER(SUBSTR(RAWTOHEX(SYS_GUID()), 1, 6));

        -- 6. Chen ban ghi don hang
        INSERT INTO sep_orders (
            order_code,
            user_id,
            order_status,
            subtotal_amount,
            discount_amount,
            total_amount,
            promo_code,
            shipping_name,
            shipping_phone,
            shipping_address,
            fulfillment_store,
            points_earned,
            created_at,
            updated_at
        ) VALUES (
            v_order_code,
            p_user_id,
            'PENDING',
            v_subtotal,
            v_discount,
            v_total,
            TRIM(p_promo_code),
            TRIM(p_shipping_name),
            TRIM(p_shipping_phone),
            TRIM(p_shipping_address),
            p_fulfillment_store,
            v_points,
            CURRENT_TIMESTAMP,
            CURRENT_TIMESTAMP
        ) RETURNING id INTO v_order_id;

        -- 7. Chen chi tiet don hang va tru kho
        FOR c IN (SELECT product_id, quantity FROM sep_cart_items WHERE user_id = p_user_id) LOOP
            SELECT price_value, name, brand, sku_id, image_url
            INTO v_price, v_name, v_brand, v_sku, v_image
            FROM sep_products
            WHERE id = c.product_id;

            v_item_total := v_price * c.quantity;

            INSERT INTO sep_order_items (
                order_id,
                product_id,
                sku_id,
                product_name,
                brand,
                image_url,
                unit_price,
                quantity,
                line_total
            ) VALUES (
                v_order_id,
                c.product_id,
                v_sku,
                v_name,
                v_brand,
                v_image,
                v_price,
                c.quantity,
                v_item_total
            );

            UPDATE sep_products
            SET stock_qty = stock_qty - c.quantity,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = c.product_id;
        END LOOP;

        -- 8. Tich luy diem thuong cho nguoi dung (Trigger TRG_UPDATE_LOYALTY_TIER tu dong thuc thi)
        UPDATE sep_users
        SET points_balance = points_balance + v_points,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = p_user_id;

        -- 9. Don dep gio hang sau khi dat
        DELETE FROM sep_cart_items WHERE user_id = p_user_id;

        -- 10. Ghi nhat ky kiem toan audit log
        INSERT INTO sep_audit_logs (
            actor_user_id,
            actor_username,
            action_type,
            target_type,
            target_id,
            detail_text,
            created_at
        ) VALUES (
            p_user_id,
            v_username,
            'CREATE_ORDER',
            'ORDER',
            v_order_code,
            'Dat hang thanh cong qua PL/SQL Stored Procedure SP_PLACE_ORDER. Tong: ' || v_total || ', Diem: ' || v_points,
            CURRENT_TIMESTAMP
        );

        -- Gan gia tri cho cac tham so dau ra OUT
        o_order_id := v_order_id;
        o_order_code := v_order_code;
        o_total_amount := v_total;
        o_points_earned := v_points;
    END SP_PLACE_ORDER;
END PKG_ORDER_PROCESSING;
/
