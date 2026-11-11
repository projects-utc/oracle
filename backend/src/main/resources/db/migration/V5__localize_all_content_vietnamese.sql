-- Migration V5: Chuyển đổi 100% dữ liệu sang tiếng Việt chuẩn UTF-8
SET DEFINE OFF;

-- Mở rộng độ dài các cột chuỗi sang độ đo ký tự (CHAR semantics) để hỗ trợ đầy đủ ký tự tiếng Việt UTF-8
ALTER TABLE sep_categories MODIFY (label VARCHAR2(255 CHAR));
ALTER TABLE sep_subcategories MODIFY (label VARCHAR2(255 CHAR));
ALTER TABLE sep_hero_banners MODIFY (title VARCHAR2(255 CHAR), subtitle VARCHAR2(500 CHAR), cta_text VARCHAR2(100 CHAR));
ALTER TABLE sep_savings_events MODIFY (title VARCHAR2(255 CHAR), subtitle VARCHAR2(500 CHAR), cta_text VARCHAR2(100 CHAR));
ALTER TABLE sep_savings_tiers MODIFY (label VARCHAR2(100 CHAR), discount_text VARCHAR2(100 CHAR), date_range VARCHAR2(100 CHAR));
ALTER TABLE sep_promo_offers MODIFY (title VARCHAR2(255 CHAR), description_text VARCHAR2(1000 CHAR), legal_copy VARCHAR2(500 CHAR), action_label VARCHAR2(100 CHAR), details_action_label VARCHAR2(100 CHAR));
ALTER TABLE sep_feature_tiles MODIFY (title VARCHAR2(255 CHAR), subtitle VARCHAR2(500 CHAR), cta_text VARCHAR2(100 CHAR));
ALTER TABLE sep_reward_items MODIFY (name VARCHAR2(255 CHAR), points_label VARCHAR2(100 CHAR));
ALTER TABLE sep_guidance_links MODIFY (label VARCHAR2(100 CHAR));
ALTER TABLE sep_reassurance_banners MODIFY (title VARCHAR2(255 CHAR), subtitle VARCHAR2(500 CHAR), cta_text VARCHAR2(100 CHAR));
ALTER TABLE sep_footer_columns MODIFY (title VARCHAR2(255 CHAR));
ALTER TABLE sep_footer_links MODIFY (label VARCHAR2(255 CHAR));
ALTER TABLE sep_stores MODIFY (name VARCHAR2(255 CHAR), address VARCHAR2(255 CHAR), city VARCHAR2(100 CHAR), hours_label VARCHAR2(100 CHAR), distance_label VARCHAR2(100 CHAR));

-- 1. CẬP NHẬT 3 SẢN PHẨM CÒN SÓT VÀ CHUYỂN TOÀN BỘ BADGE SANG TIẾNG VIỆT
UPDATE sep_products SET name = 'Kem Dưỡng Ẩm Chuyên Sâu Kiehl''s Ultra Facial Cream 24h', price_display = '975.000 ₫', price_value = 975000, variation = 'Hũ 50ml', badge = 'Bán chạy' WHERE sku_id = '2663763';
UPDATE sep_products SET name = 'Nước Hoa Nữ Dior J''adore Parfum d''Eau', price_display = '4.625.000 ₫', price_value = 4625000, variation = 'Chai 100ml', badge = 'Cao cấp' WHERE sku_id = '2553188';
UPDATE sep_products SET name = 'Dung Dịch Tẩy Tế Bào Chết Paula''s Choice Skin Perfecting 2% BHA Liquid', price_display = '925.000 ₫', price_value = 925000, variation = 'Chai 118ml', badge = 'Bán chạy' WHERE sku_id = '2421360';

UPDATE sep_products SET badge = 'Mỹ phẩm sạch' WHERE badge = 'Clean at Sephora';
UPDATE sep_products SET badge = 'Mỹ phẩm thuần chay' WHERE badge = 'Clean plus Planet Aware';
UPDATE sep_products SET badge = 'Giải thưởng Allure 2023' WHERE badge = 'allure 2023 Best of Beauty Award Winner';
UPDATE sep_products SET badge = 'Giải thưởng Allure 2024' WHERE badge = 'allure 2024 Best of Beauty Award Winner';
UPDATE sep_products SET badge = 'Giải thưởng Allure 2021' WHERE badge = '2021 Allure Best of Beauty Award Winner';
UPDATE sep_products SET badge = 'Yêu thích 2026' WHERE badge = 'best of beauty 2026';

