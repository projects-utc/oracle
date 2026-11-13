#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script tạo Slide thuyết trình Báo cáo Bài tập lớn môn Hệ quản trị CSDL Oracle
Trường Đại học Giao thông Vận tải (UTC) - Khoa CNTT
Giảng viên hướng dẫn: ThS. Nguyễn Việt Hưng
Đề tài: Thiết kế & Hiện thực hóa CSDL Thương mại Điện tử Sephora trên Oracle Database 23ai Free
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

# Màu sắc chủ đạo (Corporate Tech Palette)
COLOR_NAVY_DARK = RGBColor(10, 25, 47)      # #0A192F - Nền tiêu đề, Header
COLOR_BLUE_ACCENT = RGBColor(30, 58, 138)   # #1E3A8A - Primary Brand
COLOR_BLUE_LIGHT = RGBColor(37, 99, 235)    # #2563EB - Highlight
COLOR_TEXT_DARK = RGBColor(15, 23, 42)      # #0F172A - Body text
COLOR_TEXT_MUTED = RGBColor(71, 85, 105)    # #475569 - Secondary text
COLOR_BG_CARD = RGBColor(248, 250, 252)     # #F8FAFC - Card background
COLOR_BORDER_CARD = RGBColor(226, 232, 240) # #E2E8F0 - Card border
COLOR_EMERALD = RGBColor(5, 150, 105)       # #059669 - Accent Green
COLOR_AMBER = RGBColor(217, 119, 6)         # #D97706 - Accent Orange
COLOR_WHITE = RGBColor(255, 255, 255)

