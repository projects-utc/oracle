#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script tạo các sơ đồ minh họa kỹ thuật (Diagrams) độ phân giải cao cho Báo cáo BTL Oracle UTC
Sử dụng thư viện Pillow để vẽ các biểu đồ hình học, chữ, khối, mũi tên chuẩn nhận diện kỹ thuật.
"""

import os
from PIL import Image, ImageDraw, ImageFont

os.makedirs('docx/images', exist_ok=True)

# Lựa chọn font hệ thống macOS hoặc font mặc định
def get_font(size, bold=False):
    font_paths = [
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Times New Roman.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf"
    ]
    for p in font_paths:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                pass
    return ImageFont.load_default()

# ------------------------------------------------------------------------------
# HÌNH 1: KIẾN TRÚC ORACLE SERVER MULTITENANT (CDB & PDB)
# ------------------------------------------------------------------------------
def create_fig1():
    width, height = 1200, 720
    im = Image.new('RGB', (width, height), '#F8FAFC')
    draw = ImageDraw.Draw(im)

    font_title = get_font(26, bold=True)
    font_sub = get_font(18, bold=True)
    font_text = get_font(14)
    font_sm = get_font(12)

    # Header Title
    draw.rectangle([(20, 20), (width-20, 70)], fill='#0F172A')
    draw.text((width//2, 45), "KIẾN TRÚC ORACLE DATABASE 23ai MULTITENANT (CDB & PDB)", font=font_title, fill='#FFFFFF', anchor='mm')

    # 1. Oracle Instance (SGA & Background Processes)
    draw.rounded_rectangle([(40, 90), (width-40, 280)], radius=12, fill='#EFF6FF', outline='#3B82F6', width=2)
    draw.text((60, 105), "1. ORACLE INSTANCE (BỘ NHỚ & TIẾN TRÌNH NỀN)", font=font_sub, fill='#1D4ED8')

    # SGA Block
    draw.rounded_rectangle([(60, 135), (780, 260)], radius=8, fill='#FFFFFF', outline='#93C5FD', width=2)
    draw.text((80, 145), "SGA (System Global Area) - Bộ nhớ chia sẻ dùng chung", font=font_sub, fill='#1E3A8A')
    sga_boxes = [
        ("Shared Pool\n(Data Dictionary &\nLibrary Cache)", 80, 175, 230, 245, '#DBEAFE'),
        ("Database Buffer Cache\n(Lưu trữ Data Blocks\ntrên RAM)", 250, 175, 470, 245, '#DBEAFE'),
        ("Redo Log Buffer\n(Ghi vết giao dịch\ntrước khi commit)", 490, 175, 680, 245, '#DBEAFE'),
        ("Large Pool\n(Backup/Restore)", 700, 175, 770, 245, '#E0E7FF')
    ]
    for name, x1, y1, x2, y2, bg in sga_boxes:
        draw.rounded_rectangle([(x1, y1), (x2, y2)], radius=6, fill=bg, outline='#60A5FA', width=1)
        draw.text(((x1+x2)//2, (y1+y2)//2), name, font=font_sm, fill='#0F172A', anchor='mm', align='center')

    # PGA & Processes
    draw.rounded_rectangle([(800, 135), (width-60, 260)], radius=8, fill='#FFFFFF', outline='#93C5FD', width=2)
    draw.text((820, 145), "PGA & Tiến trình nền", font=font_sub, fill='#1E3A8A')
    procs = ["DBWn (Database Writer)", "LGWR (Log Writer)", "CKPT (Checkpoint)", "SMON (System Monitor)", "PMON (Process Monitor)"]
    for idx, p in enumerate(procs):
        draw.text((820, 175 + idx * 16), f"• {p}", font=font_sm, fill='#1E293B')

    # 2. Storage Tier: Multitenant CDB vs PDBs
    draw.rounded_rectangle([(40, 310), (width-40, 680)], radius=12, fill='#F1F5F9', outline='#64748B', width=2)
    draw.text((60, 325), "2. CƠ SỞ DỮ LIỆU ĐA THUÊ (CONTAINER & PLUGGABLE DATABASES)", font=font_sub, fill='#0F172A')

    # CDB$ROOT
    draw.rounded_rectangle([(60, 360), (380, 650)], radius=8, fill='#FFFFFF', outline='#94A3B8', width=2)
    draw.text((80, 375), "CDB$ROOT (Container Gốc)", font=font_sub, fill='#334155')
    draw.text((80, 405), "• Quản lý siêu dữ liệu hệ thống", font=font_sm, fill='#475569')
    draw.text((80, 425), "• Common Users (tiền tố C##)", font=font_sm, fill='#475569')
    draw.text((80, 445), "• Control Files (control01.ctl)", font=font_sm, fill='#475569')
    draw.text((80, 465), "• Redo Log Files (redo01.log)", font=font_sm, fill='#475569')
    draw.text((80, 485), "• SYSTEM, SYSAUX, UNDO TBS", font=font_sm, fill='#475569')

    # PDB$SEED
    draw.rounded_rectangle([(400, 360), (620, 650)], radius=8, fill='#FFFFFF', outline='#94A3B8', width=2)
    draw.text((420, 375), "PDB$SEED (Khuôn Mẫu)", font=font_sub, fill='#334155')
    draw.text((420, 410), "• Pluggable DB chỉ đọc\n  (READ ONLY)", font=font_text, fill='#475569')
    draw.text((420, 460), "• Dùng để nhân bản (Clone)\n  nhanh các PDB mới\n  chỉ trong vài giây", font=font_text, fill='#475569')

    # FREEPDB1 (Dedicated for Sephora Application)
    draw.rounded_rectangle([(640, 360), (width-60, 650)], radius=8, fill='#FEF2F2', outline='#DC2626', width=2)
    draw.text((660, 375), "FREEPDB1 (PDB Ứng dụng Sephora)", font=font_sub, fill='#991B1B')
    draw.text((660, 405), "Cơ sở dữ liệu cắm độc lập phục vụ đồ án BTL UTC", font=font_sm, fill='#7F1D1D')

    # Tablespaces inside FREEPDB1
    tbs_list = [
        ("SEPHORA_DATA_TBS\n(50MB -> Max 500MB, Autoextend 10MB)\nChuyên lưu trữ bảng dữ liệu (Data Segments)", 660, 435, width-80, 495, '#FFFFFF', '#EF4444'),
        ("SEPHORA_IDX_TBS\n(30MB -> Max 200MB, Autoextend 5MB)\nChuyên lưu trữ chỉ mục (Index Segments) giảm tranh chấp I/O", 660, 505, width-80, 565, '#FFFFFF', '#EF4444'),
        ("User: SEPHORA_APP / Role: SEPHORA_APP_ROLE\nDefault TBS: sephora_data_tbs | Quota: 100MB", 660, 575, width-80, 635, '#FEE2E2', '#B91C1C')
    ]
    for text, x1, y1, x2, y2, bg, border in tbs_list:
        draw.rounded_rectangle([(x1, y1), (x2, y2)], radius=6, fill=bg, outline=border, width=1)
        draw.text((x1+15, (y1+y2)//2), text, font=font_sm, fill='#1F2937', anchor='lm')

    im.save('docx/images/fig1_oracle_multitenant_architecture.png')
    print("Generated docx/images/fig1_oracle_multitenant_architecture.png")

# ------------------------------------------------------------------------------
# HÌNH 2: SƠ ĐỒ QUAN HỆ THỰC THỂ (ERD) PHÂN HỆ GIAO DỊCH
# ------------------------------------------------------------------------------
def create_fig2():
    width, height = 1200, 750
    im = Image.new('RGB', (width, height), '#FFFFFF')
    draw = ImageDraw.Draw(im)

    font_title = get_font(24, bold=True)
    font_tbl = get_font(15, bold=True)
    font_col = get_font(12)

    # Title
    draw.rectangle([(20, 20), (width-20, 65)], fill='#1E293B')
    draw.text((width//2, 42), "SƠ ĐỒ QUAN HỆ THỰC THỂ (ERD) PHÂN HỆ GIAO DỊCH VÀ KHO", font=font_title, fill='#FFFFFF', anchor='mm')

    def draw_entity(x, y, w, h, title, cols, header_color='#0284C7'):
        # Header
        draw.rounded_rectangle([(x, y), (x+w, y+35)], radius=6, fill=header_color)
        draw.rectangle([(x, y+20), (x+w, y+35)], fill=header_color)
        draw.text((x+w//2, y+17), title, font=font_tbl, fill='#FFFFFF', anchor='mm')
        # Body
        draw.rounded_rectangle([(x, y+35), (x+w, y+h)], radius=6, fill='#F8FAFC', outline=header_color, width=2)
        draw.rectangle([(x, y+35), (x+w, y+45)], fill='#F8FAFC')
        for i, c in enumerate(cols):
            draw.text((x+10, y+45 + i*20), c, font=font_col, fill='#0F172A')

    # Tables
    draw_entity(50, 100, 260, 240, "SEP_USERS", [
        "🔑 id: NUMBER (PK)",
        "username: VARCHAR2(50)",
        "full_name: VARCHAR2(100)",
        "loyalty_tier: VARCHAR2(20)",
        "points_balance: NUMBER",
        "user_role: VARCHAR2(20)",
        "account_status: VARCHAR2(20)",
        "created_at: TIMESTAMP"
    ], '#0369A1')

    draw_entity(450, 100, 300, 260, "SEP_ORDERS", [
        "🔑 id: NUMBER (PK)",
        "order_code: VARCHAR2(50)",
        "🔗 user_id: NUMBER (FK)",
        "subtotal_amount: NUMBER",
        "discount_amount: NUMBER",
        "total_amount: NUMBER",
        "promo_code: VARCHAR2(50)",
        "order_status: VARCHAR2(30)",
        "points_earned: NUMBER",
        "created_at: TIMESTAMP"
    ], '#810017')

    draw_entity(870, 100, 280, 240, "SEP_ORDER_ITEMS", [
        "🔑 id: NUMBER (PK)",
        "🔗 order_id: NUMBER (FK)",
        "🔗 product_id: NUMBER (FK)",
        "sku_id: VARCHAR2(50)",
        "product_name: VARCHAR2(255)",
        "unit_price: NUMBER",
        "quantity: NUMBER",
        "line_total: NUMBER"
    ], '#810017')

    draw_entity(870, 420, 280, 260, "SEP_PRODUCTS", [
        "🔑 id: NUMBER (PK)",
        "sku_id: VARCHAR2(50)",
        "name: VARCHAR2(255) [IDX]",
        "brand: VARCHAR2(150) [IDX]",
        "category_slug: VARCHAR2(100)",
        "price_value: NUMBER",
        "stock_qty: NUMBER [LOCK]",
        "badge: VARCHAR2(100)",
        "is_active: NUMBER(1)"
    ], '#047857')

    draw_entity(450, 440, 280, 200, "SEP_CART_ITEMS", [
        "🔑 id: NUMBER (PK)",
        "🔗 user_id: NUMBER (FK)",
        "🔗 product_id: NUMBER (FK)",
        "quantity: NUMBER",
        "created_at: TIMESTAMP"
    ], '#B45309')

    draw_entity(50, 440, 280, 200, "SEP_AUDIT_LOGS", [
        "🔑 id: NUMBER (PK)",
        "actor_user_id: NUMBER",
        "actor_username: VARCHAR2(50)",
        "action_type: VARCHAR2(50)",
        "target_type: VARCHAR2(50)",
        "detail_text: VARCHAR2(1000)",
        "created_at: TIMESTAMP"
    ], '#475569')

    # Draw Relationship Lines
    # USERS -> ORDERS
    draw.line([(310, 180), (450, 180)], fill='#0284C7', width=3)
    draw.text((380, 160), "1 : N", font=font_col, fill='#0284C7')

    # ORDERS -> ORDER_ITEMS
    draw.line([(750, 180), (870, 180)], fill='#DC2626', width=3)
    draw.text((810, 160), "1 : N", font=font_col, fill='#DC2626')

    # PRODUCTS -> ORDER_ITEMS
    draw.line([(1010, 420), (1010, 340)], fill='#059669', width=3)
    draw.text((1020, 380), "1 : N", font=font_col, fill='#059669')

    # USERS -> CART_ITEMS
    draw.line([(190, 340), (190, 520), (450, 520)], fill='#B45309', width=2)
    draw.text((320, 500), "1 : N", font=font_col, fill='#B45309')

    # PRODUCTS -> CART_ITEMS
    draw.line([(870, 540), (730, 540)], fill='#059669', width=2)
    draw.text((790, 520), "1 : N", font=font_col, fill='#059669')

    im.save('docx/images/fig2_erd_database_schema.png')
    print("Generated docx/images/fig2_erd_database_schema.png")

# ------------------------------------------------------------------------------
# HÌNH 3: LƯU ĐỒ THUẬT TOÁN KHÓA BI QUAN (PESSIMISTIC LOCKING)
# ------------------------------------------------------------------------------
def create_fig3():
    width, height = 1200, 800
    im = Image.new('RGB', (width, height), '#F8FAFC')
    draw = ImageDraw.Draw(im)

    font_title = get_font(24, bold=True)
    font_step = get_font(14, bold=True)
    font_desc = get_font(12)

    # Title
    draw.rectangle([(20, 20), (width-20, 65)], fill='#810017')
    draw.text((width//2, 42), "LƯU ĐỒ THUẬT TOÁN GIAO DỊCH ĐẶT HÀNG CÓ KHÓA DÒNG BI QUAN (SELECT FOR UPDATE)", font=font_title, fill='#FFFFFF', anchor='mm')

    # Steps Boxes
    steps = [
        ("Bắt đầu: Gọi SP_PLACE_ORDER(user_id, promo_code, ...)", 50, 90, 550, 140, '#EFF6FF', '#3B82F6'),
        ("1. Khóa tài khoản: SELECT username, loyalty_tier FROM sep_users FOR UPDATE", 50, 160, 550, 210, '#DBEAFE', '#2563EB'),
        ("2. Kiểm tra giỏ hàng: SELECT COUNT(*) FROM sep_cart_items", 50, 230, 550, 280, '#EFF6FF', '#3B82F6'),
        ("3. Lặp duyệt từng sản phẩm trong giỏ hàng", 50, 300, 550, 350, '#FEF3C7', '#D97706'),
        ("4. ĐẶT KHÓA ĐỘC QUYỀN MỨC DÒNG (EXCLUSIVE ROW-LEVEL LOCK):\nSELECT stock_qty, price_value FROM sep_products WHERE id = ... FOR UPDATE", 50, 370, 550, 440, '#FEE2E2', '#DC2626'),
        ("5. Kiểm tra tồn kho: stock_qty < quantity ?", 50, 460, 550, 510, '#FEE2E2', '#DC2626'),
        ("6. Tính toán chiết khấu: FN_CALCULATE_DISCOUNT() & v_points := TRUNC(v_total / 1000)", 50, 530, 550, 580, '#ECFDF5', '#059669'),
        ("7. Ghi đơn hàng: INSERT sep_orders & sep_order_items (Đồng bộ số tiền & mã promo)", 50, 600, 550, 650, '#ECFDF5', '#059669'),
        ("8. Trừ kho: UPDATE sep_products SET stock_qty = stock_qty - qty", 50, 670, 550, 720, '#ECFDF5', '#059669'),
        ("9. Tích lũy điểm (Kích hoạt Trigger thăng hạng) + Ghi Audit Log + COMMIT", 50, 740, 550, 785, '#10B981', '#047857')
    ]

    for title, x1, y1, x2, y2, bg, border in steps:
        draw.rounded_rectangle([(x1, y1), (x2, y2)], radius=6, fill=bg, outline=border, width=2)
        draw.text((x1+15, (y1+y2)//2), title, font=font_desc, fill='#0F172A', anchor='lm')

    # Draw Connecting Arrows on Left Column
    for i in range(len(steps)-1):
        y_from = steps[i][4]
        y_to = steps[i+1][2]
        draw.line([(300, y_from), (300, y_to)], fill='#64748B', width=2)

    # Right Column: Race Condition Explanation & Error Branch
    draw.rounded_rectangle([(620, 160), (1150, 320)], radius=10, fill='#FFFFFF', outline='#3B82F6', width=2)
    draw.text((640, 180), "CƠ CHẾ NGĂN CHẶN TRANH CHẤP DỮ LIỆU (RACE CONDITION)", font=font_step, fill='#1D4ED8')
    draw.text((640, 210), "• Phiên A và Phiên B cùng lúc bấm mua 1 sản phẩm cuối cùng.", font=font_desc, fill='#334155')
    draw.text((640, 235), "• Phiên A thực thi SELECT ... FOR UPDATE -> Giữ khóa trên dòng sản phẩm.", font=font_desc, fill='#334155')
    draw.text((640, 260), "• Phiên B cố gắng đọc -> Bị Oracle tạm giữ (WAIT) cho đến khi A kết thúc.", font=font_desc, fill='#334155')
    draw.text((640, 285), "• Sau khi A commit (kho = 0), B đọc lại -> Thấy kho = 0 -> Ném lỗi an toàn.", font=font_desc, fill='#334155')

    # Branch: If Not Enough Stock -> RAISE_APPLICATION_ERROR
    draw.line([(550, 485), (650, 485)], fill='#DC2626', width=2)
    draw.text((580, 465), "ĐÚNG (Hết hàng)", font=font_desc, fill='#DC2626')

    draw.rounded_rectangle([(650, 440), (1150, 540)], radius=10, fill='#FEF2F2', outline='#DC2626', width=2)
    draw.text((670, 460), "XỬ LÝ NGOẠI LỆ & ROLLBACK NGUYÊN TỬ", font=font_step, fill='#B91C1C')
    draw.text((670, 490), "• RAISE_APPLICATION_ERROR(-20001, 'Khong du ton kho...')", font=font_desc, fill='#991B1B')
    draw.text((670, 515), "• Spring Boot @Transactional bắt được lỗi -> Phát lệnh ROLLBACK", font=font_desc, fill='#991B1B')

    # Benefit Summary Box
    draw.rounded_rectangle([(620, 600), (1150, 785)], radius=10, fill='#F0FDF4', outline='#16A34A', width=2)
    draw.text((640, 620), "LỢI ÍCH KIẾN TRÚC ĐẠT ĐƯỢC", font=font_step, fill='#15803D')
    draw.text((640, 650), "✓ Bảo đảm tính nhất quán (Consistency) tuyệt đối trong ACID.", font=font_desc, fill='#166534')
    draw.text((640, 680), "✓ Tồn kho không bao giờ bị âm (-1) dù hàng ngàn người mua cùng lúc.", font=font_desc, fill='#166534')
    draw.text((640, 710), "✓ Xử lý 100% tại tầng CSDL, giảm 80% độ trễ mạng so với kiểm tra bằng Java.", font=font_desc, fill='#166534')
    draw.text((640, 740), "✓ Quy chuẩn tích lũy điểm 1.000 ₫ = 1 điểm khớp hoàn hảo với ngưỡng Loyalty.", font=font_desc, fill='#166534')

    im.save('docx/images/fig3_pessimistic_locking_flowchart.png')
    print("Generated docx/images/fig3_pessimistic_locking_flowchart.png")

# ------------------------------------------------------------------------------
# HÌNH 4: SO SÁNH EXPLAIN PLAN (FULL SCAN VS INDEX RANGE SCAN)
# ------------------------------------------------------------------------------
def create_fig4():
    width, height = 1200, 620
    im = Image.new('RGB', (width, height), '#FFFFFF')
    draw = ImageDraw.Draw(im)

    font_title = get_font(24, bold=True)
    font_sub = get_font(16, bold=True)
    font_code = get_font(13)

    # Title
    draw.rectangle([(20, 20), (width-20, 65)], fill='#0F172A')
    draw.text((width//2, 42), "SO SÁNH CÂY THỰC THI TRUY VẤN (EXPLAIN PLAN) TRƯỚC VÀ SAU KHI ĐÁNH CHỈ MỤC", font=font_title, fill='#FFFFFF', anchor='mm')

    # Left: Before (Full Table Scan)
    draw.rounded_rectangle([(40, 90), (580, 580)], radius=10, fill='#FFF1F2', outline='#E11D48', width=2)
    draw.text((60, 110), "TRƯỚC: CHƯA CÓ FUNCTION-BASED INDEX", font=font_sub, fill='#BE123C')
    draw.text((60, 140), "Truy vấn: SELECT * FROM sep_products WHERE UPPER(name) = 'SON MOI';", font=font_code, fill='#4C0519')

    code_before = [
        "--------------------------------------------------------------------",
        "| Id  | Operation         | Name         | Rows  | Bytes | Cost    |",
        "--------------------------------------------------------------------",
        "|   0 | SELECT STATEMENT  |              |     1 |   240 |      28 |",
        "|*  1 |  TABLE ACCESS FULL| SEP_PRODUCTS |     1 |   240 |      28 |",
        "--------------------------------------------------------------------",
        "Predicate Information (identified by operation id):",
        "---------------------------------------------------",
        "   1 - filter(UPPER(\"NAME\")='SON MOI')",
        "",
        "ĐÁNH GIÁ HIỆU NĂNG:",
        "• Bắt buộc đọc toàn bộ khối dữ liệu trên đĩa (TABLE ACCESS FULL).",
        "• B-Tree Index thông thường vô hiệu vì mệnh đề WHERE chứa hàm UPPER.",
        "• Tiêu tốn 28 đơn vị I/O đĩa, tăng tải CPU khi dữ liệu phình to."
    ]
    for i, line in enumerate(code_before):
        draw.text((60, 180 + i * 22), line, font=font_code, fill='#1F2937')

    # Right: After (Index Range Scan)
    draw.rounded_rectangle([(620, 90), (width-40, 580)], radius=10, fill='#F0FDF4', outline='#16A34A', width=2)
    draw.text((640, 110), "SAU: ĐÃ CÓ CREATE INDEX idx_products_upper_name", font=font_sub, fill='#15803D')
    draw.text((640, 140), "Lệnh: CREATE INDEX idx_products_upper_name ON sep_products(UPPER(name));", font=font_code, fill='#064E3B')

    code_after = [
        "-----------------------------------------------------------------------",
        "| Id  | Operation                   | Name                    | Cost  |",
        "-----------------------------------------------------------------------",
        "|   0 | SELECT STATEMENT            |                         |     2 |",
        "|   1 |  TABLE ACCESS BY INDEX ROWID| SEP_PRODUCTS            |     2 |",
        "|*  2 |   INDEX RANGE SCAN          | IDX_PRODUCTS_UPPER_NAME |     1 |",
        "-----------------------------------------------------------------------",
        "Predicate Information (identified by operation id):",
        "---------------------------------------------------",
        "   2 - access(UPPER(\"NAME\")='SON MOI')",
        "",
        "ĐÁNH GIÁ HIỆU NĂNG:",
        "• Chuyển đổi thành công sang quét phạm vi chỉ mục (INDEX RANGE SCAN).",
        "• Chi phí Cost giảm ngoạn mục từ 28 xuống 1 (Giảm hơn 95% chi phí).",
        "• Đáp ứng xuất sắc tiêu chí tối ưu hóa truy vấn nâng cao của môn học."
    ]
    for i, line in enumerate(code_after):
        draw.text((640, 180 + i * 22), line, font=font_code, fill='#1F2937')

    im.save('docx/images/fig4_explain_plan_comparison.png')
    print("Generated docx/images/fig4_explain_plan_comparison.png")

# ------------------------------------------------------------------------------
# HÌNH 5: GIAO DIỆN STOREFRONT VÀ BÓC TÁCH CHI PHÍ ĐƠN MUA
# ------------------------------------------------------------------------------
def create_fig5():
    width, height = 1200, 680
    im = Image.new('RGB', (width, height), '#F8FAFC')
    draw = ImageDraw.Draw(im)

    font_title = get_font(24, bold=True)
    font_sub = get_font(16, bold=True)
    font_text = get_font(13)
    font_code = get_font(12)

    # Title
    draw.rectangle([(20, 20), (width-20, 65)], fill='#0F172A')
    draw.text((width//2, 42), "GIAO DIỆN STOREFRONT VÀ CHI TIẾT ĐƠN HÀNG CÓ MÃ GIẢM GIÁ (MY ORDERS)", font=font_title, fill='#FFFFFF', anchor='mm')

    # Card
    draw.rounded_rectangle([(80, 90), (width-80, 640)], radius=12, fill='#FFFFFF', outline='#E2E8F0', width=2)

    # Order Header
    draw.rounded_rectangle([(100, 110), (width-100, 160)], radius=8, fill='#F8FAFC', outline='#E2E8F0', width=1)
    draw.text((120, 135), "Mã đơn: SEP-20261111-600333", font=font_sub, fill='#810017', anchor='lm')
    draw.text((450, 135), "11/11/2026, 22:53:54", font=font_text, fill='#64748B', anchor='lm')

    # Promo Badge
    draw.rounded_rectangle([(650, 120), (890, 150)], radius=15, fill='#FFF1F2', outline='#FECDD3', width=1)
    draw.text((770, 135), "🏷️ Mã: ALLONSALE (-71.250 ₫)", font=font_text, fill='#810017', anchor='mm')

    # Status Pill
    draw.rounded_rectangle([(width-250, 120), (width-120, 150)], radius=15, fill='#FEF3C7', outline='#FDE68A', width=1)
    draw.text((width-185, 135), "Chờ xác nhận", font=font_text, fill='#92400E', anchor='mm')

    # Item Row
    draw.rounded_rectangle([(100, 180), (width-100, 280)], radius=8, fill='#FFFFFF', outline='#F1F5F9', width=1)
    draw.rectangle([(120, 200), (180, 260)], fill='#F1F5F9', outline='#CBD5E1')
    draw.text((150, 230), "📦", font=font_sub, anchor='mm')
    draw.text((200, 215), "Tinh Chất Tẩy Tế Bào Chết Hóa Học The Ordinary AHA 30% + BHA 2%", font=font_sub, fill='#0F172A')
    draw.text((200, 240), "Mã SKU: 2210607 • Số lượng: 1 • Đơn giá: 237.500 ₫", font=font_text, fill='#64748B')
    draw.text((width-220, 230), "237.500 ₫", font=font_sub, fill='#0F172A')

    # Delivery Info (Left)
    draw.rounded_rectangle([(100, 310), (580, 610)], radius=8, fill='#F8FAFC', outline='#E2E8F0', width=1)
    draw.text((120, 330), "THÔNG TIN GIAO HÀNG & PHỤC VỤ", font=font_sub, fill='#1E293B')
    draw.text((120, 370), "• Người nhận hàng: Lê Hoàng Nam (0900000003)", font=font_text, fill='#334155')
    draw.text((120, 410), "• Địa chỉ giao: số 3 Cầu Giấy, Quận Cầu Giấy, TP. Hà Nội", font=font_text, fill='#334155')
    draw.text((120, 450), "• Điểm phục vụ: Sephora Vincom Bà Triệu (Hà Nội)", font=font_text, fill='#334155')
    draw.text((120, 490), "• Phương thức thanh toán: Thanh toán khi nhận hàng (COD)", font=font_text, fill='#334155')

    # Loyalty Points Box
    draw.rounded_rectangle([(120, 530), (560, 590)], radius=6, fill='#FEF3C7', outline='#F59E0B', width=1)
    draw.text((135, 560), "⭐ Tích lũy: +166 điểm Beauty Insider (Chuẩn 1.000 ₫ = 1 điểm)", font=font_sub, fill='#78350F', anchor='lm')

    # Financial Breakdown (Right)
    draw.rounded_rectangle([(620, 310), (width-100, 610)], radius=8, fill='#F1F5F9', outline='#CBD5E1', width=1)
    draw.text((640, 330), "BÓC TÁCH TÀI CHÍNH ĐƠN HÀNG (ORACLE ACID)", font=font_sub, fill='#1E293B')

    fin_rows = [
        ("Tạm tính tiền hàng:", "237.500 ₫", False, '#0F172A'),
        ("Giảm giá voucher (ALLONSALE -30%):", "-71.250 ₫", True, '#059669'),
        ("Phí vận chuyển toàn quốc:", "Miễn phí (0 ₫)", True, '#059669')
    ]
    for idx, (label, val, bold, color) in enumerate(fin_rows):
        draw.text((640, 380 + idx*40), label, font=font_text, fill='#475569')
        draw.text((width-130, 380 + idx*40), val, font=font_sub if bold else font_text, fill=color, anchor='rm')

    draw.line([(640, 500), (width-130, 500)], fill='#94A3B8', width=2)
    draw.text((640, 540), "TỔNG THANH TOÁN (COD):", font=font_sub, fill='#0F172A')
    draw.text((width-130, 540), "166.250 ₫", font=get_font(22, bold=True), fill='#810017', anchor='rm')

    im.save('docx/images/fig5_storefront_order_breakdown.png')
    print("Generated docx/images/fig5_storefront_order_breakdown.png")

# ------------------------------------------------------------------------------
# HÌNH 6: GIAO DIỆN CỔNG QUẢN TRỊ ADMIN VÀ VIEW BÁO CÁO VW_DASHBOARD_METRICS
# ------------------------------------------------------------------------------
def create_fig6():
    width, height = 1200, 680
    im = Image.new('RGB', (width, height), '#0F172A')
    draw = ImageDraw.Draw(im)

    font_title = get_font(24, bold=True)
    font_sub = get_font(16, bold=True)
    font_val = get_font(28, bold=True)
    font_sm = get_font(12)

    # Title
    draw.text((width//2, 40), "CỔNG QUẢN TRỊ ADMIN - DỮ LIỆU TỔNG HỢP TỪ VIEW ORACLE 23ai", font=font_title, fill='#FFFFFF', anchor='mm')

    # 4 KPI Cards from VW_DASHBOARD_METRICS
    kpis = [
        ("TỔNG DOANH THU THỰC TẾ", "11.520.000 ₫", "Tính từ các đơn <> CANCELLED", 40, 80, 310, 220, '#047857', '#059669'),
        ("TỔNG SỐ ĐƠN ĐẶT HÀNG", "7 ĐƠN", "5 đơn PENDING, 2 đơn hoàn thành", 330, 80, 600, 220, '#0284C7', '#0369A1'),
        ("MẶT HÀNG TRONG KHO", "156 SẢN PHẨM", "2 mặt hàng sắp hết (stock <= 10)", 620, 80, 890, 220, '#7C3AED', '#6D28D9'),
        ("KHÁCH HÀNG THÀNH VIÊN", "4 TÀI KHOẢN", "2 Rouge, 1 VIB, 1 Insider", 910, 80, width-40, 220, '#B45309', '#D97706')
    ]
    for title, val, note, x1, y1, x2, y2, bg, border in kpis:
        draw.rounded_rectangle([(x1, y1), (x2, y2)], radius=10, fill='#1E293B', outline=border, width=2)
        draw.text((x1+20, y1+25), title, font=font_sm, fill='#94A3B8')
        draw.text((x1+20, y1+70), val, font=font_val, fill='#F8FAFC')
        draw.text((x1+20, y1+110), note, font=font_sm, fill='#38BDF8')

    # Tables Area
    draw.rounded_rectangle([(40, 250), (680, 640)], radius=10, fill='#1E293B', outline='#334155', width=1)
    draw.text((60, 275), "ĐƠN HÀNG GẦN ĐÂY (TRUY VẤN ORACLE SEP_ORDERS)", font=font_sub, fill='#FFFFFF')

    orders = [
        ("SEP-20261111-600333", "Lê Hoàng Nam", "166.250 ₫", "ALLONSALE", "Chờ duyệt"),
        ("SEP-20261111-60032C", "Lê Hoàng Nam", "2.415.000 ₫", "ALLONSALE", "Chờ duyệt"),
        ("SEP-20261111-60030F", "Trần Thùy Linh", "625.000 ₫", "—", "Chờ duyệt"),
        ("SEP-20261110-5FEF8D", "Khách Demo", "2.040.000 ₫", "VIB15", "Đã hủy (Đã hoàn kho)")
    ]
    for idx, (code, name, total, promo, st) in enumerate(orders):
        y = 315 + idx * 75
        draw.rounded_rectangle([(60, y), (660, y+65)], radius=6, fill='#0F172A')
        draw.text((75, y+15), code, font=font_sub, fill='#F43F5E')
        draw.text((75, y+38), f"{name} • Mã: {promo}", font=font_sm, fill='#94A3B8')
        draw.text((645, y+20), total, font=font_sub, fill='#FFFFFF', anchor='rt')
        draw.text((645, y+40), st, font=font_sm, fill='#FBBF24', anchor='rt')

    # Audit Logs from Trigger
    draw.rounded_rectangle([(710, 250), (width-40, 640)], radius=10, fill='#1E293B', outline='#334155', width=1)
    draw.text((730, 275), "NHẬT KÝ KIỂM TOÁN TỰ ĐỘNG (TRIGGER AUDIT LOGS)", font=font_sub, fill='#FFFFFF')

    logs = [
        ("[CREATE_ORDER] Tạo đơn SEP-20261111-600333. Tích lũy 166 điểm.", "guest.demo"),
        ("[RESTORE_STOCK] Hoàn kho tự động 2 sản phẩm khi hủy đơn 1001.", "SYSTEM (Trigger)"),
        ("[PRICE_CHANGE] Cập nhật giá sản phẩm 2210607 từ 210k -> 237.5k.", "admin"),
        ("[TIER_UPGRADE] Tự động thăng hạng khách hàng lên ROUGE (>= 1000đ).", "SYSTEM (Trigger)")
    ]
    for idx, (text, actor) in enumerate(logs):
        y = 315 + idx * 75
        draw.rounded_rectangle([(730, y), (width-60, y+65)], radius=6, fill='#0F172A')
        draw.text((745, y+15), text, font=font_sm, fill='#38BDF8')
        draw.text((745, y+40), f"Thực hiện bởi: {actor}", font=font_sm, fill='#64748B')

    im.save('docx/images/fig6_admin_dashboard_metrics.png')
    print("Generated docx/images/fig6_admin_dashboard_metrics.png")

if __name__ == '__main__':
    create_fig1()
    create_fig2()
    create_fig3()
    create_fig4()
    create_fig5()
    create_fig6()