-- 2. CẬP NHẬT 119 DANH MỤC CON (SUBCATEGORIES) SANG TIẾNG VIỆT
-- Category 1: gifts-value-sets (Bộ quà tặng)
UPDATE sep_subcategories SET label = 'Tất cả bộ quà tặng' WHERE id = 1;
UPDATE sep_subcategories SET label = 'Gợi ý quà tặng lễ hội' WHERE id = 2;
UPDATE sep_subcategories SET label = 'Thẻ quà tặng điện tử' WHERE id = 3;
UPDATE sep_subcategories SET label = 'Bộ combo quà tặng tiết kiệm' WHERE id = 4;
UPDATE sep_subcategories SET label = 'Tìm theo mức giá' WHERE id = 5;
UPDATE sep_subcategories SET label = 'Tìm theo danh mục' WHERE id = 6;
UPDATE sep_subcategories SET label = 'Tìm theo người nhận' WHERE id = 7;
UPDATE sep_subcategories SET label = 'Quà tặng đánh giá cao nhất' WHERE id = 8;
UPDATE sep_subcategories SET label = 'Bộ quà tặng đang giảm giá' WHERE id = 9;
UPDATE sep_subcategories SET label = 'Hộp quà lịch đếm ngược' WHERE id = 10;
UPDATE sep_subcategories SET label = 'Bộ sưu tập Sephora Favorites' WHERE id = 11;
UPDATE sep_subcategories SET label = 'Quà tặng size mini' WHERE id = 12;

-- Category 2: new (Sản phẩm mới)
UPDATE sep_subcategories SET label = 'Tất cả sản phẩm mới' WHERE id = 13;
UPDATE sep_subcategories SET label = 'Gợi ý quà tặng mới' WHERE id = 14;
UPDATE sep_subcategories SET label = 'Hàng mới lên kệ' WHERE id = 15;
UPDATE sep_subcategories SET label = 'Mỹ phẩm trang điểm mới' WHERE id = 16;
UPDATE sep_subcategories SET label = 'Chăm sóc da mới' WHERE id = 17;
UPDATE sep_subcategories SET label = 'Chăm sóc tóc mới' WHERE id = 18;
UPDATE sep_subcategories SET label = 'Nước hoa mới' WHERE id = 19;
UPDATE sep_subcategories SET label = 'Tắm & Dưỡng thể mới' WHERE id = 20;
UPDATE sep_subcategories SET label = 'Xu hướng làm đẹp mới' WHERE id = 21;
UPDATE sep_subcategories SET label = 'Sản phẩm bán chạy nhất' WHERE id = 22;
UPDATE sep_subcategories SET label = 'Thịnh hành trên mạng xã hội' WHERE id = 23;
UPDATE sep_subcategories SET label = 'Mỹ phẩm có lõi thay thế' WHERE id = 24;

-- Category 3: makeup (Trang điểm)
UPDATE sep_subcategories SET label = 'Tất cả trang điểm' WHERE id = 25;
UPDATE sep_subcategories SET label = 'Trang điểm mặt' WHERE id = 26;
UPDATE sep_subcategories SET label = 'Trang điểm mắt' WHERE id = 27;
UPDATE sep_subcategories SET label = 'Son môi & Dưỡng môi' WHERE id = 28;
UPDATE sep_subcategories SET label = 'Má hồng & Bắt sáng' WHERE id = 29;
UPDATE sep_subcategories SET label = 'Set trang điểm tiết kiệm' WHERE id = 30;
UPDATE sep_subcategories SET label = 'Bảng màu trang điểm' WHERE id = 31;
UPDATE sep_subcategories SET label = 'Chăm sóc móng' WHERE id = 32;
UPDATE sep_subcategories SET label = 'Cọ & Bông mút trang điểm' WHERE id = 33;
UPDATE sep_subcategories SET label = 'Phụ kiện trang điểm' WHERE id = 34;
UPDATE sep_subcategories SET label = 'Sản phẩm mới về' WHERE id = 35;
UPDATE sep_subcategories SET label = 'Bán chạy nhất' WHERE id = 36;

-- Category 4: skincare (Chăm sóc da)
UPDATE sep_subcategories SET label = 'Tất cả chăm sóc da' WHERE id = 37;
UPDATE sep_subcategories SET label = 'Kem dưỡng ẩm' WHERE id = 38;
UPDATE sep_subcategories SET label = 'Sữa rửa mặt & Tẩy trang' WHERE id = 39;
UPDATE sep_subcategories SET label = 'Serum & Tinh chất đặc trị' WHERE id = 40;
UPDATE sep_subcategories SET label = 'Mặt nạ dưỡng da' WHERE id = 41;
UPDATE sep_subcategories SET label = 'Chăm sóc vùng mắt' WHERE id = 42;
UPDATE sep_subcategories SET label = 'Son dưỡng & Mặt nạ môi' WHERE id = 43;
UPDATE sep_subcategories SET label = 'Kem chống nắng' WHERE id = 44;
UPDATE sep_subcategories SET label = 'Combo chăm sóc da tiết kiệm' WHERE id = 45;
UPDATE sep_subcategories SET label = 'Máy chăm sóc da công nghệ cao' WHERE id = 46;
UPDATE sep_subcategories SET label = 'Chăm sóc da nam giới' WHERE id = 47;
UPDATE sep_subcategories SET label = 'Làm đẹp & Sức khỏe' WHERE id = 48;