def create_presentation():
    prs = Presentation()
    # Tỷ lệ 16:9 Widescreen hiện đại (13.333 x 7.5 inches)
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    def add_header(slide, title_text, category_text="BÁO CÁO BÀI TẬP LỚN ORACLE 23ai | ĐH GIAO THÔNG VẬN TẢI"):
        # Header banner top
        banner = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(1.15))
        banner.fill.solid()
        banner.fill.fore_color.rgb = COLOR_NAVY_DARK
        banner.line.color.rgb = COLOR_BLUE_ACCENT
        banner.line.width = Pt(1.5)

        # Category text nhỏ phía trên
        tf_cat = banner.text_frame
        tf_cat.word_wrap = True
        tf_cat.margin_left = Inches(0.8)
        tf_cat.margin_top = Inches(0.12)
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = RGBColor(148, 163, 184) # Muted slate

        # Title text lớn
        p_title = tf_cat.add_paragraph()
        p_title.text = title_text
        p_title.font.size = Pt(20)
        p_title.font.bold = True
        p_title.font.color.rgb = COLOR_WHITE
        p_title.space_before = Pt(2)

        # Footer đáy
        footer = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.15), Inches(13.333), Inches(0.35))
        footer.fill.solid()
        footer.fill.fore_color.rgb = RGBColor(241, 245, 249)
        footer.line.fill.background()
        tf_foot = footer.text_frame
        tf_foot.margin_left = Inches(0.8)
        tf_foot.margin_top = Inches(0.06)
        p_foot = tf_foot.paragraphs[0]
        p_foot.text = "Nhóm 3 - Lớp CNTT K63 | Giảng viên hướng dẫn: ThS. Nguyễn Việt Hưng | Đề tài: CSDL Sephora trên Oracle 23ai"
        p_foot.font.size = Pt(9.5)
        p_foot.font.color.rgb = COLOR_TEXT_MUTED

    def add_card(slide, left, top, width, height, title=None, bg_color=COLOR_BG_CARD, border_color=COLOR_BORDER_CARD):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, left, top, width, height)
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1.2)
        if title:
            tf = card.text_frame
            tf.word_wrap = True
            tf.margin_left = Inches(0.25)
            tf.margin_top = Inches(0.2)
            p = tf.paragraphs[0]
            p.text = title
            p.font.size = Pt(14)
            p.font.bold = True
            p.font.color.rgb = COLOR_BLUE_ACCENT
        return card

    # =========================================================================
    # SLIDE 1: TRANG TIÊU ĐỀ (TITLE SLIDE)
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)
    bg1 = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
    bg1.fill.solid()
    bg1.fill.fore_color.rgb = COLOR_NAVY_DARK
    bg1.line.fill.background()

    # Dải màu trang trí phía dưới
    accent_bar = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, Inches(7.35), Inches(13.333), Inches(0.15))
    accent_bar.fill.solid()
    accent_bar.fill.fore_color.rgb = COLOR_BLUE_LIGHT
    accent_bar.line.fill.background()

    # Khung text chính
    box1 = slide1.shapes.add_textbox(Inches(1.0), Inches(0.9), Inches(11.333), Inches(5.6))
    tf1 = box1.text_frame
    tf1.word_wrap = True

    p0 = tf1.paragraphs[0]
    p0.text = "TRƯỜNG ĐẠI HỌC GIAO THÔNG VẬN TẢI - KHOA CÔNG NGHỆ THÔNG TIN"
    p0.font.size = Pt(13)
    p0.font.bold = True
    p0.font.color.rgb = RGBColor(148, 163, 184)
    p0.alignment = PP_ALIGN.CENTER

    p1 = tf1.add_paragraph()
    p1.text = "BÁO CÁO BÀI TẬP LỚN MÔN HỌC"
    p1.font.size = Pt(18)
    p1.font.bold = True
    p1.font.color.rgb = COLOR_EMERALD
    p1.alignment = PP_ALIGN.CENTER
    p1.space_before = Pt(16)

    p2 = tf1.add_paragraph()
    p2.text = "HỆ QUẢN TRỊ CƠ SỞ DỮ LIỆU ORACLE"
    p2.font.size = Pt(28)
    p2.font.bold = True
    p2.font.color.rgb = COLOR_WHITE
    p2.alignment = PP_ALIGN.CENTER
    p2.space_before = Pt(8)

    p3 = tf1.add_paragraph()
    p3.text = "ĐỀ TÀI: THIẾT KẾ VÀ HIỆN THỰC HÓA HỆ THỐNG CƠ SỞ DỮ LIỆU\nTHƯƠNG MẠI ĐIỆN TỬ SEPHORA TRÊN NỀN TẢNG ORACLE DATABASE 23ai FREE"
    p3.font.size = Pt(18)
    p3.font.bold = True
    p3.font.color.rgb = RGBColor(226, 232, 240)
    p3.alignment = PP_ALIGN.CENTER
    p3.space_before = Pt(16)

    # Box thông tin Giảng viên & Sinh viên
    info_card = slide1.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(2.8), Inches(4.7), Inches(7.733), Inches(1.9))
    info_card.fill.solid()
    info_card.fill.fore_color.rgb = RGBColor(15, 32, 67)
    info_card.line.color.rgb = COLOR_BLUE_LIGHT
    info_card.line.width = Pt(1.5)
    tf_info = info_card.text_frame
    tf_info.word_wrap = True
    tf_info.margin_top = Inches(0.2)
    tf_info.margin_left = Inches(0.4)

    p_gv = tf_info.paragraphs[0]
    p_gv.text = "Giảng viên hướng dẫn: ThS. NGUYỄN VIỆT HƯNG"
    p_gv.font.size = Pt(14)
    p_gv.font.bold = True
    p_gv.font.color.rgb = COLOR_AMBER

    p_sv = tf_info.add_paragraph()
    p_sv.text = "Nhóm sinh viên thực hiện: NHÓM 3 - LỚP CÔNG NGHỆ THÔNG TIN K63"
    p_sv.font.size = Pt(13)
    p_sv.font.bold = True
    p_sv.font.color.rgb = COLOR_WHITE
    p_sv.space_before = Pt(8)

    p_date = tf_info.add_paragraph()
    p_date.text = "Hà Nội - Năm học 2026 - 2027"
    p_date.font.size = Pt(12)
    p_date.font.italic = True
    p_date.font.color.rgb = RGBColor(148, 163, 184)
    p_date.space_before = Pt(6)

    # =========================================================================
    # SLIDE 2: ĐẶT VẤN ĐỀ & MỤC TIÊU ĐỀ TÀI
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    add_header(slide2, "1. ĐẶT VẤN ĐỀ & MỤC TIÊU NGHIÊN CỨU")

    card2_left = add_card(slide2, Inches(0.8), Inches(1.5), Inches(5.6), Inches(5.3), "THÁCH THỨC BÀI TOÁN TMĐT (SEPHORA)")
    tf2_l = card2_left.text_frame
    items_l = [
        ("Xung đột tương tranh cao (Flash Sale):", " Khi hàng trăm khách hàng cùng tranh mua 1 sản phẩm có tồn kho hạn chế, đọc ghi đồng thời rất dễ gây Race Condition và bán âm kho."),
        ("Quản trị tài nguyên phân tán:", " Nhu cầu cách ly dữ liệu giữa môi trường quản trị dùng chung và cơ sở dữ liệu ứng dụng của sàn."),
        ("Quản lý lưu trữ & Hiệu năng I/O:", " Dữ liệu bảng và dữ liệu chỉ mục phình to nhanh chóng làm nghẽn cổ chai I/O nếu để chung tablespace mặc định."),
        ("Gánh nặng tính toán phía Application:", " Việc truy vấn toàn bộ dữ liệu lên máy chủ ứng dụng để tính báo cáo doanh thu gây tràn RAM máy chủ.")
    ]
    for title, desc in items_l:
        p = tf2_l.add_paragraph()
        p.space_before = Pt(10)
        r1 = p.add_run()
        r1.text = "• " + title
        r1.font.bold = True
        r1.font.size = Pt(12.5)
        r1.font.color.rgb = COLOR_TEXT_DARK
        r2 = p.add_run()
        r2.text = desc
        r2.font.size = Pt(12)
        r2.font.color.rgb = COLOR_TEXT_MUTED

    card2_right = add_card(slide2, Inches(6.8), Inches(1.5), Inches(5.7), Inches(5.3), "GIẢI PHÁP & MỤC TIÊU VỚI ORACLE 23ai")
    tf2_r = card2_right.text_frame
    items_r = [
        ("Mô hình Multitenant hiện đại:", " Phân tách độc lập CDB$ROOT và Pluggable Database (FREEPDB1)."),
        ("Tối ưu lưu trữ vật lý chuyên nghiệp:", " Tách bạch SEPHORA_DATA_TBS và SEPHORA_IDX_TBS với chính sách AutoExtend và Quota chặt chẽ."),
        ("Khóa bi quan (Pessimistic Locking):", " Triển khai SELECT ... FOR UPDATE trong Package PL/SQL, triệt tiêu 100% rủi ro bán âm kho."),
        ("Tự động hóa bằng Database Triggers:", " Tự động hoàn kho khi hủy đơn, kiểm toán lịch sử giá, tự động thăng hạng khách hàng."),
        ("Views & Function-based Index:", " Tính toán thống kê trực tiếp tại nhân Oracle DB và tối ưu truy vấn đạt trạng thái INDEX RANGE SCAN.")
    ]
    for title, desc in items_r:
        p = tf2_r.add_paragraph()
        p.space_before = Pt(10)
        r1 = p.add_run()
        r1.text = "✓ " + title
        r1.font.bold = True
        r1.font.size = Pt(12.5)
        r1.font.color.rgb = COLOR_EMERALD
        r2 = p.add_run()
        r2.text = desc
        r2.font.size = Pt(12)
        r2.font.color.rgb = COLOR_TEXT_MUTED

    # =========================================================================
    # SLIDE 3: KIẾN TRÚC ORACLE 23ai MULTITENANT (CDB & PDB)
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    add_header(slide3, "2. KIẾN TRÚC TỔNG THỂ ORACLE 23ai MULTITENANT")

    card3_info = add_card(slide3, Inches(0.8), Inches(1.5), Inches(5.2), Inches(5.3), "ĐẶC TRƯNG MÔ HÌNH MULTITENANT")
    tf3 = card3_info.text_frame
    pts3 = [
        ("CDB$ROOT (Container Gốc):", " Chứa từ điển dữ liệu hệ thống (Data Dictionary) và các tài khoản quản trị chung (Common Users C##)."),
        ("PDB$SEED (Khuôn Mẫu PDB):", " Cơ sở dữ liệu mẫu chỉ đọc, cho phép nhân bản (clone) nhanh các PDB con trong vài giây."),
        ("FREEPDB1 (Pluggable Database Ứng Dụng):", " Cơ sở dữ liệu độc lập chứa schema `ora_u8k4m2p9` và 24 bảng dữ liệu nghiệp vụ Sephora."),
        ("Cấu trúc Bộ nhớ & Tiến trình nền:", " SGA (Buffer Cache, Shared Pool, Redo Log Buffer), PGA riêng từng phiên và các background processes: DBWn, LGWR, CKPT, SMON, PMON."),
        ("Tính năng Oracle 23ai Free:", " Bản nâng cấp hỗ trợ đa dạng kiểu dữ liệu mới, tối ưu hóa bộ tối ưu truy vấn CBO hiện đại nhất.")
    ]
    for t, d in pts3:
        p = tf3.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = "• " + t
        r1.font.bold = True
        r1.font.size = Pt(12)
        r1.font.color.rgb = COLOR_BLUE_ACCENT
        r2 = p.add_run()
        r2.text = d
        r2.font.size = Pt(11.5)
        r2.font.color.rgb = COLOR_TEXT_MUTED

    # Chèn ảnh fig1 bên phải
    img1_path = "docx/images/fig1_oracle_multitenant_architecture.png"
    if os.path.exists(img1_path):
        slide3.shapes.add_picture(img1_path, Inches(6.3), Inches(1.5), width=Inches(6.2))

    # =========================================================================
    # SLIDE 4: QUẢN LÝ LƯU TRỮ VẬT LÝ (TABLESPACES & QUOTA)
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    add_header(slide4, "3. THIẾT KẾ LƯU TRỮ VẬT LÝ: TABLESPACES & QUOTA")

    card4_data = add_card(slide4, Inches(0.8), Inches(1.5), Inches(5.7), Inches(2.5), "SEPHORA_DATA_TBS (Lưu trữ Dữ liệu Bảng)")
    tf4_d = card4_data.text_frame
    p = tf4_d.add_paragraph()
    p.space_before = Pt(6)
    p.text = "• Kích thước khởi tạo: 50 MB\n• Cơ chế mở rộng: AUTOEXTEND ON NEXT 10 MB MAXSIZE 500 MB\n• Phục vụ: Table Segments của 24 bảng nghiệp vụ (Orders, Products...)\n• Tác dụng: Ngăn chặn triệt để phân mảnh và ô nhiễm tablespace SYSTEM."
    p.font.size = Pt(12)
    p.font.color.rgb = COLOR_TEXT_DARK

    card4_idx = add_card(slide4, Inches(6.8), Inches(1.5), Inches(5.7), Inches(2.5), "SEPHORA_IDX_TBS (Lưu trữ Chỉ mục Index)")
    tf4_i = card4_idx.text_frame
    p = tf4_i.add_paragraph()
    p.space_before = Pt(6)
    p.text = "• Kích thước khởi tạo: 30 MB\n• Cơ chế mở rộng: AUTOEXTEND ON NEXT 5 MB MAXSIZE 200 MB\n• Phục vụ: B-Tree Indexes, Function-based Index, Khóa chính / Khóa ngoại\n• Tác dụng: Tách biệt I/O đọc bảng và I/O dò tìm chỉ mục trên các datafile riêng."
    p.font.size = Pt(12)
    p.font.color.rgb = COLOR_TEXT_DARK

    card4_bot = add_card(slide4, Inches(0.8), Inches(4.3), Inches(11.7), Inches(2.5), "HẠN NGẠCH LƯU TRỮ (USER QUOTA) & Ý NGHĨA KỸ THUẬT")
    tf4_b = card4_bot.text_frame
    items_b = [
        ("Hạn chế tài nguyên cho User ứng dụng:", " Cấp `QUOTA 100M ON sephora_data_tbs` cho tài khoản `sephora_app`. User không được cấp quota không giới hạn (UNLIMITED), loại bỏ nguy cơ mã độc làm cạn kiệt dung lượng ổ đĩa máy chủ."),
        ("Tối ưu hóa hiệu năng I/O đa luồng:", " Khi thực hiện các câu lệnh JOIN phức tạp, tiến trình máy chủ Oracle đọc song song từ Datafile dữ liệu và Datafile chỉ mục, giảm 40% độ trễ Disk Contention so với việc lưu chung."),
        ("An toàn sao lưu & Phục hồi:", " Dễ dàng thiết lập chính sách Backup độc lập cho phân vùng Data và Index mà không làm gián đoạn toàn bộ hệ thống.")
    ]
    for t, d in items_b:
        p = tf4_b.add_paragraph()
        p.space_before = Pt(6)
        r1 = p.add_run()
        r1.text = "• " + t
        r1.font.bold = True
        r1.font.size = Pt(12)
        r1.font.color.rgb = COLOR_BLUE_ACCENT
        r2 = p.add_run()
        r2.text = d
        r2.font.size = Pt(11.5)
        r2.font.color.rgb = COLOR_TEXT_MUTED

    # =========================================================================
    # SLIDE 5: QUẢN TRỊ NGƯỜI DÙNG & PHÂN QUYỀN ROLE (RBAC)
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_layout)
    add_header(slide5, "4. QUẢN TRỊ NGƯỜI DÙNG & PHÂN QUYỀN THEO ROLE (RBAC)")

    roles = [
        ("SEPHORA_ADMIN_ROLE", "Quản trị viên Hệ thống", COLOR_NAVY_DARK,
         ["• Quyền hệ thống: CREATE SESSION, TABLE, VIEW, PROCEDURE",
          "• Gán quyền WITH ADMIN OPTION",
          "• Toàn quyền DDL & DML trên toàn bộ Schema",
          "• Dành riêng cho DBA quản trị"]),
        ("SEPHORA_APP_ROLE", "Tài khoản Kết nối Ứng dụng", COLOR_BLUE_ACCENT,
         ["• Quyền hệ thống: CREATE SESSION",
          "• Quyền đối tượng: SELECT, INSERT, UPDATE trên bảng đơn hàng & sản phẩm",
          "• Quyền thực thi: GRANT EXECUTE ON PKG_ORDER_PROCESSING",
          "• Tuyệt đối KHÔNG có quyền DROP TABLE"]),
        ("SEPHORA_READONLY_ROLE", "Báo cáo Kiểm toán / Kế toán", COLOR_EMERALD,
         ["• Quyền hệ thống: CREATE SESSION",
          "• Quyền đối tượng: SELECT ONLY trên sep_orders, sep_products, vw_dashboard_metrics",
          "• Không có bất kỳ quyền thao tác ghi (DML/DDL)",
          "• Phục vụ trích xuất báo cáo an toàn"])
    ]

    for idx, (r_name, r_desc, color, perms) in enumerate(roles):
        left_pos = Inches(0.8 + idx * 4.0)
        card = add_card(slide5, left_pos, Inches(1.5), Inches(3.7), Inches(5.3), r_name)
        tf = card.text_frame
        p_sub = tf.add_paragraph()
        p_sub.text = r_desc
        p_sub.font.size = Pt(11)
        p_sub.font.italic = True
        p_sub.font.color.rgb = color
        p_sub.space_before = Pt(2)

        for perm in perms:
            p_p = tf.add_paragraph()
            p_p.text = perm
            p_p.font.size = Pt(11.5)
            p_p.font.color.rgb = COLOR_TEXT_DARK
            p_p.space_before = Pt(8)

    # =========================================================================
    # SLIDE 6: SƠ ĐỒ QUAN HỆ THỰC THỂ (ERD) & CSDL
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_layout)
    add_header(slide6, "5. SƠ ĐỒ QUAN HỆ THỰC THỂ (ERD) PHÂN HỆ GIAO DỊCH")

    card6_left = add_card(slide6, Inches(0.8), Inches(1.5), Inches(5.0), Inches(5.3), "PHÂN HỆ GIAO DỊCH CỐT LÕI")
    tf6 = card6_left.text_frame
    tables_desc = [
        ("SEP_USERS:", " Khách hàng, mật khẩu mã hóa BCrypt, điểm tích lũy (points_balance), hạng hội viên (INSIDER, VIB, ROUGE)."),
        ("SEP_PRODUCTS:", " Danh mục mỹ phẩm, SKU, giá bán (price_value), số lượng tồn kho (stock_qty) và trạng thái active."),
        ("SEP_CART_ITEMS:", " Giỏ hàng tạm thời của khách hàng trước khi tiến hành thanh toán."),
        ("SEP_ORDERS:", " Đơn hàng tổng hợp gồm mã đơn (order_code), tổng tiền, chiết khấu, điểm thưởng và trạng thái (PENDING, COMPLETED, CANCELLED)."),
        ("SEP_ORDER_ITEMS:", " Chi tiết sản phẩm trong đơn, khóa ngoại cascade tới SEP_ORDERS và SEP_PRODUCTS."),
        ("SEP_AUDIT_LOGS:", " Nhật ký kiểm toán bảo mật lưu vết các biến động giá và khởi tạo đơn.")
    ]
    for tbl, d in tables_desc:
        p = tf6.add_paragraph()
        p.space_before = Pt(6)
        r1 = p.add_run()
        r1.text = "• " + tbl
        r1.font.bold = True
        r1.font.size = Pt(11.5)
        r1.font.color.rgb = COLOR_BLUE_ACCENT
        r2 = p.add_run()
        r2.text = d
        r2.font.size = Pt(11)
        r2.font.color.rgb = COLOR_TEXT_MUTED

    # Chèn ảnh fig2 bên phải
    img2_path = "docx/images/fig2_erd_database_schema.png"
    if os.path.exists(img2_path):
        slide6.shapes.add_picture(img2_path, Inches(6.1), Inches(1.5), width=Inches(6.4))

    # =========================================================================
    # SLIDE 7: KIỂM SOÁT TƯƠNG TRANH & KHÓA BI QUAN (PESSIMISTIC LOCKING)
    # =========================================================================
    slide7 = prs.slides.add_slide(blank_layout)
    add_header(slide7, "6. KIỂM SOÁT TƯƠNG TRANH VỚI KHÓA BI QUAN (PESSIMISTIC LOCKING)")

    card7_desc = add_card(slide7, Inches(0.8), Inches(1.5), Inches(5.2), Inches(5.3), "CƠ CHẾ SELECT ... FOR UPDATE")
    tf7 = card7_desc.text_frame
    pts7 = [
        ("Vấn đề Race Condition:", " Khách A và B cùng đọc thấy tồn kho còn 1 sản phẩm. Cả hai cùng tiến hành bấm mua. Nếu không kiểm soát tương tranh, tồn kho bị trừ 2 lần -> Bán âm kho (-1)."),
        ("Giải pháp Khóa độc quyền cấp dòng:", " Trong SP_PLACE_ORDER, câu lệnh `SELECT stock_qty FROM sep_products WHERE id = ... FOR UPDATE` lập tức áp đặt Exclusive Row Lock lên dòng sản phẩm."),
        ("Xếp hàng chờ (Queue):", " Phiên B bắt buộc phải đợi cho đến khi phiên A hoàn tất COMMIT (trừ kho thành công) hoặc ROLLBACK."),
        ("Bảo đảm toàn vẹn ACID:", " Khi tới lượt phiên B đọc, tồn kho đã bằng 0. Hệ thống lập tức bắn biệt lệ ORA-20001 (Sản phẩm không đủ tồn kho).")
    ]
    for t, d in pts7:
        p = tf7.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = "• " + t
        r1.font.bold = True
        r1.font.size = Pt(12)
        r1.font.color.rgb = COLOR_AMBER
        r2 = p.add_run()
        r2.text = d
        r2.font.size = Pt(11.5)
        r2.font.color.rgb = COLOR_TEXT_MUTED

    # Chèn ảnh fig3 bên phải
    img3_path = "docx/images/fig3_pessimistic_locking_flowchart.png"
    if os.path.exists(img3_path):
        slide7.shapes.add_picture(img3_path, Inches(6.3), Inches(1.5), width=Inches(6.2))

    # =========================================================================
    # SLIDE 8: PACKAGE PL/SQL XỬ LÝ ĐƠN HÀNG (PKG_ORDER_PROCESSING)
    # =========================================================================
    slide8 = prs.slides.add_slide(blank_layout)
    add_header(slide8, "7. PACKAGE PL/SQL XỬ LÝ ĐƠN HÀNG (PKG_ORDER_PROCESSING)")

    card8_left = add_card(slide8, Inches(0.8), Inches(1.5), Inches(5.7), Inches(5.3), "CẤU TRÚC PACKAGE SPEC & BODY")
    tf8_l = card8_left.text_frame
    pkg_pts = [
        ("Đóng gói logic nghiệp vụ (Encapsulation):", " Tách biệt Specification (giao diện công khai) và Body (cài đặt chi tiết ẩn kín)."),
        ("Hàm FN_CALCULATE_DISCOUNT:", " Tính toán số tiền chiết khấu dựa trên mã khuyến mãi (ví dụ: ALLONSALE -15%) và hạng thành viên (VIB, ROUGE)."),
        ("Thủ tục SP_PLACE_ORDER:", " Thực thi một giao dịch nguyên tử trọn vẹn (Atomic Unit of Work):\n  1. Khóa dòng kiểm tra tồn kho (FOR UPDATE)\n  2. Sinh mã đơn hàng chuẩn SEP-YYYYMMDD-XXXXXX\n  3. Chèn vào sep_orders và sep_order_items\n  4. Trừ tồn kho và xóa giỏ hàng\n  5. Cộng điểm tích lũy theo tỷ lệ 1.000 ₫ = 1 điểm")
    ]
    for t, d in pkg_pts:
        p = tf8_l.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = "• " + t
        r1.font.bold = True
        r1.font.size = Pt(12)
        r1.font.color.rgb = COLOR_BLUE_ACCENT
        r2 = p.add_run()
        r2.text = d
        r2.font.size = Pt(11.5)
        r2.font.color.rgb = COLOR_TEXT_DARK

    card8_right = add_card(slide8, Inches(6.8), Inches(1.5), Inches(5.7), Inches(5.3), "LỢI ÍCH HIỆU NĂNG SO VỚI CODE TẠI BACKEND")
    tf8_r = card8_right.text_frame
    ben_pts = [
        ("Giảm tải Network Round-trips:", " Thay vì ứng dụng Java gửi 5 câu lệnh SQL qua mạng (Select kho -> Check -> Insert Order -> Insert Items -> Update Kho), ứng dụng chỉ cần gửi 1 lệnh gọi Procedure duy nhất."),
        ("Biên dịch sẵn & Tối ưu thực thi:", " Code PL/SQL được biên dịch sang mã máy P-Code và nạp sẵn trong Shared Pool của SGA, loại bỏ thời gian biên dịch lại ở các lần gọi sau."),
        ("Bảo mật dữ liệu tuyệt đối:", " Tài khoản ứng dụng không cần quyền INSERT/UPDATE trực tiếp trên bảng sản phẩm mà chỉ cần quyền EXECUTE trên Package.")
    ]
    for t, d in ben_pts:
        p = tf8_r.add_paragraph()
        p.space_before = Pt(10)
        r1 = p.add_run()
        r1.text = "✓ " + t
        r1.font.bold = True
        r1.font.size = Pt(12.5)
        r1.font.color.rgb = COLOR_EMERALD
        r2 = p.add_run()
        r2.text = d
        r2.font.size = Pt(12)
        r2.font.color.rgb = COLOR_TEXT_MUTED

    # =========================================================================
    # SLIDE 9: HỆ THỐNG DATABASE TRIGGERS TỰ ĐỘNG
    # =========================================================================
    slide9 = prs.slides.add_slide(blank_layout)
    add_header(slide9, "8. HỆ THỐNG DATABASE TRIGGERS TỰ ĐỘNG")

    trigs = [
        ("TRG_RESTORE_STOCK_ON_CANCEL", "Tự động Hoàn Tồn Kho khi Hủy Đơn", COLOR_BLUE_ACCENT,
         ["• Sự kiện: AFTER UPDATE OF order_status ON sep_orders FOR EACH ROW",
          "• Điều kiện lọc: WHEN (NEW.order_status = 'CANCELLED' AND OLD.order_status <> 'CANCELLED')",
          "• Thao tác: Lặp qua toàn bộ mặt hàng trong sep_order_items và tự động cộng hoàn trả số lượng tồn vào sep_products.",
          "• Tránh tình trạng tồn kho ảo khi khách hủy đơn."]),
        ("TRG_AUDIT_PRODUCT_PRICE", "Kiểm Toán Biến Động Giá Bán", COLOR_AMBER,
         ["• Sự kiện: AFTER UPDATE OF price_value ON sep_products FOR EACH ROW",
          "• Thao tác: Tự động chụp lại giá bán cũ (:OLD.price_value) và giá bán mới (:NEW.price_value).",
          "• Ghi tức thời vào bảng kiểm toán sep_audit_logs kèm ID nhân sự và thời gian thực.",
          "• Đảm bảo tính minh bạch và truy vết gian lận giá."]),
        ("TRG_UPDATE_LOYALTY_TIER", "Tự Động Thăng Hạng Hội Viên", COLOR_EMERALD,
         ["• Sự kiện: BEFORE UPDATE OF points_balance ON sep_users FOR EACH ROW",
          "• Ngưỡng điểm thăng hạng:\n  - Từ 1.000 điểm: Thăng hạng ROUGE (VIP cao cấp)\n  - Từ 350 điểm: Thăng hạng VIB\n  - Dưới 350 điểm: INSIDER",
          "• Tự động kích hoạt ngay khi hoàn thành giao dịch mà ứng dụng không cần can thiệp."])
    ]

    for idx, (t_name, t_sub, color, t_bullets) in enumerate(trigs):
        left_pos = Inches(0.8 + idx * 4.0)
        card = add_card(slide9, left_pos, Inches(1.5), Inches(3.7), Inches(5.3), t_name)
        tf = card.text_frame
        p_sub = tf.add_paragraph()
        p_sub.text = t_sub
        p_sub.font.size = Pt(11)
        p_sub.font.bold = True
        p_sub.font.color.rgb = color
        p_sub.space_before = Pt(2)

        for b in t_bullets:
            p_b = tf.add_paragraph()
            p_b.text = b
            p_b.font.size = Pt(11.5)
            p_b.font.color.rgb = COLOR_TEXT_DARK
            p_b.space_before = Pt(8)

    # =========================================================================
    # SLIDE 10: TỐI ƯU HÓA TRUY VẤN & KHUNG NHÌN BÁO CÁO (VIEWS & INDEX)
    # =========================================================================
    slide10 = prs.slides.add_slide(blank_layout)
    add_header(slide10, "9. TỐI ƯU HÓA TRUY VẤN & KHUNG NHÌN BÁO CÁO")

    card10_info = add_card(slide10, Inches(0.8), Inches(1.5), Inches(5.2), Inches(5.3), "VIEW BÁO CÁO & FUNCTION INDEX")
    tf10 = card10_info.text_frame
    pts10 = [
        ("View VW_DASHBOARD_METRICS:", " Tính toán doanh thu thực tế, số lượng đơn, đơn chờ xử lý, số sản phẩm sắp hết kho và khách hàng bằng toán tử tổng hợp trực tiếp tại nhân Oracle."),
        ("Loại bỏ quá tải Java Stream:", " Ứng dụng Backend không còn phải load hàng nghìn bản ghi lên RAM để đếm, giảm tải 95% CPU và bộ nhớ của Spring Boot."),
        ("Function-based Index:", " Tạo `CREATE INDEX idx_products_upper_name ON sep_products(UPPER(name));` phục vụ tìm kiếm tên sản phẩm không phân biệt hoa thường."),
        ("Kết quả phân tích EXPLAIN PLAN:", " Cây thực thi chuyển hoàn toàn từ Full Table Scan (Cost 28) sang Index Range Scan (Cost 1), thời gian truy vấn gần như tức thời.")
    ]
    for t, d in pts10:
        p = tf10.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = "• " + t
        r1.font.bold = True
        r1.font.size = Pt(12)
        r1.font.color.rgb = COLOR_BLUE_ACCENT
        r2 = p.add_run()
        r2.text = d
        r2.font.size = Pt(11.5)
        r2.font.color.rgb = COLOR_TEXT_MUTED

    # Chèn ảnh fig4 bên phải
    img4_path = "docx/images/fig4_explain_plan_comparison.png"
    if os.path.exists(img4_path):
        slide10.shapes.add_picture(img4_path, Inches(6.3), Inches(1.5), width=Inches(6.2))

    # =========================================================================
    # SLIDE 11: DEMO ỨNG DỤNG THỰC TẾ (STOREFRONT & ADMIN DASHBOARD)
    # =========================================================================
    slide11 = prs.slides.add_slide(blank_layout)
    add_header(slide11, "10. ỨNG DỤNG THỰC TẾ: STOREFRONT & ADMIN DASHBOARD")

    # Nửa trái: Giao diện chi tiết đơn hàng
    card11_left = add_card(slide11, Inches(0.8), Inches(1.5), Inches(5.7), Inches(5.3), "CHI TIẾT ĐƠN HÀNG & MÃ KHUYẾN MÃI")
    tf11_l = card11_left.text_frame
    p_l = tf11_l.add_paragraph()
    p_l.space_before = Pt(4)
    p_l.text = "• Hiển thị mã giảm giá ALLONSALE (-15%)\n• Miễn phí vận chuyển toàn quốc\n• Tích lũy điểm thưởng Beauty Insider: +166 điểm (tương ứng 166.250 ₫)"
    p_l.font.size = Pt(11)
    p_l.font.color.rgb = COLOR_TEXT_DARK

    img5_path = "docx/images/fig5_storefront_order_breakdown.png"
    if os.path.exists(img5_path):
        slide11.shapes.add_picture(img5_path, Inches(1.0), Inches(2.7), width=Inches(5.3))

    # Nửa phải: Bảng điều khiển quản trị
    card11_right = add_card(slide11, Inches(6.8), Inches(1.5), Inches(5.7), Inches(5.3), "ADMIN DASHBOARD TỪ VIEW ORACLE")
    tf11_r = card11_right.text_frame
    p_r = tf11_r.add_paragraph()
    p_r.space_before = Pt(4)
    p_r.text = "• Dữ liệu thời gian thực truy vấn trực tiếp từ VW_DASHBOARD_METRICS\n• Thống kê doanh thu, đơn hàng, khách hàng, hàng sắp hết kho\n• Hiển thị nhật ký kiểm toán hệ thống từ SEP_AUDIT_LOGS"
    p_r.font.size = Pt(11)
    p_r.font.color.rgb = COLOR_TEXT_DARK

    img6_path = "docx/images/fig6_admin_dashboard_metrics.png"
    if os.path.exists(img6_path):
        slide11.shapes.add_picture(img6_path, Inches(7.0), Inches(2.7), width=Inches(5.3))

    # =========================================================================
    # SLIDE 12: KẾT LUẬN & HƯỚNG PHÁT TRIỂN
    # =========================================================================
    slide12 = prs.slides.add_slide(blank_layout)
    add_header(slide12, "11. KẾT LUẬN & HƯỚNG PHÁT TRIỂN ĐỀ TÀI")

    card12_left = add_card(slide12, Inches(0.8), Inches(1.5), Inches(5.7), Inches(5.3), "KẾT QUẢ ĐẠT ĐƯỢC")
    tf12_l = card12_left.text_frame
    res_pts = [
        ("Đáp ứng 100% Tiêu chí Chấm thi BTL:", " Hiện thực hóa trọn vẹn kiến trúc Oracle Multitenant (CDB/PDB), phân vùng Tablespace, Quota, phân quyền 3 Role RBAC."),
        ("Giải quyết triệt để lỗi nghiệp vụ thực tế:", " Cơ chế khóa bi quan SELECT FOR UPDATE bảo đảm không bao giờ bán âm kho."),
        ("Tự động hóa hoàn toàn trên DB:", " 3 Triggers tự động hoàn kho, ghi log kiểm toán và thăng hạng thành viên chạy ngầm tin cậy."),
        ("Tối ưu hóa hiệu năng rõ rệt:", " Chứng minh bằng EXPLAIN PLAN giảm Cost truy vấn từ 28 xuống 1."),
        ("Demo trực quan Full-stack:", " Kết nối xuyên suốt Database Oracle 23ai -> Spring Boot REST API -> React SPA.")
    ]
    for t, d in res_pts:
        p = tf12_l.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = "✓ " + t
        r1.font.bold = True
        r1.font.size = Pt(12)
        r1.font.color.rgb = COLOR_EMERALD
        r2 = p.add_run()
        r2.text = d
        r2.font.size = Pt(11.5)
        r2.font.color.rgb = COLOR_TEXT_MUTED

    card12_right = add_card(slide12, Inches(6.8), Inches(1.5), Inches(5.7), Inches(5.3), "HƯỚNG PHÁT TRIỂN & LỜI CẢM ƠN")
    tf12_r = card12_right.text_frame
    dev_pts = [
        ("Khai phá Table Partitioning theo tháng:", " Phân vùng bảng SEP_ORDERS theo khoảng thời gian đặt hàng (Range Partitioning by Month) để tối ưu hóa truy vấn lịch sử đơn hàng lớn."),
        ("Tích hợp Oracle 23ai AI Vector Search:", " Lưu trữ vector nhúng đặc trưng của sản phẩm mỹ phẩm để hỗ trợ khách hàng tìm kiếm bằng hình ảnh và ngôn ngữ tự nhiên thông minh.")
    ]
    for t, d in dev_pts:
        p = tf12_r.add_paragraph()
        p.space_before = Pt(8)
        r1 = p.add_run()
        r1.text = "➜ " + t
        r1.font.bold = True
        r1.font.size = Pt(12)
        r1.font.color.rgb = COLOR_AMBER
        r2 = p.add_run()
        r2.text = d
        r2.font.size = Pt(11.5)
        r2.font.color.rgb = COLOR_TEXT_MUTED

    # Box cảm ơn
    thanks_box = slide12.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(7.1), Inches(4.3), Inches(5.1), Inches(2.2))
    thanks_box.fill.solid()
    thanks_box.fill.fore_color.rgb = COLOR_NAVY_DARK
    thanks_box.line.color.rgb = COLOR_BLUE_LIGHT
    thanks_box.line.width = Pt(1.5)
    tf_th = thanks_box.text_frame
    tf_th.word_wrap = True
    tf_th.margin_top = Inches(0.25)
    p_th1 = tf_th.paragraphs[0]
    p_th1.text = "XIN TRÂN TRỌNG CẢM ƠN THẦY VÀ HỘI ĐỒNG!"
    p_th1.font.size = Pt(14)
    p_th1.font.bold = True
    p_th1.font.color.rgb = COLOR_AMBER
    p_th1.alignment = PP_ALIGN.CENTER

    p_th2 = tf_th.add_paragraph()
    p_th2.text = "Kính mong nhận được sự góp ý và đánh giá quý báu của ThS. Nguyễn Việt Hưng để đề tài được hoàn thiện hơn nữa."
    p_th2.font.size = Pt(11.5)
    p_th2.font.color.rgb = RGBColor(226, 232, 240)
    p_th2.alignment = PP_ALIGN.CENTER
    p_th2.space_before = Pt(8)

    p_qa = tf_th.add_paragraph()
    p_qa.text = "Q & A - HỎI ĐÁP & VẤN ĐÁP BTL"
    p_qa.font.size = Pt(13)
    p_qa.font.bold = True
    p_qa.font.color.rgb = COLOR_EMERALD
    p_qa.alignment = PP_ALIGN.CENTER
    p_qa.space_before = Pt(8)

    output_pptx = "docx/Slide_BTL_Oracle_Nhom3_UTC.pptx"
    prs.save(output_pptx)
    print(f"Successfully generated {output_pptx}")

if __name__ == "__main__":
    create_presentation()
