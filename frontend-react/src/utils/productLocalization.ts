import { Product } from '../data';

export interface ProductLocalization {
  name: string;
  description: string;
  variation?: string;
  badge?: string;
}

export const PRODUCT_LOCALIZATION: Record<string, ProductLocalization> = {
  // 1
  '2333607': {
    name: 'Serum Nền Cấp Ẩm Chống Nắng ILIA Super Serum Skin Tint SPF 40',
    description: 'Serum nền thế hệ mới kết hợp dưỡng ẩm sâu và chống nắng khoáng chất SPF 40, mang lại lớp nền mỏng nhẹ, căng bóng tự nhiên.',
    variation: 'Tone ST11 - Da tự nhiên',
    badge: 'Mỹ phẩm sạch',
  },
  // 2
  '2169423': {
    name: 'Kem Lót Khóa Nền Cấp Ẩm Milk Makeup Hydro Grip Primer',
    description: 'Kem lót dạng gel chứa Hyaluronic Acid và Niacinamide giúp cố định lớp trang điểm suốt 12 giờ, cấp ẩm và thu nhỏ lỗ chân lông.',
    variation: 'Chai 45ml',
    badge: 'Mỹ phẩm sạch',
  },
  // 3
  '2362085': {
    name: 'Má Hồng Dạng Lỏng Rare Beauty Soft Pinch Liquid Blush',
    description: 'Phấn má dạng kem lỏng siêu nhẹ, độ lên màu chuẩn xác chỉ với một chấm nhỏ, bền màu và rạng rỡ cả ngày dài.',
    variation: 'Màu Happy - Hồng đào căng mọng',
    badge: 'Bán chạy',
  },
  // 4
  '2319820': {
    name: 'Dầu Gội Làm Sạch Sâu Thải Độc Da Đầu Ouai Detox Shampoo',
    description: 'Dầu gội chiết xuất giấm táo và keratin giúp loại bỏ cặn bẩn, dầu thừa và hóa chất tích tụ, cho mái tóc bồng bềnh chắc khỏe.',
    variation: 'Chai 300ml',
    badge: 'Yêu thích 2026',
  },
  // 5
  '2547248': {
    name: 'Mặt Nạ Phục Hồi Tóc Hư Tổn K18 Leave-In Molecular Repair',
    description: 'Liệu trình phục hồi tóc sinh học trong 4 phút, hàn gắn chuỗi keratin bị đứt gãy do tẩy nhuộm và tạo nhiệt.',
    variation: 'Chai 50ml',
    badge: 'Mỹ phẩm sạch',
  },
  // 6
  '2210607': {
    name: 'Tinh Chất Tẩy Tế Bào Chết Hóa Học The Ordinary AHA 30% + BHA 2%',
    description: 'Serum peel da tái tạo bề mặt da, làm mờ thâm mụn, thông thoáng lỗ chân lông và dưỡng sáng đều màu da.',
    variation: 'Lọ 30ml',
    badge: 'Bán chạy',
  },
  // 7
  '1802412': {
    name: 'Kem Dưỡng Thể Săn Chắc Da Sol de Janeiro Brazilian Bum Bum',
    description: 'Kem dưỡng ẩm toàn thân giàu Guaraná chứa caffeine giúp làm săn chắc da, hương thơm hồ trăn và caramel muối ngọt ngào.',
    variation: 'Hũ 240ml',
    badge: 'Bán chạy',
  },
  // 8
  '2315158': {
    name: 'Kem Chống Nắng Tạo Hiệu Ứng Căng Bóng Supergoop! Glowscreen SPF 40',
    description: 'Kem chống nắng kiêm kem lót bắt sáng với Niacinamide và HA, bảo vệ da toàn diện trước tia UVA/UVB và ánh sáng xanh.',
    variation: 'Tuýp 50ml - Tone Sunrise',
    badge: 'Chống nắng hot',
  },
  // 9
  '2233849': {
    name: 'Kem Dưỡng Ẩm Phục Hồi Hàng Rào Bảo Vệ Da Drunk Elephant Lala Retro',
    description: 'Kem dưỡng phục hồi giàu 6 loại dầu thực vật quý và phức hợp Ceramide, cấp ẩm sâu và làm dịu làn da mệt mỏi.',
    variation: 'Hũ 50ml',
    badge: 'Mỹ phẩm sạch',
  },
  // 10
  '2215945': {
    name: 'Kem Dưỡng Tái Tạo Hàng Rào Lipid Skinfix Triple Lipid-Peptide',
    description: 'Công thức độc quyền phục hồi lipid và peptide tự nhiên của da, giảm khô căng và củng cố độ đàn hồi rõ rệt.',
    variation: 'Hũ 50ml',
    badge: 'Mỹ phẩm sạch',
  },
  // 11
  '2663763': {
    name: 'Kem Dưỡng Ẩm Chuyên Sâu Kiehl\'s Ultra Facial Cream 24h',
    description: 'Huyền thoại dưỡng ẩm 24 giờ với đạm glycoprotein từ băng tuyết biển và dầu squalane tinh khiết, thẩm thấu tức thì.',
    variation: 'Hũ 50ml',
    badge: 'Bán chạy',
  },
  // 12
  '1930759': {
    name: 'Xịt Thơm Toàn Thân & Tóc Sol de Janeiro Cheirosa 62 Mist',
    description: 'Mùi hương biểu tượng đậm chất bãi biển Brazil với nốt hương hạt dẻ cười, vani và caramel mặn cuốn hút.',
    variation: 'Chai 90ml',
    badge: 'Bán chạy',
  },
  // 13
  '2644532': {
    name: 'Nước Hoa Nữ Dior Miss Dior Blooming Bouquet Eau de Toilette',
    description: 'Hương hoa cỏ mùa xuân thanh khiết kết hợp giữa mẫu đơn rực rỡ, hoa hồng Damascus và xạ hương trắng dịu dàng.',
    variation: 'Chai 50ml',
    badge: 'Cao cấp',
  },
  // 14
  '1237379': {
    name: 'Nước Hoa Nữ Chanel Chance Eau Tendre EDT',
    description: 'Hương thơm hoa quả ngọt ngào, mềm mại với bưởi thanh mát, mộc qua và hoa nhài trắng tinh tế quý phái.',
    variation: 'Chai 50ml',
    badge: 'Cao cấp',
  },
  // 15
  '2649770': {
    name: 'Nước Hoa Xạ Hương Cá Nhân Glossier You EDP',
    description: 'Nước hoa xạ hương biến đổi theo thân nhiệt từng người, mang lại cảm giác ấm áp, thân thuộc như chính mùi cơ thể bạn.',
    variation: 'Chai 50ml',
    badge: 'Xu hướng',
  },
  // 16
  '2101293': {
    name: 'Nước Hoa Cao Cấp Tom Ford Lost Cherry EDP',
    description: 'Sự hòa quyện quyến rũ giữa anh đào đen ngâm rượu, hạnh nhân đắng và hoa hồng Thổ Nhĩ Kỳ sang trọng, bí ẩn.',
    variation: 'Chai 50ml',
    badge: 'Bản giới hạn',
  },
  // 17
  '2249746': {
    name: 'Nước Hoa Nữ YSL Libre Eau de Parfum',
    description: 'Tuyên ngôn tự do với hoa cam Morocco nồng nàn và oải hương Pháp quyến rũ, lưu hương sang trọng đến 12 giờ.',
    variation: 'Chai 50ml',
    badge: 'Bán chạy',
  },
  // 18
  '2437267': {
    name: 'Xịt Khóa Nếp & Chống Xơ Rối Tóc Color Wow Dream Coat',
    description: 'Công nghệ phủ bóng chống ẩm siêu việt, biến mái tóc xơ rối thành mượt mà, bóng gương như vừa bước ra từ salon.',
    variation: 'Chai 200ml',
    badge: 'Bán chạy',
  },
  // 19
  '2597342': {
    name: 'Kem Nền Dưỡng Da Haus Labs Triclone Skin Tech Foundation',
    description: 'Kem nền độ che phủ trung bình chứa cúc núi Arnica lên men, làm dịu mẩn đỏ và bảo vệ da trước căng thẳng môi trường.',
    variation: 'Tone 190 Light Warm',
    badge: 'Mỹ phẩm sạch',
  },
  // 20
  '2553188': {
    name: 'Nước Hoa Nữ Dior J\'adore Eau de Parfum',
    description: 'Kiệt tác hương hoa phương Đông kinh điển tôn vinh vẻ đẹp nữ quyền với hoa ngọc lan tây, hoa hồng và nhài Sambac.',
    variation: 'Chai 50ml',
    badge: 'Cao cấp',
  },
  // 21
  '2587319': {
    name: 'Phấn Má Hồng Gucci Luminous Matte Powder Blush',
    description: 'Hạt phấn mịn mượt như lụa với chiết xuất bơ hạt mỡ và dầu hoa hồng, mang lại gò má ửng hồng tự nhiên, lâu trôi.',
    variation: 'Màu 01 Silky Rose',
    badge: 'Cao cấp',
  },
  // 22
  '2679561': {
    name: 'Má Hồng Dạng Kem Makeup By Mario Soft Pop Plumping',
    description: 'Má hồng dạng kem mỏng nhẹ bổ sung axit hyaluronic tạo hiệu ứng căng mọng và đôi má ửng sáng rạng ngời.',
    variation: 'Màu Barely Blushing',
    badge: 'Xu hướng',
  },
  // 23
  '2670990': {
    name: 'Thỏi Má Hồng Kem Tiện Lợi Westman Atelier Baby Cheeks Stick',
    description: 'Thỏi đa năng dùng cho cả môi và má với dầu jojoba hữu cơ, dễ tán đều chỉ bằng đầu ngón tay.',
    variation: 'Màu Petal',
    badge: 'Mỹ phẩm sạch',
  },
  // 24
  '2702173': {
    name: 'Gel Chuốt Lông Mày Tạo Sợi Tự Nhiên Glossier Boy Brow',
    description: 'Sáp chuốt định hình lông mày lấy cảm hứng từ pomade truyền thống, giúp chân mày vào nếp tự nhiên, dày dặn.',
    variation: 'Màu Nâu Tự Nhiên (Brown)',
    badge: 'Bán chạy',
  },
  // 25
  '2637999': {
    name: 'Gel Định Hình Chân Mày Trong Suốt ILIA In Frame Clear',
    description: 'Gel giữ nếp chân mày trong suốt suốt 8 giờ không gây bết dính hay vón cục, nuôi dưỡng lông mày chắc khỏe.',
    variation: 'Trong suốt (Clear)',
    badge: 'Mỹ phẩm sạch',
  },
  // 26
  '2654770': {
    name: 'Dầu Dưỡng Phục Hồi Cấu Trúc Tóc K18 Molecular Repair Oil',
    description: 'Dầu dưỡng không trọng lượng giúp hàn gắn hư tổn ở cấp độ phân tử, giảm xơ rối và bảo vệ nhiệt đến 232°C.',
    variation: 'Chai 30ml',
    badge: 'Mỹ phẩm sạch',
  },
  // 27
  '2673556': {
    name: 'Serum Dưỡng Tóc Ban Đêm Kérastase Nutritive 8H Magic Night',
    description: 'Dưỡng chất ban đêm chuyên sâu thẩm thấu suốt 8 giờ ngủ, phục hồi mái tóc khô xơ mà không cần gội lại vào buổi sáng.',
    variation: 'Chai 90ml',
    badge: 'Cao cấp',
  },
  // 28
  '2640357': {
    name: 'Kem Dưỡng Thể Cấp Ẩm Dưa Hấu Glow Recipe Pink Dream',
    description: 'Kem dưỡng ẩm cơ thể mịn màng chứa AHA từ hoa dâm bụt và chiết xuất dưa hấu, làm mịn da sần sùi và dưỡng sáng mịn.',
    variation: 'Tuýp 200ml',
    badge: 'Mỹ phẩm sạch',
  },
  // 29
  '2674133': {
    name: 'Kem Chống Nắng Khoáng Chất Thuần Chay Kosas DreamBeam SPF 40',
    description: 'Chống nắng vật lý không chứa silicone kết hợp Ceramide và Peptide, làm dịu da và tạo lớp nền trang điểm hoàn hảo.',
    variation: 'Tuýp 50ml',
    badge: 'Chống nắng hot',
  },
  // 30
  '2681799': {
    name: 'Son Thỏi Dưỡng Ẩm Căng Bóng Kosas Wet Stick Sheer Lipstick',
    description: 'Son dưỡng có màu mềm môi chứa squalane và bơ xoài, mang lại sắc màu trong trẻo và làn môi căng mọng quyến rũ.',
    variation: 'Màu 100 Degrees',
    badge: 'Mỹ phẩm sạch',
  },
  // 31
  '2678472': {
    name: 'Son Dưỡng Làm Đầy Rãnh Môi Lawless Forget the Filler Balm',
    description: 'Công thức Maxi-Lip tăng sinh collagen giúp môi đầy đặn tức thì và làm mờ các nếp nhăn viền môi rõ rệt.',
    variation: 'Màu Rosy Outlook',
    badge: 'Mới về',
  },
  // 32
  '2685527': {
    name: 'Sữa Rửa Mặt Tạo Bọt Dịu Nhẹ & Tẩy Trang ILIA The Cleanse',
    description: 'Sữa rửa mặt dạng bọt dịu nhẹ cuốn trôi mọi lớp trang điểm và bụi bẩn mà không làm mất đi độ ẩm tự nhiên của da.',
    variation: 'Chai 150ml',
    badge: 'Mỹ phẩm sạch',
  },
  // 33
  '2704005': {
    name: 'Nước Hoa Nữ Dolce&Gabbana Dolce Violet EDT Travel Spray',
    description: 'Sự kết hợp tươi vui giữa quả lý chua đen, hoa violet quyến rũ và hương vani Madagascar ấm áp dịu dàng.',
    variation: 'Ống xịt du lịch 10ml',
    badge: 'Bản du lịch',
  },
  // 34
  '2705333': {
    name: 'Nước Hoa Unisex Kayali The Wedding Velvet Santal 35 EDP',
    description: 'Mùi hương gỗ đàn hương nhung ấm áp hòa quyện cùng xạ hương trắng và tuyết tùng, tôn vinh khoảnh khắc tình yêu vĩnh cửu.',
    variation: 'Chai 50ml',
    badge: 'Độc quyền',
  },
  // 35
  '2590503': {
    name: 'Nước Hoa Maison Margiela Replica On A Date Eau de Toilette',
    description: 'Tái hiện buổi hẹn hò lãng mạn giữa vườn nho hoàng hôn vùng Provence với hương hoa hồng nồng nàn và quả nho chín mọng.',
    variation: 'Chai 30ml',
    badge: 'Xu hướng',
  },
  // 36
  '2687689': {
    name: 'Kem Ủ Tóc Phục Hồi Độ Bóng Dae Stargloss Hair Gloss',
    description: 'Liệu trình ủ tóc làm bóng tức thì với dầu hạt xương rồng và hoa dâm bụt, nuôi dưỡng mái tóc suôn mượt lấp lánh.',
    variation: 'Hũ 180ml',
    badge: 'Mỹ phẩm sạch',
  },
  // 37
  '1966258': {
    name: 'Mặt Nạ Ngủ Dưỡng Môi Laneige Lip Sleeping Mask Berry',
    description: 'Mặt nạ ngủ môi chiết xuất quả mọng và Vitamin C giúp loại bỏ tế bào chết, cho đôi môi căng mọng mềm mại sau giấc ngủ.',
    variation: 'Hũ 20g - Vị Berry',
    badge: 'Bán chạy',
  },
  // 38
  '2407336': {
    name: 'Phấn Phủ Bột Nén Charlotte Tilbury Airbrush Flawless Finish',
    description: 'Phấn phủ nano siêu mịn giúp kiềm dầu, làm mờ lỗ chân lông và giữ lớp trang điểm hoàn hảo như phủ filter.',
    variation: 'Hộp mini 3.4g - Tông Fair',
    badge: 'Bán chạy',
  },
  // 39
  '2640159': {
    name: 'Son Bóng Dưỡng Môi Dạng Dầu Rare Beauty Soft Pinch Lip Oil',
    description: 'Son dầu dưỡng môi đổi màu biến hóa từ dạng thạch mềm sang lớp tint bóng nhẹ, không dính rít và bền màu suốt ngày.',
    variation: 'Màu Delight - Nâu hồng đất',
    badge: 'Bán chạy',
  },
  // 40
  '2172310': {
    name: 'Kem Che Khuyết Điểm NARS Radiant Creamy Concealer',
    description: 'Huyền thoại che khuyết điểm đa năng với độ che phủ cao, làm mờ quầng thâm và đốm mụn mà không bị đọng rãnh.',
    variation: 'Tông Custard - Da sáng vừa',
    badge: 'Bán chạy',
  },
  // 41
  '1925965': {
    name: 'Son Bóng Căng Mọng Fenty Beauty Gloss Bomb Luminizer',
    description: 'Son bóng quốc dân tôn vinh mọi tông da với bơ hạt mỡ dưỡng ẩm sâu và hương đào vani ngọt ngào gây nghiện.',
    variation: 'Màu Fenty Glow - Nâu hồng nhũ',
    badge: 'Bán chạy',
  },
  // 42
  '2597037': {
    name: 'Kem Nền Che Phủ Hoàn Hảo Haus Labs Triclone Skin Tech',
    description: 'Kem nền thuần chay cao cấp kết hợp 20 thành phần dưỡng da, mang lại làn da mịn màng không tì vết suốt 16 giờ.',
    variation: 'Tone 260 Light Medium',
    badge: 'Mỹ phẩm sạch',
  },
  // 43
  '2210722': {
    name: 'Tinh Chất Ngăn Rụng & Kích Thích Mọc Tóc The Ordinary Multi-Peptide',
    description: 'Serum đậm đặc phức hợp peptide và caffeine nuôi dưỡng nang tóc, giúp mái tóc trông dày hơn, chắc khỏe và bồng bềnh.',
    variation: 'Chai 60ml',
    badge: 'Bán chạy',
  },
  // 44
  '2495497': {
    name: 'Son Dưỡng Ẩm Chuyên Sâu Summer Fridays Lip Butter Balm',
    description: 'Bơ dưỡng môi thuần chay phục hồi làn môi khô nứt nẻ chỉ sau vài giờ với bơ hạt mỡ và sáp thực vật tự nhiên.',
    variation: 'Màu Vanilla Beige - Be tự nhiên',
    badge: 'Yêu thích 2026',
  },
  // 45
  '2031508': {
    name: 'Nước Cân Bằng Tẩy Da Chết The Ordinary Glycolic Acid 7% Toner',
    description: 'Toner thanh lọc da dịu nhẹ với axit glycolic cải thiện độ rạng rỡ của làn da, làm sạch sâu và đều màu da.',
    variation: 'Chai 240ml',
    badge: 'Bán chạy',
  },
  // 46
  '2404846': {
    name: 'Tinh Chất Căng Bóng Da Glow Recipe Watermelon Niacinamide Dew Drops',
    description: 'Serum dưỡng sáng da đa năng không chứa mica, tạo hiệu ứng làn da thủy tinh căng mọng tức thì và giảm thâm sạm.',
    variation: 'Chai 40ml',
    badge: 'Mỹ phẩm sạch',
  },
  // 47
  '2421360': {
    name: 'Dung Dịch Tẩy Tế Bào Chết BHA Paula\'s Choice 2% Liquid',
    description: 'Sản phẩm tẩy da chết hóa học số 1 thế giới giúp làm sạch sâu lỗ chân lông, đẩy lùi mụn đầu đen và làm mịn kết cấu da.',
    variation: 'Chai 118ml',
    badge: 'Bán chạy',
  },
  // 48
  '2461812': {
    name: 'Xịt Thơm Cơ Thể & Tóc Sol de Janeiro Cheirosa 40 Mist',
    description: 'Hương hoa mận đen tinh tế hòa cùng gỗ vani ấm áp và hoa nhài thanh lịch, lưu luyến suốt nhiều giờ.',
    variation: 'Chai 90ml',
    badge: 'Bán chạy',
  },
  // 49
  '2249688': {
    name: 'Nước Hoa Nữ Valentino Donna Born In Roma EDP (50ml)',
    description: 'Hương hoa cỏ phương Đông hiện đại với hoa nhài Sambac cao cấp kết hợp vani Bourbon ngọt ngào và tiêu hồng sắc sảo.',
    variation: 'Chai 50ml',
    badge: 'Cao cấp',
  },
  // 50
  '2249696': {
    name: 'Nước Hoa Nữ Valentino Donna Born In Roma EDP (100ml)',
    description: 'Phiên bản dung tích lớn 100ml của dòng nước hoa biểu tượng tôn vinh sự tự tin và cá tính quý phái của phái đẹp.',
    variation: 'Chai 100ml',
    badge: 'Cao cấp',
  },
  // 51
  '2645026': {
    name: 'Nước Hoa Nữ Chiếc Guốc Carolina Herrera Good Girl Blush EDP',
    description: 'Thiết kế giày gót nhọn màu hồng phấn biểu tượng, hương hoa mẫu đơn rạng rỡ hòa quyện vani và ngọc lan tây ngọt ngào.',
    variation: 'Chai 80ml',
    badge: 'Bán chạy',
  },
  // 52
  '2539542': {
    name: 'Kem Tạo Kiểu & Dưỡng Tóc 3 Trong 1 Dae Cactus Fruit Styling Cream',
    description: 'Kem tạo kiểu đa năng làm mượt tóc con, định hình lọn xoăn tự nhiên và bảo vệ sợi tóc trước tác hại môi trường.',
    variation: 'Tuýp 150ml',
    badge: 'Mỹ phẩm sạch',
  },
  // 53
  '2677508': {
    name: 'Mặt Nạ Ủ Tóc Dưỡng Ẩm Chuyên Sâu JVN Nurture Mask',
    description: 'Mặt nạ phục hồi tóc khô yếu với dầu hoa trà và phân tử hemisqualane, đem lại độ mềm mượt như nhung sau lần đầu sử dụng.',
    variation: 'Hũ 236ml',
    badge: 'Mỹ phẩm sạch',
  },
};

/**
 * Localizes a single product to Vietnamese.
 */
export function localizeProduct(product: Product): Product {
  if (!product) return product;
  const loc = PRODUCT_LOCALIZATION[product.skuId];
  if (!loc) return product;

  return {
    ...product,
    name: loc.name || product.name,
    variation: loc.variation !== undefined ? loc.variation : product.variation,
    badge: loc.badge !== undefined ? loc.badge : product.badge,
  };
}

/**
 * Localizes an array of products to Vietnamese.
 */
export function localizeProducts(products: Product[]): Product[] {
  if (!products) return [];
  return products.map(localizeProduct);
}

/**
 * Returns the Vietnamese product description.
 */
export function getProductDescription(skuId: string, fallbackName?: string): string {
  const loc = PRODUCT_LOCALIZATION[skuId];
  if (loc && loc.description) {
    return loc.description;
  }
  return `Sản phẩm ${fallbackName || 'mỹ phẩm chính hãng'} cao cấp được phân phối chính thức tại Sephora, cam kết 100% nguồn gốc xuất xứ rõ ràng, hạn sử dụng mới nhất và an toàn cho người sử dụng.`;
}