-- Category 5: fragrance (Nước hoa)
UPDATE sep_subcategories SET label = 'Tất cả nước hoa' WHERE id = 49;
UPDATE sep_subcategories SET label = 'Nước hoa Nữ' WHERE id = 50;
UPDATE sep_subcategories SET label = 'Nước hoa Nam' WHERE id = 51;
UPDATE sep_subcategories SET label = 'Nước hoa Unisex' WHERE id = 52;
UPDATE sep_subcategories SET label = 'Set nước hoa quà tặng' WHERE id = 53;
UPDATE sep_subcategories SET label = 'Nến thơm & Tinh dầu phòng' WHERE id = 54;
UPDATE sep_subcategories SET label = 'Chọn theo nhóm hương' WHERE id = 55;
UPDATE sep_subcategories SET label = 'Nước hoa mới' WHERE id = 56;
UPDATE sep_subcategories SET label = 'Nước hoa bán chạy' WHERE id = 57;
UPDATE sep_subcategories SET label = 'Nước hoa thuần chay' WHERE id = 58;
UPDATE sep_subcategories SET label = 'Nước hoa hương thảo mộc' WHERE id = 59;
UPDATE sep_subcategories SET label = 'Nước hoa mini & Travel spray' WHERE id = 60;

-- Category 6: hair (Chăm sóc tóc)
UPDATE sep_subcategories SET label = 'Tất cả chăm sóc tóc' WHERE id = 61;
UPDATE sep_subcategories SET label = 'Dầu gội & Dầu xả' WHERE id = 62;
UPDATE sep_subcategories SET label = 'Mặt nạ & Tinh dầu ủ tóc' WHERE id = 63;
UPDATE sep_subcategories SET label = 'Gel, Wax & Xịt tạo kiểu' WHERE id = 64;
UPDATE sep_subcategories SET label = 'Phụ kiện tóc' WHERE id = 65;
UPDATE sep_subcategories SET label = 'Combo chăm sóc tóc tiết kiệm' WHERE id = 66;
UPDATE sep_subcategories SET label = 'Xịt thơm tóc & cơ thể' WHERE id = 67;
UPDATE sep_subcategories SET label = 'Máy tạo kiểu tóc & Máy sấy' WHERE id = 68;
UPDATE sep_subcategories SET label = 'Lược chải chuyên dụng' WHERE id = 69;
UPDATE sep_subcategories SET label = 'Dưỡng tóc uốn & Tóc xoăn' WHERE id = 70;
UPDATE sep_subcategories SET label = 'Chọn theo tình trạng tóc' WHERE id = 71;
UPDATE sep_subcategories SET label = 'Chọn theo phong cách tóc' WHERE id = 72;

-- Category 7: bath-body (Tắm & Cơ thể)
UPDATE sep_subcategories SET label = 'Tất cả tắm & cơ thể' WHERE id = 73;
UPDATE sep_subcategories SET label = 'Sữa tắm & Tẩy tế bào chết body' WHERE id = 74;
UPDATE sep_subcategories SET label = 'Kem & Sữa dưỡng thể' WHERE id = 75;
UPDATE sep_subcategories SET label = 'Lăn & Xịt khử mùi' WHERE id = 76;
UPDATE sep_subcategories SET label = 'Xịt thơm toàn thân Body Mist' WHERE id = 77;
UPDATE sep_subcategories SET label = 'Kem chống nắng toàn thân' WHERE id = 78;
UPDATE sep_subcategories SET label = 'Sản phẩm nhuộm da nâu' WHERE id = 79;
UPDATE sep_subcategories SET label = 'Thư giãn & Spa tại nhà' WHERE id = 80;
UPDATE sep_subcategories SET label = 'Nến thơm phòng' WHERE id = 81;
UPDATE sep_subcategories SET label = 'Chọn theo nhu cầu cơ thể' WHERE id = 82;
UPDATE sep_subcategories SET label = 'Sản phẩm mới' WHERE id = 83;
UPDATE sep_subcategories SET label = 'Bán chạy nhất' WHERE id = 84;

-- Category 8: mini-size (Mỹ phẩm mini)
UPDATE sep_subcategories SET label = 'Tất cả mỹ phẩm mini' WHERE id = 85;
UPDATE sep_subcategories SET label = 'Trang điểm mini' WHERE id = 86;
UPDATE sep_subcategories SET label = 'Chăm sóc da mini' WHERE id = 87;
UPDATE sep_subcategories SET label = 'Chăm sóc tóc mini' WHERE id = 88;
UPDATE sep_subcategories SET label = 'Nước hoa mini' WHERE id = 89;
UPDATE sep_subcategories SET label = 'Tắm & Dưỡng thể mini' WHERE id = 90;
UPDATE sep_subcategories SET label = 'Set quà tặng mini' WHERE id = 91;
UPDATE sep_subcategories SET label = 'Dưới 350.000 ₫' WHERE id = 92;
UPDATE sep_subcategories SET label = 'Dưới 600.000 ₫' WHERE id = 93;
UPDATE sep_subcategories SET label = 'Dưới 850.000 ₫' WHERE id = 94;
UPDATE sep_subcategories SET label = 'Bộ sưu tập Sephora Favorites' WHERE id = 95;
UPDATE sep_subcategories SET label = 'Mỹ phẩm mini cao cấp' WHERE id = 96;

