package vn.sephora.oracle.application.service.admin;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import vn.sephora.oracle.application.common.exception.ResourceNotFoundException;
import vn.sephora.oracle.application.model.admin.AdminDashboardResponse;
import vn.sephora.oracle.application.model.admin.AuditLogDto;
import vn.sephora.oracle.application.model.admin.ProductUpsertRequest;
import vn.sephora.oracle.application.model.admin.PromoUpsertRequest;
import vn.sephora.oracle.application.model.admin.RewardUpsertRequest;
import vn.sephora.oracle.application.model.admin.StoreUpsertRequest;
import vn.sephora.oracle.application.model.catalog.ProductDto;
import vn.sephora.oracle.application.model.shopping.OrderDto;
import vn.sephora.oracle.application.model.storefront.HomeStorefrontResponse;
import vn.sephora.oracle.application.model.storefront.StoreDto;
import vn.sephora.oracle.application.model.user.UserDto;
import vn.sephora.oracle.application.service.audit.AuditLogService;
import vn.sephora.oracle.application.service.auth.AuthService;
import vn.sephora.oracle.application.service.catalog.CatalogPublicService;
import vn.sephora.oracle.application.service.shopping.ShoppingPrivateService;
import vn.sephora.oracle.application.service.storefront.StorefrontPublicService;
import vn.sephora.oracle.domain.audit.model.AuditLog;
import vn.sephora.oracle.domain.audit.persistent.AuditLogRepository;
import vn.sephora.oracle.domain.catalog.model.Product;
import vn.sephora.oracle.domain.catalog.model.ProductCollection;
import vn.sephora.oracle.domain.catalog.persistent.ProductCollectionRepository;
import vn.sephora.oracle.domain.catalog.persistent.ProductRepository;
import vn.sephora.oracle.domain.engagement.model.Subscription;
import vn.sephora.oracle.domain.engagement.persistent.SubscriptionRepository;
import vn.sephora.oracle.domain.order.model.Order;
import vn.sephora.oracle.domain.order.model.OrderItem;
import vn.sephora.oracle.domain.order.persistent.OrderRepository;
import vn.sephora.oracle.domain.order.persistent.OrderItemRepository;
import vn.sephora.oracle.domain.promotion.model.PromoOffer;
import vn.sephora.oracle.domain.promotion.persistent.PromoOfferRepository;
import vn.sephora.oracle.domain.reward.model.RewardItem;
import vn.sephora.oracle.domain.reward.persistent.RewardItemRepository;
import vn.sephora.oracle.domain.store.model.StoreLocation;
import vn.sephora.oracle.domain.store.persistent.StoreLocationRepository;
import vn.sephora.oracle.domain.user.model.User;
import vn.sephora.oracle.domain.user.persistent.UserRepository;
import vn.sephora.oracle.infrastructure.security.SecurityUtil;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AdminManagementService {

    private final ProductRepository productRepository;
    private final ProductCollectionRepository productCollectionRepository;
    private final PromoOfferRepository promoOfferRepository;
    private final RewardItemRepository rewardItemRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final UserRepository userRepository;
    private final StoreLocationRepository storeLocationRepository;
    private final SubscriptionRepository subscriptionRepository;
    private final AuditLogRepository auditLogRepository;
    private final AuditLogService auditLogService;
    private final CatalogPublicService catalogPublicService;
    private final StorefrontPublicService storefrontPublicService;
    private final ShoppingPrivateService shoppingPrivateService;
    private final AuthService authService;

    // region Dashboard
    @Transactional(readOnly = true)
    public AdminDashboardResponse getDashboard() {
        List<Order> allOrders = orderRepository.findAllByOrderByCreatedAtDesc();
        BigDecimal totalRevenue = allOrders.stream()
                .filter(o -> !"CANCELLED".equalsIgnoreCase(o.getOrderStatus()))
                .map(Order::getTotalAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        long pendingCount = allOrders.stream().filter(o -> "PENDING".equalsIgnoreCase(o.getOrderStatus())).count();
        long completedCount = allOrders.stream().filter(o -> "COMPLETED".equalsIgnoreCase(o.getOrderStatus())).count();
        long cancelledCount = allOrders.stream().filter(o -> "CANCELLED".equalsIgnoreCase(o.getOrderStatus())).count();

        long totalProducts = productRepository.count();
        long lowStockCount = productRepository.findAll().stream().filter(p -> p.getStockQty() <= 10).count();
        long totalCustomers = userRepository.count();
        long activeOffers = promoOfferRepository.findAllByIsActiveOrderByDisplayOrderAsc(1).size();
        long totalSubscriptions = subscriptionRepository.count();

        List<OrderDto> recentOrders = allOrders.stream()
                .limit(8)
                .map(shoppingPrivateService::toOrderDto)
                .collect(Collectors.toList());

        List<AuditLogDto> recentLogs = auditLogRepository.findRecent(PageRequest.of(0, 10)).stream()
                .map(this::toAuditLogDto)
                .collect(Collectors.toList());

        return AdminDashboardResponse.builder()
                .totalRevenue(totalRevenue)
                .totalOrders(allOrders.size())
                .pendingOrders(pendingCount)
                .completedOrders(completedCount)
                .cancelledOrders(cancelledCount)
                .totalProducts(totalProducts)
                .lowStockProducts(lowStockCount)
                .totalCustomers(totalCustomers)
                .activePromotions(activeOffers)
                .totalSubscriptions(totalSubscriptions)
                .recentOrders(recentOrders)
                .recentAuditLogs(recentLogs)
                .build();
    }
    // endregion

    // region Products CRUD
    @Transactional(readOnly = true)
    public List<ProductDto> getAllProducts() {
        return productRepository.findAll().stream()
                .map(catalogPublicService::toProductDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public ProductDto createProduct(ProductUpsertRequest request) {
        if (productRepository.findBySkuId(request.getSkuId().trim()).isPresent()) {
            throw new IllegalArgumentException("Mã SKU '" + request.getSkuId() + "' đã tồn tại trên hệ thống");
        }

        String pCode = StringUtils.hasText(request.getProductCode()) ? request.getProductCode().trim() : "P" + System.currentTimeMillis() % 1000000;
        String priceDisp = StringUtils.hasText(request.getPriceDisplay()) ? request.getPriceDisplay().trim() : "$" + request.getPriceValue();
        String pUrl = StringUtils.hasText(request.getProductUrl()) ? request.getProductUrl().trim() : "/product/" + request.getSkuId().trim();

        Product product = Product.builder()
                .productCode(pCode)
                .skuId(request.getSkuId().trim())
                .brand(request.getBrand().trim())
                .name(request.getName().trim())
                .categorySlug(request.getCategorySlug().trim().toLowerCase())
                .priceDisplay(priceDisp)
                .priceValue(request.getPriceValue())
                .variation(request.getVariation())
                .ratingValue(request.getRatingValue() != null ? BigDecimal.valueOf(request.getRatingValue()) : BigDecimal.valueOf(4.50))
                .reviewsCount(request.getReviewsCount() != null ? request.getReviewsCount() : 1)
                .imageUrl(request.getImageUrl().trim())
                .badge(request.getBadge())
                .productUrl(pUrl)
                .stockQty(request.getStockQty() != null ? request.getStockQty() : 40)
                .isActive(request.getIsActive() != null ? request.getIsActive() : 1)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        Product saved = productRepository.save(product);
        syncCollections(saved, request.getCollections());

        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "CREATE_PRODUCT", "PRODUCT", saved.getSkuId(), "Thêm mới sản phẩm: " + saved.getName());

        return catalogPublicService.toProductDto(saved);
    }

    @Transactional
    public ProductDto updateProduct(Long id, ProductUpsertRequest request) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với ID: " + id));

        if (StringUtils.hasText(request.getBrand())) product.setBrand(request.getBrand().trim());
        if (StringUtils.hasText(request.getName())) product.setName(request.getName().trim());
        if (StringUtils.hasText(request.getCategorySlug())) product.setCategorySlug(request.getCategorySlug().trim().toLowerCase());
        if (request.getPriceValue() != null) {
            product.setPriceValue(request.getPriceValue());
            product.setPriceDisplay("$" + request.getPriceValue());
        }
        if (StringUtils.hasText(request.getPriceDisplay())) product.setPriceDisplay(request.getPriceDisplay().trim());
        if (request.getVariation() != null) product.setVariation(request.getVariation().trim());
        if (StringUtils.hasText(request.getImageUrl())) product.setImageUrl(request.getImageUrl().trim());
        if (request.getBadge() != null) product.setBadge(request.getBadge().trim());
        if (request.getStockQty() != null) product.setStockQty(request.getStockQty());
        if (request.getIsActive() != null) product.setIsActive(request.getIsActive());
        product.setUpdatedAt(LocalDateTime.now());

        Product saved = productRepository.save(product);
        if (request.getCollections() != null) {
            syncCollections(saved, request.getCollections());
        }

        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "UPDATE_PRODUCT", "PRODUCT", saved.getSkuId(), "Cập nhật sản phẩm: " + saved.getName());

        return catalogPublicService.toProductDto(saved);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với ID: " + id));

        if (orderItemRepository.existsByProductId(id)) {
            product.setIsActive(0);
            product.setUpdatedAt(LocalDateTime.now());
            productRepository.save(product);
            auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                    "DELETE_PRODUCT", "PRODUCT", product.getSkuId(), "Ẩn (soft-delete) sản phẩm do có ràng buộc đơn hàng: " + product.getName());
        } else {
            productCollectionRepository.deleteAllByProductId(id);
            productCollectionRepository.flush();
            productRepository.delete(product);
            auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                    "DELETE_PRODUCT", "PRODUCT", product.getSkuId(), "Xóa cứng sản phẩm: " + product.getName());
        }
    }

    private void syncCollections(Product product, List<String> collectionCodes) {
        productCollectionRepository.deleteAllByProductId(product.getId());
        productCollectionRepository.flush();
        if (collectionCodes != null) {
            int order = 1;
            for (String code : collectionCodes) {
                if (StringUtils.hasText(code)) {
                    ProductCollection pc = ProductCollection.builder()
                            .collectionCode(code.trim().toUpperCase())
                            .product(product)
                            .displayOrder(order++)
                            .build();
                    productCollectionRepository.save(pc);
                }
            }
        }
    }
    // endregion

    // region Promotions & Rewards CRUD
    @Transactional
    public HomeStorefrontResponse.PromoOfferDto createPromotion(PromoUpsertRequest request) {
        String code = StringUtils.hasText(request.getOfferCode()) ? request.getOfferCode().trim() : "offer_" + System.currentTimeMillis();
        PromoOffer offer = PromoOffer.builder()
                .offerCode(code)
                .title(request.getTitle().trim())
                .descriptionText(request.getDescriptionText().trim())
                .promoCode(StringUtils.hasText(request.getPromoCode()) ? request.getPromoCode().trim().toUpperCase() : null)
                .discountPercent(request.getDiscountPercent())
                .minOrderAmount(request.getMinOrderAmount())
                .legalCopy(StringUtils.hasText(request.getLegalCopy()) ? request.getLegalCopy().trim() : "Áp dụng theo điều kiện chương trình.")
                .actionLabel(StringUtils.hasText(request.getActionLabel()) ? request.getActionLabel().trim() : "Shop Now")
                .detailsActionLabel(StringUtils.hasText(request.getDetailsActionLabel()) ? request.getDetailsActionLabel().trim() : "See details")
                .imageUrl(StringUtils.hasText(request.getImageUrl()) ? request.getImageUrl().trim() : "https://www.sephora.com/contentimages/promo/beautyoffers/placeholder.jpg")
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .isActive(request.getIsActive() != null ? request.getIsActive() : 1)
                .build();
        PromoOffer saved = promoOfferRepository.save(offer);
        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "CREATE_PROMOTION", "PROMO", saved.getOfferCode(), "Thêm ưu đãi: " + saved.getTitle());
        return storefrontPublicService.toPromoDto(saved);
    }

    @Transactional
    public HomeStorefrontResponse.PromoOfferDto updatePromotion(Long id, PromoUpsertRequest request) {
        PromoOffer offer = promoOfferRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ưu đãi với ID: " + id));

        if (StringUtils.hasText(request.getTitle())) offer.setTitle(request.getTitle().trim());
        if (StringUtils.hasText(request.getDescriptionText())) offer.setDescriptionText(request.getDescriptionText().trim());
        if (request.getPromoCode() != null) offer.setPromoCode(request.getPromoCode().trim().toUpperCase());
        if (request.getDiscountPercent() != null) offer.setDiscountPercent(request.getDiscountPercent());
        if (request.getMinOrderAmount() != null) offer.setMinOrderAmount(request.getMinOrderAmount());
        if (request.getImageUrl() != null) offer.setImageUrl(request.getImageUrl().trim());
        if (request.getIsActive() != null) offer.setIsActive(request.getIsActive());

        PromoOffer saved = promoOfferRepository.save(offer);
        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "UPDATE_PROMOTION", "PROMO", saved.getOfferCode(), "Cập nhật ưu đãi: " + saved.getTitle());
        return storefrontPublicService.toPromoDto(saved);
    }

    @Transactional
    public void deletePromotion(Long id) {
        PromoOffer offer = promoOfferRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy ưu đãi với ID: " + id));
        promoOfferRepository.delete(offer);
        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "DELETE_PROMOTION", "PROMO", offer.getOfferCode(), "Xóa ưu đãi: " + offer.getTitle());
    }

    @Transactional
    public HomeStorefrontResponse.RewardItemDto createReward(RewardUpsertRequest request) {
        String code = StringUtils.hasText(request.getRewardCode()) ? request.getRewardCode().trim() : "reward_" + System.currentTimeMillis();
        int pts = request.getPointsCost() != null ? request.getPointsCost() : 100;
        RewardItem item = RewardItem.builder()
                .rewardCode(code)
                .brand(request.getBrand().trim())
                .name(request.getName().trim())
                .pointsLabel(pts + " Points")
                .pointsCost(pts)
                .imageUrl(StringUtils.hasText(request.getImageUrl()) ? request.getImageUrl().trim() : "https://www.sephora.com/contentimages/rewards/placeholder.jpg")
                .rewardUrl(StringUtils.hasText(request.getRewardUrl()) ? request.getRewardUrl().trim() : "/offers")
                .stockQty(request.getStockQty() != null ? request.getStockQty() : 50)
                .displayOrder(request.getDisplayOrder() != null ? request.getDisplayOrder() : 0)
                .isActive(request.getIsActive() != null ? request.getIsActive() : 1)
                .build();
        RewardItem saved = rewardItemRepository.save(item);
        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "CREATE_REWARD", "REWARD", saved.getRewardCode(), "Thêm phần quà đổi điểm: " + saved.getName());
        return storefrontPublicService.toRewardDto(saved);
    }

    @Transactional
    public HomeStorefrontResponse.RewardItemDto updateReward(Long id, RewardUpsertRequest request) {
        RewardItem item = rewardItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy quà đổi điểm ID: " + id));

        if (StringUtils.hasText(request.getBrand())) item.setBrand(request.getBrand().trim());
        if (StringUtils.hasText(request.getName())) item.setName(request.getName().trim());
        if (request.getPointsCost() != null) {
            item.setPointsCost(request.getPointsCost());
            item.setPointsLabel(request.getPointsCost() + " Points");
        }
        if (StringUtils.hasText(request.getImageUrl())) item.setImageUrl(request.getImageUrl().trim());
        if (request.getStockQty() != null) item.setStockQty(request.getStockQty());
        if (request.getIsActive() != null) item.setIsActive(request.getIsActive());

        RewardItem saved = rewardItemRepository.save(item);
        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "UPDATE_REWARD", "REWARD", saved.getRewardCode(), "Cập nhật quà đổi điểm: " + saved.getName());
        return storefrontPublicService.toRewardDto(saved);
    }

    @Transactional
    public void deleteReward(Long id) {
        RewardItem item = rewardItemRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy quà đổi điểm ID: " + id));
        item.setIsActive(0); // soft deactivate
        rewardItemRepository.save(item);
        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "DELETE_REWARD", "REWARD", item.getRewardCode(), "Ẩn quà đổi điểm: " + item.getName());
    }
    // endregion

    // region Orders & Fulfillment
    @Transactional(readOnly = true)
    public List<OrderDto> getAllOrders(String status) {
        List<Order> orders;
        if (StringUtils.hasText(status)) {
            orders = orderRepository.findAllByOrderStatusOrderByCreatedAtDesc(status.trim().toUpperCase());
        } else {
            orders = orderRepository.findAllByOrderByCreatedAtDesc();
        }
        return orders.stream().map(shoppingPrivateService::toOrderDto).collect(Collectors.toList());
    }

    @Transactional
    public OrderDto updateOrderStatus(Long orderId, String newStatus) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng ID: " + orderId));

        String target = newStatus.trim().toUpperCase();
        String current = order.getOrderStatus();

        if (current.equalsIgnoreCase(target)) {
            return shoppingPrivateService.toOrderDto(order);
        }

        if ("CANCELLED".equalsIgnoreCase(current)) {
            throw new IllegalStateException("Đơn hàng đã hủy không thể mở lại trạng thái khác");
        }

        if ("CANCELLED".equalsIgnoreCase(target)) {
            // Restore product stock
            for (OrderItem oi : order.getItems()) {
                Product p = oi.getProduct();
                p.setStockQty(p.getStockQty() + oi.getQuantity());
                p.setUpdatedAt(LocalDateTime.now());
                productRepository.save(p);
            }
        }

        order.setOrderStatus(target);
        order.setUpdatedAt(LocalDateTime.now());
        Order saved = orderRepository.save(order);

        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "UPDATE_ORDER_STATUS", "ORDER", saved.getOrderCode(),
                "Chuyển trạng thái đơn hàng từ " + current + " sang " + target);

        return shoppingPrivateService.toOrderDto(saved);
    }
    // endregion

    // region Users & Governance
    @Transactional(readOnly = true)
    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(authService::toUserDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public UserDto updateUserStatus(Long userId, String status) {
        Long currentAdminId = SecurityUtil.getCurrentUserId();
        if (currentAdminId.equals(userId)) {
            throw new IllegalArgumentException("Không thể tự khóa tài khoản của chính mình");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));

        String clean = "LOCKED".equalsIgnoreCase(status) ? "LOCKED" : "ACTIVE";
        user.setAccountStatus(clean);
        user.setUpdatedAt(LocalDateTime.now());
        User saved = userRepository.save(user);

        auditLogService.record(currentAdminId, SecurityUtil.getCurrentUsername(),
                "UPDATE_USER_STATUS", "USER", user.getUsername(), "Đổi trạng thái tài khoản thành: " + clean);

        return authService.toUserDto(saved);
    }

    @Transactional
    public UserDto updateUserRole(Long userId, String role) {
        Long currentAdminId = SecurityUtil.getCurrentUserId();
        if (currentAdminId.equals(userId)) {
            throw new IllegalArgumentException("Không thể tự thay đổi vai trò của chính mình");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));

        String clean = "ADMIN".equalsIgnoreCase(role) ? "ADMIN" : "CUSTOMER";
        user.setUserRole(clean);
        user.setUpdatedAt(LocalDateTime.now());
        User saved = userRepository.save(user);

        auditLogService.record(currentAdminId, SecurityUtil.getCurrentUsername(),
                "UPDATE_USER_ROLE", "USER", user.getUsername(), "Đổi quyền tài khoản thành: " + clean);

        return authService.toUserDto(saved);
    }

    @Transactional
    public UserDto updateUserPoints(Long userId, int points) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));

        user.setPointsBalance(Math.max(0, points));
        if (user.getPointsBalance() >= 1000) user.setLoyaltyTier("ROUGE");
        else if (user.getPointsBalance() >= 350) user.setLoyaltyTier("VIB");
        else user.setLoyaltyTier("INSIDER");

        user.setUpdatedAt(LocalDateTime.now());
        User saved = userRepository.save(user);

        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "UPDATE_USER_POINTS", "USER", user.getUsername(), "Điều chỉnh điểm tích lũy thành: " + points);

        return authService.toUserDto(saved);
    }
    // endregion

    // region Stores & Subscriptions
    @Transactional(readOnly = true)
    public List<StoreDto> getAllStores() {
        return storeLocationRepository.findAll().stream()
                .map(s -> StoreDto.builder()
                        .id(s.getId())
                        .name(s.getName())
                        .address(s.getAddress())
                        .city(s.getCity())
                        .state(s.getStateCode())
                        .zipCode(s.getZipCode())
                        .distance(s.getDistanceLabel())
                        .hours(s.getHoursLabel())
                        .build())
                .collect(Collectors.toList());
    }

    @Transactional
    public StoreDto createStore(StoreUpsertRequest request) {
        StoreLocation store = StoreLocation.builder()
                .name(request.getName().trim())
                .address(request.getAddress().trim())
                .city(request.getCity().trim())
                .stateCode(StringUtils.hasText(request.getStateCode()) ? request.getStateCode().trim() : "NY")
                .zipCode(request.getZipCode().trim())
                .distanceLabel(StringUtils.hasText(request.getDistanceLabel()) ? request.getDistanceLabel().trim() : "0.5 mi")
                .hoursLabel(StringUtils.hasText(request.getHoursLabel()) ? request.getHoursLabel().trim() : "Open until 8:00 PM")
                .isActive(request.getIsActive() != null ? request.getIsActive() : 1)
                .build();
        StoreLocation saved = storeLocationRepository.save(store);
        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "CREATE_STORE", "STORE", saved.getId().toString(), "Thêm mới cửa hàng: " + saved.getName());

        return StoreDto.builder()
                .id(saved.getId())
                .name(saved.getName())
                .address(saved.getAddress())
                .city(saved.getCity())
                .state(saved.getStateCode())
                .zipCode(saved.getZipCode())
                .distance(saved.getDistanceLabel())
                .hours(saved.getHoursLabel())
                .build();
    }

    @Transactional
    public StoreDto updateStore(Long id, StoreUpsertRequest request) {
        StoreLocation store = storeLocationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy cửa hàng ID: " + id));

        if (StringUtils.hasText(request.getName())) store.setName(request.getName().trim());
        if (StringUtils.hasText(request.getAddress())) store.setAddress(request.getAddress().trim());
        if (StringUtils.hasText(request.getCity())) store.setCity(request.getCity().trim());
        if (StringUtils.hasText(request.getStateCode())) store.setStateCode(request.getStateCode().trim());
        if (StringUtils.hasText(request.getZipCode())) store.setZipCode(request.getZipCode().trim());
        if (StringUtils.hasText(request.getHoursLabel())) store.setHoursLabel(request.getHoursLabel().trim());

        StoreLocation saved = storeLocationRepository.save(store);
        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "UPDATE_STORE", "STORE", saved.getId().toString(), "Cập nhật cửa hàng: " + saved.getName());

        return StoreDto.builder()
                .id(saved.getId())
                .name(saved.getName())
                .address(saved.getAddress())
                .city(saved.getCity())
                .state(saved.getStateCode())
                .zipCode(saved.getZipCode())
                .distance(saved.getDistanceLabel())
                .hours(saved.getHoursLabel())
                .build();
    }

    @Transactional
    public void deleteStore(Long id) {
        StoreLocation store = storeLocationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy cửa hàng ID: " + id));
        storeLocationRepository.delete(store);
        auditLogService.record(SecurityUtil.getCurrentUserId(), SecurityUtil.getCurrentUsername(),
                "DELETE_STORE", "STORE", id.toString(), "Xóa cửa hàng: " + store.getName());
    }

    @Transactional(readOnly = true)
    public List<Subscription> getSubscriptions() {
        return subscriptionRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<AuditLogDto> getAuditLogs() {
        return auditLogRepository.findRecent(PageRequest.of(0, 100)).stream()
                .map(this::toAuditLogDto)
                .collect(Collectors.toList());
    }

    public AuditLogDto toAuditLogDto(AuditLog a) {
        return AuditLogDto.builder()
                .id(a.getId())
                .actorUserId(a.getActorUserId())
                .actorUsername(a.getActorUsername())
                .actionType(a.getActionType())
                .targetType(a.getTargetType())
                .targetId(a.getTargetId())
                .detailText(a.getDetailText())
                .createdAt(a.getCreatedAt())
                .build();
    }
}
