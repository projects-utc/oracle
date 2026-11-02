package vn.sephora.oracle.application.service.storefront;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import vn.sephora.oracle.application.common.util.TextNormalizer;
import vn.sephora.oracle.application.model.catalog.ProductDto;
import vn.sephora.oracle.application.model.storefront.AiChatReplyResponse;
import vn.sephora.oracle.application.model.storefront.CategoryDto;
import vn.sephora.oracle.application.model.storefront.HomeStorefrontResponse;
import vn.sephora.oracle.application.model.storefront.PromoValidateDto;
import vn.sephora.oracle.application.model.storefront.StoreDto;
import vn.sephora.oracle.application.model.storefront.SubscriptionResponse;
import vn.sephora.oracle.application.service.catalog.CatalogPublicService;
import vn.sephora.oracle.domain.catalog.model.Category;
import vn.sephora.oracle.domain.catalog.model.Product;
import vn.sephora.oracle.domain.catalog.persistent.CategoryRepository;
import vn.sephora.oracle.domain.catalog.persistent.ProductCollectionRepository;
import vn.sephora.oracle.domain.catalog.persistent.ProductRepository;
import vn.sephora.oracle.domain.content.model.FeatureTile;
import vn.sephora.oracle.domain.content.model.FooterColumn;
import vn.sephora.oracle.domain.content.model.GuidanceLink;
import vn.sephora.oracle.domain.content.model.HeroBanner;
import vn.sephora.oracle.domain.content.model.ReassuranceBanner;
import vn.sephora.oracle.domain.content.model.SavingsEvent;
import vn.sephora.oracle.domain.content.persistent.FeatureTileRepository;
import vn.sephora.oracle.domain.content.persistent.FooterColumnRepository;
import vn.sephora.oracle.domain.content.persistent.GuidanceLinkRepository;
import vn.sephora.oracle.domain.content.persistent.HeroBannerRepository;
import vn.sephora.oracle.domain.content.persistent.ReassuranceBannerRepository;
import vn.sephora.oracle.domain.content.persistent.SavingsEventRepository;
import vn.sephora.oracle.domain.engagement.model.AiChatMessage;
import vn.sephora.oracle.domain.engagement.model.Subscription;
import vn.sephora.oracle.domain.engagement.persistent.AiChatMessageRepository;
import vn.sephora.oracle.domain.engagement.persistent.SubscriptionRepository;
import vn.sephora.oracle.domain.promotion.model.PromoOffer;
import vn.sephora.oracle.domain.promotion.persistent.PromoOfferRepository;
import vn.sephora.oracle.domain.reward.model.RewardItem;
import vn.sephora.oracle.domain.reward.persistent.RewardItemRepository;
import vn.sephora.oracle.domain.store.model.StoreLocation;
import vn.sephora.oracle.domain.store.persistent.StoreLocationRepository;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class StorefrontPublicService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;
    private final ProductCollectionRepository productCollectionRepository;
    private final HeroBannerRepository heroBannerRepository;
    private final SavingsEventRepository savingsEventRepository;
    private final PromoOfferRepository promoOfferRepository;
    private final FeatureTileRepository featureTileRepository;
    private final RewardItemRepository rewardItemRepository;
    private final GuidanceLinkRepository guidanceLinkRepository;
    private final ReassuranceBannerRepository reassuranceBannerRepository;
    private final FooterColumnRepository footerColumnRepository;
    private final StoreLocationRepository storeLocationRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final AiChatMessageRepository aiChatMessageRepository;
    private final CatalogPublicService catalogPublicService;

    @Transactional(readOnly = true)
    public HomeStorefrontResponse getHomeData() {
        // 1. Categories
        List<CategoryDto> categories = categoryRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(this::toCategoryDto)
                .collect(Collectors.toList());

        // 2. Hero Banners
        List<HomeStorefrontResponse.HeroBannerDto> heroBanners = heroBannerRepository.findAllByIsActiveOrderByDisplayOrderAsc(1).stream()
                .map(b -> HomeStorefrontResponse.HeroBannerDto.builder()
                        .id(b.getBannerCode())
                        .bgColor(b.getBgColor())
                        .textColor(b.getTextColor())
                        .image(b.getImageUrl())
                        .alt(b.getAltText())
                        .title(b.getTitle())
                        .subtitle(b.getSubtitle())
                        .cta(b.getCtaText())
                        .targetUrl(b.getTargetUrl())
                        .build())
                .collect(Collectors.toList());

        // 3. Product carousels
        List<ProductDto> chosenForYou = productCollectionRepository.findProductsByCollectionCode("CHOSEN_FOR_YOU").stream()
                .map(catalogPublicService::toProductDto).collect(Collectors.toList());
        List<ProductDto> justDropped = productCollectionRepository.findProductsByCollectionCode("JUST_DROPPED").stream()
                .map(catalogPublicService::toProductDto).collect(Collectors.toList());
        List<ProductDto> sellingFast = productCollectionRepository.findProductsByCollectionCode("SELLING_FAST").stream()
                .map(catalogPublicService::toProductDto).collect(Collectors.toList());

        // 4. Savings Banner
        HomeStorefrontResponse.SavingsBannerDto savingsBanner = savingsEventRepository.findFirstByIsActiveOrderByIdDesc(1)
                .map(se -> HomeStorefrontResponse.SavingsBannerDto.builder()
                        .bgColor(se.getBgColor())
                        .image(se.getImageUrl())
                        .title(se.getTitle())
                        .subtitle(se.getSubtitle())
                        .cta(se.getCtaText())
                        .tiers(se.getTiers().stream().map(t -> HomeStorefrontResponse.SavingsBannerDto.TierDto.builder()
                                .label(t.getLabel())
                                .discount(t.getDiscountText())
                                .dates(t.getDateRange())
                                .badgeColor(t.getBadgeColor())
                                .textColor(t.getTextColor())
                                .build()).collect(Collectors.toList()))
                        .build())
                .orElse(null);

        // 5. Promo Offers
        List<HomeStorefrontResponse.PromoOfferDto> beautyOffers = promoOfferRepository.findAllByIsActiveOrderByDisplayOrderAsc(1).stream()
                .map(this::toPromoDto)
                .collect(Collectors.toList());

        // 6. Feature Tiles
        List<HomeStorefrontResponse.FeatureTileDto> featureTiles = featureTileRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(f -> HomeStorefrontResponse.FeatureTileDto.builder()
                        .id(f.getTileCode())
                        .bgColor(f.getBgColor())
                        .textColor(f.getTextColor())
                        .title(f.getTitle())
                        .subtitle(f.getSubtitle())
                        .cta(f.getCtaText())
                        .image(f.getImageUrl())
                        .targetUrl(f.getTargetUrl())
                        .build())
                .collect(Collectors.toList());

        // 7. Rewards
        List<HomeStorefrontResponse.RewardItemDto> rewards = rewardItemRepository.findAllByIsActiveOrderByDisplayOrderAsc(1).stream()
                .map(this::toRewardDto)
                .collect(Collectors.toList());

        // 8. Guidance Links
        List<HomeStorefrontResponse.GuidanceLinkDto> guidanceLinks = guidanceLinkRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(g -> HomeStorefrontResponse.GuidanceLinkDto.builder()
                        .label(g.getLabel())
                        .slug(g.getSlug())
                        .iconColor(g.getIconColor())
                        .build())
                .collect(Collectors.toList());

        // 9. Reassurance Banners
        List<HomeStorefrontResponse.ReassuranceBannerDto> reassuranceBanners = reassuranceBannerRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(rb -> HomeStorefrontResponse.ReassuranceBannerDto.builder()
                        .id(rb.getBannerCode())
                        .bgColor(rb.getBgColor())
                        .title(rb.getTitle())
                        .subtitle(rb.getSubtitle())
                        .cta(rb.getCtaText())
                        .image(rb.getImageUrl())
                        .build())
                .collect(Collectors.toList());

        // 10. Footer Columns
        List<HomeStorefrontResponse.FooterColumnDto> footerColumns = footerColumnRepository.findAllByOrderByDisplayOrderAsc().stream()
                .map(fc -> HomeStorefrontResponse.FooterColumnDto.builder()
                        .title(fc.getTitle())
                        .links(fc.getLinks().stream().map(l -> HomeStorefrontResponse.FooterColumnDto.FooterLinkDto.builder()
                                .label(l.getLabel())
                                .href(l.getHref())
                                .build()).collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());

        return HomeStorefrontResponse.builder()
                .categories(categories)
                .heroBanners(heroBanners)
                .chosenForYou(chosenForYou)
                .justDropped(justDropped)
                .sellingFast(sellingFast)
                .savingsBanner(savingsBanner)
                .beautyOffers(beautyOffers)
                .featureTiles(featureTiles)
                .rewards(rewards)
                .guidanceLinks(guidanceLinks)
                .reassuranceBanners(reassuranceBanners)
                .footerColumns(footerColumns)
                .build();
    }

    @Transactional(readOnly = true)
    public List<HomeStorefrontResponse.PromoOfferDto> getPromotions() {
        return promoOfferRepository.findAllByIsActiveOrderByDisplayOrderAsc(1).stream()
                .map(this::toPromoDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public PromoValidateDto.Response validatePromoCode(PromoValidateDto.Request request) {
        String code = request.getCode().trim().toUpperCase();
        BigDecimal subtotal = request.getSubtotal();

        // Check tier-based codes
        if ("ALLONSALE".equals(code)) {
            return calculateDiscount(code, 30, "Giảm 30% Sephora Collection", subtotal);
        }
        if ("ROUGE20".equals(code)) {
            return calculateDiscount(code, 20, "Giảm 20% Hạng thẻ Rouge", subtotal);
        }
        if ("VIB15".equals(code)) {
            return calculateDiscount(code, 15, "Giảm 15% Hạng thẻ VIB", subtotal);
        }
        if ("INSIDER10".equals(code)) {
            return calculateDiscount(code, 10, "Giảm 10% Hạng thẻ Insider", subtotal);
        }

        // Check database promo offers
        PromoOffer offer = promoOfferRepository.findByPromoCodeAndIsActive(code, 1)
                .orElseThrow(() -> new IllegalArgumentException("Mã giảm giá '" + code + "' không tồn tại hoặc đã hết hạn"));

        if (offer.getMinOrderAmount() != null && subtotal.compareTo(offer.getMinOrderAmount()) < 0) {
            throw new IllegalArgumentException("Đơn hàng phải từ $" + offer.getMinOrderAmount() + " để áp dụng mã này");
        }

        int percent = offer.getDiscountPercent() != null ? offer.getDiscountPercent() : 10;
        return calculateDiscount(code, percent, offer.getTitle(), subtotal);
    }

    private PromoValidateDto.Response calculateDiscount(String code, int percent, String title, BigDecimal subtotal) {
        BigDecimal discount = subtotal.multiply(BigDecimal.valueOf(percent))
                .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);
        BigDecimal finalTotal = subtotal.subtract(discount).max(BigDecimal.ZERO);

        return PromoValidateDto.Response.builder()
                .code(code)
                .discountPercent(percent)
                .discountAmount(discount)
                .finalTotal(finalTotal)
                .title(title)
                .build();
    }

    @Transactional(readOnly = true)
    public List<HomeStorefrontResponse.RewardItemDto> getRewards() {
        return rewardItemRepository.findAllByIsActiveOrderByDisplayOrderAsc(1).stream()
                .map(this::toRewardDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<StoreDto> getStores(String query) {
        List<StoreLocation> stores;
        if (StringUtils.hasText(query)) {
            stores = storeLocationRepository.searchStores(query.trim());
        } else {
            stores = storeLocationRepository.findAllByIsActiveOrderByIdAsc(1);
        }

        return stores.stream().map(s -> StoreDto.builder()
                .id(s.getId())
                .name(s.getName())
                .address(s.getAddress())
                .city(s.getCity())
                .state(s.getStateCode())
                .zipCode(s.getZipCode())
                .distance(s.getDistanceLabel())
                .hours(s.getHoursLabel())
                .build()).collect(Collectors.toList());
    }

    @Transactional
    public SubscriptionResponse subscribe(String channelType, String contactValue) {
        String cleanType = channelType.trim().toUpperCase();
        String cleanContact = TextNormalizer.blankToNull(contactValue);
        if (cleanContact == null) {
            throw new IllegalArgumentException("Thông tin liên hệ không được để trống");
        }

        if ("EMAIL".equals(cleanType)) {
            if (!cleanContact.matches("^[A-Za-z0-9+_.-]+@(.+)$")) {
                throw new IllegalArgumentException("Địa chỉ email không đúng định dạng");
            }
        } else if ("SMS".equals(cleanType)) {
            if (!cleanContact.matches("^[0-9+()\\s-]{7,20}$")) {
                throw new IllegalArgumentException("Số điện thoại nhận tin nhắn không đúng định dạng");
            }
        } else {
            throw new IllegalArgumentException("Kênh nhận tin phải là EMAIL hoặc SMS");
        }

        var existing = subscriptionRepository.findByChannelTypeAndContactValue(cleanType, cleanContact);
        if (existing.isPresent()) {
            return SubscriptionResponse.builder()
                    .channelType(cleanType)
                    .contactValue(cleanContact)
                    .alreadySubscribed(true)
                    .build();
        }

        Subscription sub = Subscription.builder()
                .channelType(cleanType)
                .contactValue(cleanContact)
                .createdAt(LocalDateTime.now())
                .build();
        subscriptionRepository.save(sub);

        return SubscriptionResponse.builder()
                .channelType(cleanType)
                .contactValue(cleanContact)
                .alreadySubscribed(false)
                .build();
    }

    @Transactional
    public AiChatReplyResponse processAiChat(String sessionKey, String userMessage) {
        String cleanKey = StringUtils.hasText(sessionKey) ? sessionKey.trim() : "anon-" + System.currentTimeMillis();
        String text = userMessage.trim();

        // 1. Save user message
        AiChatMessage userMsg = AiChatMessage.builder()
                .sessionKey(cleanKey)
                .senderType("USER")
                .messageText(text)
                .createdAt(LocalDateTime.now())
                .build();
        aiChatMessageRepository.save(userMsg);

        // 2. Query Oracle products matching message keywords
        String lower = text.toLowerCase();
        List<Product> matches = new ArrayList<>();
        String replyText;

        if (lower.contains("gift") || lower.contains("holiday") || lower.contains("set")) {
            matches = productCollectionRepository.findProductsByCollectionCode("CHOSEN_FOR_YOU").stream().limit(3).collect(Collectors.toList());
            replyText = "Cho dịp lễ và quà tặng đặc biệt, Sephora gợi ý cho bạn các bộ Favorites Gift Sets và bộ sưu tập Bestsellers được yêu thích nhất đang có ưu đãi!";
        } else if (lower.contains("lip") || lower.contains("mask") || lower.contains("son") || lower.contains("môi")) {
            matches = productRepository.searchActive("Lip").stream().limit(3).collect(Collectors.toList());
            replyText = "Dòng dưỡng môi và son bán chạy nhất hiện tại có Mặt nạ ngủ môi LANEIGE Lip Sleeping Mask và son kem lì dưỡng ẩm mềm mọng tự nhiên.";
        } else if (lower.contains("discount") || lower.contains("sale") || lower.contains("code") || lower.contains("mã") || lower.contains("giảm giá")) {
            matches = productRepository.findAll().stream().filter(p -> p.getIsActive() == 1 && p.getPriceValue().compareTo(BigDecimal.valueOf(40)) <= 0).limit(3).collect(Collectors.toList());
            replyText = "Sự kiện Sephora Savings Event đang diễn ra! Nhập mã ALLONSALE tại giỏ hàng để được giảm ngay 30% cho Sephora Collection, hoặc mã ROUGE20 / VIB15 theo hạng thẻ của bạn!";
        } else if (lower.contains("skincare") || lower.contains("serum") || lower.contains("da") || lower.contains("mụn") || lower.contains("kem")) {
            matches = productRepository.findByCategorySlug("skincare").stream().limit(3).collect(Collectors.toList());
            replyText = "Dành cho chu trình chăm sóc da chuẩn chuyên gia, bạn hãy thử ILIA Super Serum Skin Tint SPF 40 và các tinh chất cấp ẩm sâu bán chạy nhất dưới đây!";
        } else if (lower.contains("fragrance") || lower.contains("nước hoa") || lower.contains("perfume")) {
            matches = productRepository.findByCategorySlug("fragrance").stream().limit(3).collect(Collectors.toList());
            replyText = "Các mùi hương quyến rũ được săn đón nhiều nhất của DIOR, Tom Ford và Sol de Janeiro luôn sẵn sàng cho bạn!";
        } else {
            matches = productRepository.searchActive(text).stream().limit(3).collect(Collectors.toList());
            if (matches.isEmpty()) {
                matches = productCollectionRepository.findProductsByCollectionCode("SELLING_FAST").stream().limit(3).collect(Collectors.toList());
            }
            replyText = "Dựa trên sở thích của bạn tại Sephora, chuyên viên làm đẹp AI gửi bạn những sản phẩm được đánh giá 5 sao cao nhất hôm nay!";
        }

        // 3. Save AI message
        AiChatMessage aiMsg = AiChatMessage.builder()
                .sessionKey(cleanKey)
                .senderType("AI")
                .messageText(replyText)
                .createdAt(LocalDateTime.now())
                .build();
        aiChatMessageRepository.save(aiMsg);

        List<ProductDto> recs = matches.stream().map(catalogPublicService::toProductDto).collect(Collectors.toList());
        return AiChatReplyResponse.builder()
                .reply(replyText)
                .recommendedProducts(recs)
                .build();
    }

    private CategoryDto toCategoryDto(Category cat) {
        return CategoryDto.builder()
                .id(cat.getCategoryCode())
                .slug(cat.getSlug())
                .label(cat.getLabel())
                .hasSparkle(cat.getHasSparkle() == 1)
                .subcategories(cat.getSubcategories().stream().map(s -> CategoryDto.SubcategoryDto.builder()
                        .label(s.getLabel())
                        .slug(s.getSlug())
                        .href(s.getHref())
                        .build()).collect(Collectors.toList()))
                .build();
    }

    public HomeStorefrontResponse.PromoOfferDto toPromoDto(PromoOffer o) {
        return HomeStorefrontResponse.PromoOfferDto.builder()
                .dbId(o.getId())
                .id(o.getOfferCode())
                .title(o.getTitle())
                .description(o.getDescriptionText())
                .code(o.getPromoCode())
                .discountPercent(o.getDiscountPercent())
                .minOrderAmount(o.getMinOrderAmount())
                .legalCopy(o.getLegalCopy())
                .actionLabel(o.getActionLabel())
                .detailsActionLabel(o.getDetailsActionLabel())
                .image(o.getImageUrl())
                .build();
    }

    public HomeStorefrontResponse.RewardItemDto toRewardDto(RewardItem r) {
        return HomeStorefrontResponse.RewardItemDto.builder()
                .dbId(r.getId())
                .id(r.getRewardCode())
                .brand(r.getBrand())
                .name(r.getName())
                .points(r.getPointsLabel())
                .pointsCost(r.getPointsCost())
                .image(r.getImageUrl())
                .url(r.getRewardUrl())
                .stockQty(r.getStockQty())
                .build();
    }
}