-- Category 9: brands (Thương hiệu)
UPDATE sep_subcategories SET label = 'Thương hiệu từ A-Z' WHERE id = 97;
UPDATE sep_subcategories SET label = 'Bộ sưu tập Sephora Collection' WHERE id = 98;
UPDATE sep_subcategories SET label = 'Thương hiệu mới' WHERE id = 99;
UPDATE sep_subcategories SET label = 'Thương hiệu nổi bật' WHERE id = 100;
UPDATE sep_subcategories SET label = 'Độc quyền tại Sephora' WHERE id = 101;
UPDATE sep_subcategories SET label = 'Thương hiệu giá tốt' WHERE id = 102;
UPDATE sep_subcategories SET label = 'Thương hiệu sáng tạo' WHERE id = 103;
UPDATE sep_subcategories SET label = 'Mỹ phẩm sạch & Lành tính' WHERE id = 104;

-- Category 10: gift-cards (Thẻ quà tặng)
UPDATE sep_subcategories SET label = 'Tất cả thẻ quà tặng' WHERE id = 105;
UPDATE sep_subcategories SET label = 'Thẻ quà tặng điện tử E-Voucher' WHERE id = 106;
UPDATE sep_subcategories SET label = 'Thẻ quà tặng vật lý' WHERE id = 107;
UPDATE sep_subcategories SET label = 'Thẻ quà tặng doanh nghiệp' WHERE id = 108;
UPDATE sep_subcategories SET label = 'Tra cứu số dư thẻ quà tặng' WHERE id = 109;
UPDATE sep_subcategories SET label = 'Cảnh giác lừa đảo thẻ quà tặng' WHERE id = 110;
UPDATE sep_subcategories SET label = 'Câu hỏi thường gặp về thẻ' WHERE id = 111;

-- Category 11: sale-offers (Khuyến mãi)
UPDATE sep_subcategories SET label = 'Tất cả sản phẩm giảm giá' WHERE id = 112;
UPDATE sep_subcategories SET label = 'Trang điểm giảm giá' WHERE id = 113;
UPDATE sep_subcategories SET label = 'Chăm sóc da giảm giá' WHERE id = 114;
UPDATE sep_subcategories SET label = 'Chăm sóc tóc giảm giá' WHERE id = 115;
UPDATE sep_subcategories SET label = 'Nước hoa giảm giá' WHERE id = 116;
UPDATE sep_subcategories SET label = 'Tắm & Thể hình giảm giá' WHERE id = 117;
UPDATE sep_subcategories SET label = 'Mỹ phẩm mini giảm giá' WHERE id = 118;
UPDATE sep_subcategories SET label = 'Ưu đãi & Quà tặng làm đẹp' WHERE id = 119;

-- 3. CẬP NHẬT HERO BANNERS SANG TIẾNG VIỆT
UPDATE sep_hero_banners SET title = 'Top Mỹ Phẩm Bán Chạy', subtitle = 'Bộ sưu tập mỹ phẩm chính hãng được yêu thích nhất', cta_text = 'KHÁM PHÁ NGAY ▸' WHERE id = 1;
UPDATE sep_hero_banners SET title = 'Chống Nắng Thế Hệ Mới', subtitle = 'Bảo vệ da toàn diện, mỏng nhẹ và nâng tông tự nhiên', cta_text = 'MUA NGAY ▸' WHERE id = 2;
UPDATE sep_hero_banners SET title = 'Bộ Quà Tặng Độc Quyền', subtitle = 'Tuyển chọn các set combo mỹ phẩm cao cấp ưu đãi mùa lễ hội', cta_text = 'XEM CHI TIẾT ▸' WHERE id = 3;

-- 4. CẬP NHẬT SAVINGS EVENT VÀ TIERS SANG TIẾNG VIỆT
UPDATE sep_savings_events SET title = 'Đại Tiệc Ưu Đãi Làm Đẹp Sephora', subtitle = 'Hạng Rouge hưởng ưu đãi đầu tiên, thành viên VIB và Insider nhận giảm giá toàn bộ sản phẩm từ ngày 03/11.', cta_text = 'XEM CHI TIẾT ▸' WHERE id = 1;

UPDATE sep_savings_tiers SET discount_text = 'GIẢM 30%', date_range = '30/10 – 09/11' WHERE id = 1;
UPDATE sep_savings_tiers SET discount_text = 'GIẢM 20%', date_range = '30/10 – 09/11' WHERE id = 2;
UPDATE sep_savings_tiers SET discount_text = 'GIẢM 15%', date_range = '03/11 – 09/11' WHERE id = 3;
UPDATE sep_savings_tiers SET discount_text = 'GIẢM 10%', date_range = '03/11 – 09/11' WHERE id = 4;

-- 5. CẬP NHẬT 23 MÃ KHUYẾN MÃI (PROMO OFFERS) SANG TIẾNG VIỆT
UPDATE sep_promo_offers SET title = 'Giảm 30% toàn bộ Sephora Collection', description_text = 'Tiết kiệm tối đa trong Đại tiệc ưu đãi Sephora. Sử dụng mã ALLONSALE khi thanh toán.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Nhiều lần sử dụng. Áp dụng điều khoản.' WHERE id = 1;
UPDATE sep_promo_offers SET title = 'Tặng túi mỹ phẩm cao cấp kèm 10 mẫu thử', description_text = 'Quà tặng độc quyền hạng Rouge cho đơn từ 3.750.000 ₫. Nhập mã INTHEBAG.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn. Áp dụng điều khoản.' WHERE id = 2;
UPDATE sep_promo_offers SET title = 'Chia sẻ ưu đãi giảm giá, hạng Rouge!', description_text = 'Tặng ngay 5 mã giảm 20% cho bạn bè cùng trải nghiệm mùa lễ hội.', action_label = 'Mời ngay', details_action_label = 'Chi tiết', legal_copy = 'Áp dụng điều khoản.' WHERE id = 3;
UPDATE sep_promo_offers SET title = 'Ưu đãi thanh toán thẻ thành viên Sephora', description_text = 'Tích lũy gấp đôi điểm thưởng khi thanh toán qua thẻ thành viên liên kết.', action_label = 'Tìm hiểu thêm', details_action_label = 'Chi tiết', legal_copy = 'Áp dụng điều khoản.' WHERE id = 4;
UPDATE sep_promo_offers SET title = 'Mua càng nhiều, Nhận quà càng lớn', description_text = 'Nhận 2, 4 hoặc 6 mẫu thử cao cấp miễn phí cho đơn từ 1.300.000 ₫, 2.000.000 ₫ hoặc 2.600.000 ₫.', action_label = 'Tải ứng dụng', details_action_label = 'Chi tiết', legal_copy = 'Áp dụng điều khoản.' WHERE id = 5;
UPDATE sep_promo_offers SET title = 'Tặng mẫu thử xả khô phục hồi tóc K18', description_text = 'Trải nghiệm kem xả khô HeatBounce bảo vệ tóc trước nhiệt và cấp ẩm sâu.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn.' WHERE id = 6;
UPDATE sep_promo_offers SET title = 'Mẫu thử Paula’s Choice chính hãng miễn phí', description_text = 'Thu nhỏ lỗ chân lông và làm căng mịn da với toner BHA 2% và kem dưỡng collagen.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn.' WHERE id = 7;
UPDATE sep_promo_offers SET title = 'Trải nghiệm mẫu thử dưỡng da Hàn Quốc', description_text = 'Tự do chọn 1 trong 4 mẫu thử K-Beauty cao cấp cho đơn hàng bất kỳ.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn.' WHERE id = 8;
UPDATE sep_promo_offers SET title = 'Bộ đôi mẫu thử dưỡng tóc bóng mượt Oribe', description_text = 'Nhận kem xả khô và tinh chất dưỡng tóc suôn mượt chuẩn salon cao cấp.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn.' WHERE id = 9;
UPDATE sep_promo_offers SET title = 'Quà tặng mini Caudalie cao cấp', description_text = 'Chọn mẫu thử kem dưỡng sáng da Vinoperfect hoặc kem chống lão hóa Premier Cru.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn.' WHERE id = 10;
UPDATE sep_promo_offers SET title = 'Set quà tặng Charlotte Tilbury độc quyền', description_text = 'Tặng xịt khóa nền Airbrush Flawless mini, móc khóa thời trang và túi tote sành điệu.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn.' WHERE id = 11;
UPDATE sep_promo_offers SET title = 'Tặng túi Tote thời trang OLIVE YOUNG', description_text = 'Mua sắm các thương hiệu làm đẹp Hàn Quốc và nhận túi tote độc quyền.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn.' WHERE id = 12;
UPDATE sep_promo_offers SET title = 'Tặng túi trang điểm phao Marc Jacobs Beauty', description_text = 'Tặng túi đựng mỹ phẩm êm ái phong cách khi mua sắm các sản phẩm của thương hiệu.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn.' WHERE id = 13;
UPDATE sep_promo_offers SET title = 'Giảm 25% cho đơn hàng đầu tiên', description_text = 'Ưu đãi dành riêng cho thành viên mới đăng ký tài khoản tại Sephora.', action_label = 'Tìm hiểu thêm', details_action_label = 'Chi tiết', legal_copy = 'Áp dụng điều khoản.' WHERE id = 14;
UPDATE sep_promo_offers SET title = 'Tích lũy đến 500 điểm thưởng Beauty Insider', description_text = 'Nhận ngay điểm thưởng khi hoàn thành đơn hàng online và chọn nhận tại cửa hàng.', action_label = 'Tham gia ngay', details_action_label = 'Chi tiết', legal_copy = 'Áp dụng điều khoản.' WHERE id = 15;
UPDATE sep_promo_offers SET title = 'Giao hàng hỏa tốc trong 2 giờ', description_text = 'Nhận ngay mỹ phẩm yêu thích tại nhà với dịch vụ giao hàng siêu tốc.', action_label = 'Đăng ký ngay', details_action_label = 'Chi tiết', legal_copy = 'Áp dụng tại HN và TP.HCM.' WHERE id = 16;
UPDATE sep_promo_offers SET title = 'Tặng mẫu thử kem dưỡng phục hồi Point of View', description_text = 'Tăng cường hàng rào bảo vệ da với kem dưỡng ẩm mỏng nhẹ, căng bóng rạng ngời.', action_label = 'Chọn mẫu thử', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn.' WHERE id = 17;
UPDATE sep_promo_offers SET title = 'Tặng 3 mẫu nước hoa mini cao cấp', description_text = 'Nhận ngay 3 mẫu thử nước hoa cao cấp cho đơn hàng từ 600.000 ₫.', action_label = 'Chọn ngay', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn.' WHERE id = 18;
UPDATE sep_promo_offers SET title = 'Ưu đãi mặt nạ giấy Sephora Collection', description_text = 'Mua 3 tặng 1 cho toàn bộ dòng mặt nạ giấy dưỡng da chiết xuất thiên nhiên.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Số lượng có hạn.' WHERE id = 19;
UPDATE sep_promo_offers SET title = 'Giảm 10% khi đăng ký định kỳ K18 Hairscience', description_text = 'Đăng ký nhận hàng định kỳ để nhận ưu đãi và giữ tóc luôn khỏe đẹp.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Áp dụng điều khoản.' WHERE id = 20;
UPDATE sep_promo_offers SET title = 'Giảm 10% khi đặt hàng định kỳ Sephora Collection', description_text = 'Tiết kiệm chi phí mỗi tháng với các sản phẩm làm đẹp thiết yếu giao tận nhà.', action_label = 'Mua ngay', details_action_label = 'Chi tiết', legal_copy = 'Áp dụng điều khoản.' WHERE id = 21;
UPDATE sep_promo_offers SET title = 'Tiết kiệm thêm 5% với giao hàng tự động', description_text = 'Không bao giờ lo gián đoạn chu trình dưỡng da với gói giao hàng định kỳ.', action_label = 'Tìm hiểu thêm', details_action_label = 'Chi tiết', legal_copy = 'Áp dụng điều khoản.' WHERE id = 22;
UPDATE sep_promo_offers SET title = 'Miễn phí vận chuyển toàn quốc cho mọi đơn hàng', description_text = 'Giao hàng nhanh chóng, chuẩn xác và hoàn toàn miễn phí cho thành viên.', action_label = 'Đăng ký ngay', details_action_label = 'Chi tiết', legal_copy = 'Áp dụng điều khoản.' WHERE id = 23;

-- 6. CẬP NHẬT FEATURE TILES SANG TIẾNG VIỆT
UPDATE sep_feature_tiles SET title = 'Nước Hoa Cao Cấp HUDA BEAUTY', subtitle = 'Thưởng thức hương thơm Easy Bake Intense ngọt ngào, ấm áp và quyến rũ.', cta_text = 'KHÁM PHÁ NGAY ▸' WHERE id = 1;
UPDATE sep_feature_tiles SET title = 'Chăm Sóc Cơ Thể Đẳng Cấp', subtitle = 'Nuông chiều làn da với các công thức dưỡng ẩm cao cấp từ Summer Fridays.', cta_text = 'MUA NGAY ▸' WHERE id = 2;
UPDATE sep_feature_tiles SET title = 'Mỹ Phẩm Thuần Chay & Lành Tính', subtitle = 'Khám phá ngay các dòng son bóng, thỏi đa năng và phấn mắt an toàn cho da.', cta_text = 'XEM THÊM ▸' WHERE id = 3;

-- 7. CẬP NHẬT REWARD ITEMS (KHO QUÀ ĐỔI ĐIỂM) SANG TIẾNG VIỆT
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Tinh chất nhuộm da tự nhiên Self-Tan Face Drops' WHERE id = 1;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Serum phục hồi sinh học BioRejuvenation Collagen' WHERE id = 2;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Sáp dưỡng đạm thực vật Retinol + Collagen Peptides' WHERE id = 3;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Kem dưỡng xả khô phục hồi The Water Boi' WHERE id = 4;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Kem chống nắng kiêm kem lót Supreme Screen SPF 50' WHERE id = 5;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Gel dưỡng ẩm căng mọng Peptide Air Angel' WHERE id = 6;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Thạch dưỡng ẩm cấp nước Hyaluronic Water Drench' WHERE id = 7;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Dầu dưỡng Argan 100% hữu cơ nguyên chất' WHERE id = 8;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Tinh chất phục hồi ban đêm Advanced Night Repair' WHERE id = 9;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Kem dưỡng mắt xóa bọng Resveratrol-Lift Pro-Collagen' WHERE id = 10;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Xịt thơm tóc & cơ thể hương dừa Ambiance de Plage' WHERE id = 11;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Kem dưỡng ẩm chống nắng Hydra Vizor SPF 30' WHERE id = 12;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Mặt nạ miếng nâng cơ xóa nhăn Peptide Skinjection' WHERE id = 13;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Xịt giữ nếp siêu bền bỉ Volume Spray 25' WHERE id = 14;
UPDATE sep_reward_items SET points_label = '100 Điểm', name = 'Gel chống xơ rối kiểm soát độ ẩm tóc xoăn Climate Control' WHERE id = 15;

-- 8. CẬP NHẬT GUIDANCE LINKS SANG TIẾNG VIỆT
UPDATE sep_guidance_links SET label = 'Gợi ý quà tặng' WHERE id = 1;
UPDATE sep_guidance_links SET label = 'Set combo tiết kiệm' WHERE id = 2;
UPDATE sep_guidance_links SET label = 'Nước hoa chính hãng' WHERE id = 3;
UPDATE sep_guidance_links SET label = 'Hộp quà lịch đếm ngược' WHERE id = 4;
UPDATE sep_guidance_links SET label = 'Thịnh hành mạng xã hội' WHERE id = 5;
UPDATE sep_guidance_links SET label = 'Cẩm nang dưỡng da' WHERE id = 6;
UPDATE sep_guidance_links SET label = 'Khuyến mãi đặc biệt' WHERE id = 7;

-- 9. CẬP NHẬT REASSURANCE BANNERS SANG TIẾNG VIỆT
UPDATE sep_reassurance_banners SET title = 'Giao Hàng Miễn Phí Toàn Quốc', subtitle = 'Giao nhanh, an toàn và hoàn toàn miễn phí cho mọi đơn hàng', cta_text = 'TÌM HIỂU THÊM ▸' WHERE id = 1;
UPDATE sep_reassurance_banners SET title = 'Gợi Ý Quà Tặng Hoàn Hảo', subtitle = 'Những món quà làm đẹp ai cũng mong muốn kèm ưu đãi hấp dẫn', cta_text = 'MUA NGAY ▸' WHERE id = 2;
UPDATE sep_reassurance_banners SET title = 'Thanh Toán COD An Tâm', subtitle = 'Đồng kiểm tra hàng trước khi thanh toán, đổi trả trong 7 ngày', cta_text = 'XEM CHI TIẾT ▸' WHERE id = 3;

-- 10. CẬP NHẬT FOOTER COLUMNS VÀ LINKS SANG TIẾNG VIỆT
UPDATE sep_footer_columns SET title = 'Về Sephora' WHERE id = 1;
UPDATE sep_footer_columns SET title = 'Sephora Của Tôi' WHERE id = 2;
UPDATE sep_footer_columns SET title = 'Hỗ Trợ Khách Hàng' WHERE id = 3;

UPDATE sep_footer_links SET label = 'Giới thiệu về Sephora' WHERE id = 1;
UPDATE sep_footer_links SET label = 'Phòng thông tin báo chí' WHERE id = 2;
UPDATE sep_footer_links SET label = 'Cơ hội nghề nghiệp' WHERE id = 3;
UPDATE sep_footer_links SET label = 'Giá trị cốt lõi của Sephora' WHERE id = 4;
UPDATE sep_footer_links SET label = 'Minh bạch chuỗi cung ứng' WHERE id = 5;
UPDATE sep_footer_links SET label = 'Hợp tác tiếp thị liên kết' WHERE id = 6;
UPDATE sep_footer_links SET label = 'Sự kiện làm đẹp Sephora' WHERE id = 7;
UPDATE sep_footer_links SET label = 'Thẻ quà tặng' WHERE id = 8;
UPDATE sep_footer_links SET label = 'Hệ thống Sephora toàn cầu' WHERE id = 9;
UPDATE sep_footer_links SET label = 'Đa dạng, Công bằng & Hòa nhập' WHERE id = 10;
UPDATE sep_footer_links SET label = 'Chương trình ươm mầm Sephora' WHERE id = 11;
UPDATE sep_footer_links SET label = 'Tái chế bao bì mỹ phẩm' WHERE id = 12;
UPDATE sep_footer_links SET label = 'Báo cáo lỗ hổng bảo mật' WHERE id = 13;

UPDATE sep_footer_links SET label = 'Thành viên Beauty Insider' WHERE id = 14;
UPDATE sep_footer_links SET label = 'Thẻ tín dụng Sephora' WHERE id = 15;
UPDATE sep_footer_links SET label = 'Bộ sưu tập cộng đồng' WHERE id = 16;
UPDATE sep_footer_links SET label = 'Tình trạng đơn hàng' WHERE id = 17;
UPDATE sep_footer_links SET label = 'Lịch sử mua hàng' WHERE id = 18;
UPDATE sep_footer_links SET label = 'Cài đặt tài khoản' WHERE id = 19;
UPDATE sep_footer_links SET label = 'Dịch vụ làm đẹp & Sự kiện' WHERE id = 20;
UPDATE sep_footer_links SET label = 'Đăng ký giao hàng định kỳ' WHERE id = 21;
UPDATE sep_footer_links SET label = 'Ưu đãi & Khuyến mãi' WHERE id = 22;
UPDATE sep_footer_links SET label = 'Sàn đổi quà Rewards Bazaar' WHERE id = 23;
UPDATE sep_footer_links SET label = 'Sản phẩm yêu thích' WHERE id = 24;
UPDATE sep_footer_links SET label = 'Mua sắm tại showroom gần bạn' WHERE id = 25;
UPDATE sep_footer_links SET label = 'Giao hàng hỏa tốc trong ngày' WHERE id = 26;

UPDATE sep_footer_links SET label = 'Chăm sóc khách hàng 24/7' WHERE id = 27;
UPDATE sep_footer_links SET label = 'Chính sách đổi trả & Hoàn tiền' WHERE id = 28;
UPDATE sep_footer_links SET label = 'Phương thức giao nhận hàng' WHERE id = 29;
UPDATE sep_footer_links SET label = 'Thông tin vận chuyển toàn quốc' WHERE id = 30;
UPDATE sep_footer_links SET label = 'Phương thức thanh toán' WHERE id = 31;
UPDATE sep_footer_links SET label = 'Giao hàng quốc tế' WHERE id = 32;
UPDATE sep_footer_links SET label = 'Cẩm nang hướng dẫn mua hàng' WHERE id = 33;
UPDATE sep_footer_links SET label = 'Câu hỏi thường gặp về dịch vụ' WHERE id = 34;
UPDATE sep_footer_links SET label = 'Hệ thống Sephora tại TTTM' WHERE id = 35;
UPDATE sep_footer_links SET label = 'Tìm cửa hàng gần nhất' WHERE id = 36;
UPDATE sep_footer_links SET label = 'Thanh toán linh hoạt COD' WHERE id = 37;
UPDATE sep_footer_links SET label = 'Khả năng tiếp cận dịch vụ' WHERE id = 38;
UPDATE sep_footer_links SET label = 'Cẩm nang chăm sóc da trẻ tuổi' WHERE id = 39;

-- 11. CẬP NHẬT HỆ THỐNG CỬA HÀNG (STORES) TẠI VIỆT NAM
UPDATE sep_stores SET name = 'Sephora Vincom Center Đồng Khởi', address = '72 Lê Thánh Tôn, Phường Bến Nghé, Quận 1', city = 'TP. Hồ Chí Minh', state_code = 'VN', zip_code = '70000', distance_label = '0.5 km', hours_label = 'Mở cửa đến 22:00' WHERE id = 1;
UPDATE sep_stores SET name = 'Sephora Saigon Centre', address = '65 Lê Lợi, Phường Bến Nghé, Quận 1', city = 'TP. Hồ Chí Minh', state_code = 'VN', zip_code = '70000', distance_label = '1.2 km', hours_label = 'Mở cửa đến 22:00' WHERE id = 2;
UPDATE sep_stores SET name = 'Sephora Vincom Bà Triệu', address = '191 Bà Triệu, Phường Lê Đại Hành, Quận Hai Bà Trưng', city = 'Hà Nội', state_code = 'VN', zip_code = '10000', distance_label = '0.8 km', hours_label = 'Mở cửa đến 22:00' WHERE id = 3;
UPDATE sep_stores SET name = 'Sephora Tràng Tiền Plaza', address = '24 Hai Bà Trưng, Phường Tràng Tiền, Quận Hoàn Kiếm', city = 'Hà Nội', state_code = 'VN', zip_code = '10000', distance_label = '1.5 km', hours_label = 'Mở cửa đến 21:30' WHERE id = 4;
UPDATE sep_stores SET name = 'Sephora Lotte Mall West Lake', address = '272 Võ Chí Công, Phường Phú Thượng, Quận Tây Hồ', city = 'Hà Nội', state_code = 'VN', zip_code = '10000', distance_label = '2.0 km', hours_label = 'Mở cửa đến 22:00' WHERE id = 5;
UPDATE sep_stores SET name = 'Sephora Landmark 81', address = '720A Điện Biên Phủ, Phường 22, Quận Bình Thạnh', city = 'TP. Hồ Chí Minh', state_code = 'VN', zip_code = '70000', distance_label = '2.5 km', hours_label = 'Mở cửa đến 22:00' WHERE id = 6;

COMMIT;
