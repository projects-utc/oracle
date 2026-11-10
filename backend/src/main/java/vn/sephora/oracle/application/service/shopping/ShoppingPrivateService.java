package vn.sephora.oracle.application.service.shopping;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import vn.sephora.oracle.application.common.exception.ResourceNotFoundException;
import vn.sephora.oracle.application.model.catalog.ProductDto;
import vn.sephora.oracle.application.model.shopping.CartMutationDto;
import vn.sephora.oracle.application.model.shopping.CartResponse;
import vn.sephora.oracle.application.model.shopping.CreateOrderRequest;
import vn.sephora.oracle.application.model.shopping.FavoriteToggleResponse;
import vn.sephora.oracle.application.model.shopping.OrderDto;
import vn.sephora.oracle.application.model.shopping.RewardRedeemResponse;
import vn.sephora.oracle.application.model.shopping.RewardRedemptionDto;
import vn.sephora.oracle.application.service.audit.AuditLogService;
import vn.sephora.oracle.application.service.catalog.CatalogPublicService;
import vn.sephora.oracle.domain.cart.model.CartItem;
import vn.sephora.oracle.domain.cart.persistent.CartItemRepository;
import vn.sephora.oracle.domain.catalog.model.Product;
import vn.sephora.oracle.domain.catalog.persistent.ProductRepository;
import vn.sephora.oracle.domain.favorite.model.UserFavorite;
import vn.sephora.oracle.domain.favorite.persistent.UserFavoriteRepository;
import vn.sephora.oracle.domain.order.model.Order;
import vn.sephora.oracle.domain.order.model.OrderItem;
import vn.sephora.oracle.domain.order.persistent.OrderRepository;
import vn.sephora.oracle.domain.promotion.model.PromoOffer;
import vn.sephora.oracle.domain.promotion.persistent.PromoOfferRepository;
import vn.sephora.oracle.domain.reward.model.RewardItem;
import vn.sephora.oracle.domain.reward.model.RewardRedemption;
import vn.sephora.oracle.domain.reward.persistent.RewardItemRepository;
import vn.sephora.oracle.domain.reward.persistent.RewardRedemptionRepository;
import vn.sephora.oracle.domain.user.model.User;
import vn.sephora.oracle.domain.user.persistent.UserRepository;
import vn.sephora.oracle.infrastructure.security.SecurityUtil;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.Types;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ShoppingPrivateService {

    private final UserRepository userRepository;
    private final ProductRepository productRepository;
    private final UserFavoriteRepository userFavoriteRepository;
    private final CartItemRepository cartItemRepository;
    private final OrderRepository orderRepository;
    private final PromoOfferRepository promoOfferRepository;
    private final RewardItemRepository rewardItemRepository;
    private final RewardRedemptionRepository rewardRedemptionRepository;
    private final CatalogPublicService catalogPublicService;
    private final AuditLogService auditLogService;
    private final JdbcTemplate jdbcTemplate;

    // region Favorites
    @Transactional(readOnly = true)
    public List<ProductDto> getFavorites() {
        Long userId = SecurityUtil.getCurrentUserId();
        return userFavoriteRepository.findByUserIdWithProduct(userId).stream()
                .map(uf -> catalogPublicService.toProductDto(uf.getProduct()))
                .collect(Collectors.toList());
    }

    @Transactional
    public FavoriteToggleResponse toggleFavorite(String skuId) {
        Long userId = SecurityUtil.getCurrentUserId();
        User user = getUser(userId);
        Product product = productRepository.findBySkuId(skuId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với SKU: " + skuId));

        var existing = userFavoriteRepository.findByUserIdAndProductId(userId, product.getId());
        boolean loved;
        if (existing.isPresent()) {
            userFavoriteRepository.delete(existing.get());
            loved = false;
        } else {
            UserFavorite uf = UserFavorite.builder()
                    .user(user)
                    .product(product)
                    .createdAt(LocalDateTime.now())
                    .build();
            userFavoriteRepository.save(uf);
            loved = true;
        }

        long count = userFavoriteRepository.countByUserId(userId);
        return FavoriteToggleResponse.builder()
                .skuId(skuId)
                .loved(loved)
                .lovesCount(count)
                .build();
    }
    // endregion

    // region Cart
    @Transactional(readOnly = true)
    public CartResponse getCart() {
        Long userId = SecurityUtil.getCurrentUserId();
        return buildCartResponse(userId);
    }

    @Transactional
    public CartResponse addToCart(String skuId, int quantity) {
        Long userId = SecurityUtil.getCurrentUserId();
        User user = getUser(userId);
        Product product = productRepository.findBySkuIdAndIsActive(skuId, 1)
                .orElseThrow(() -> new ResourceNotFoundException("Sản phẩm không tồn tại hoặc đã ngừng kinh doanh"));

        if (product.getStockQty() <= 0) {
            throw new IllegalArgumentException("Sản phẩm này tạm thời hết hàng");
        }

        int addQty = Math.max(1, quantity);
        var existing = cartItemRepository.findByUserIdAndProductId(userId, product.getId());
        if (existing.isPresent()) {
            CartItem item = existing.get();
            int newQty = Math.min(product.getStockQty(), item.getQuantity() + addQty);
            item.setQuantity(newQty);
            item.setUpdatedAt(LocalDateTime.now());
            cartItemRepository.save(item);
        } else {
            CartItem item = CartItem.builder()
                    .user(user)
                    .product(product)
                    .quantity(Math.min(product.getStockQty(), addQty))
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
            cartItemRepository.save(item);
        }

        return buildCartResponse(userId);
    }

    @Transactional
    public CartResponse syncGuestCart(List<CartMutationDto.ItemRequest> items) {
        Long userId = SecurityUtil.getCurrentUserId();
        if (items != null && !items.isEmpty()) {
            for (CartMutationDto.ItemRequest req : items) {
                if (req.getSkuId() != null && req.getQuantity() > 0) {
                    try {
                        addToCart(req.getSkuId(), req.getQuantity());
                    } catch (Exception ignored) {
                        // skip out-of-stock or deleted items during guest cart migration
                    }
                }
            }
        }
        return buildCartResponse(userId);
    }

    @Transactional
    public CartResponse updateCartItem(String skuId, int quantity) {
        Long userId = SecurityUtil.getCurrentUserId();
        Product product = productRepository.findBySkuId(skuId)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với SKU: " + skuId));

        var existing = cartItemRepository.findByUserIdAndProductId(userId, product.getId());
        if (existing.isPresent()) {
            CartItem item = existing.get();
            if (quantity <= 0) {
                cartItemRepository.delete(item);
            } else {
                int validQty = Math.min(product.getStockQty(), quantity);
                item.setQuantity(validQty);
                item.setUpdatedAt(LocalDateTime.now());
                cartItemRepository.save(item);
            }
        }

        return buildCartResponse(userId);
    }

    @Transactional
    public CartResponse removeCartItem(String skuId) {
        Long userId = SecurityUtil.getCurrentUserId();
        Product product = productRepository.findBySkuId(skuId).orElse(null);
        if (product != null) {
            cartItemRepository.findByUserIdAndProductId(userId, product.getId())
                    .ifPresent(cartItemRepository::delete);
        }
        return buildCartResponse(userId);
    }

    @Transactional
    public CartResponse clearCart() {
        Long userId = SecurityUtil.getCurrentUserId();
        cartItemRepository.deleteAllByUserId(userId);
        return buildCartResponse(userId);
    }

    private CartResponse buildCartResponse(Long userId) {
        List<CartItem> items = cartItemRepository.findByUserIdWithProduct(userId);
        int totalQty = 0;
        BigDecimal subtotal = BigDecimal.ZERO;

        List<CartResponse.CartItemDto> itemDtos = new ArrayList<>();
        for (CartItem ci : items) {
            Product p = ci.getProduct();
            BigDecimal lineTotal = p.getPriceValue().multiply(BigDecimal.valueOf(ci.getQuantity()));
            totalQty += ci.getQuantity();
            subtotal = subtotal.add(lineTotal);

            itemDtos.add(CartResponse.CartItemDto.builder()
                    .id(ci.getId())
                    .skuId(p.getSkuId())
                    .product(catalogPublicService.toProductDto(p))
                    .quantity(ci.getQuantity())
                    .lineTotal(lineTotal)
                    .build());
        }

        return CartResponse.builder()
                .items(itemDtos)
                .totalQuantity(totalQty)
                .subtotal(subtotal)
                .build();
    }
    // endregion

    // region Orders & Checkout
    @Transactional
    public OrderDto createOrder(CreateOrderRequest request) {
        Long userId = SecurityUtil.getCurrentUserId();

        try {
            String orderCode = jdbcTemplate.execute((Connection conn) -> {
                try (CallableStatement cs = conn.prepareCall(
                        "{call PKG_ORDER_PROCESSING.SP_PLACE_ORDER(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}")) {
                    cs.setLong(1, userId);
                    cs.setString(2, request.getShippingName() != null ? request.getShippingName().trim() : "");
                    cs.setString(3, request.getShippingPhone() != null ? request.getShippingPhone().trim() : "");
                    cs.setString(4, request.getShippingAddress() != null ? request.getShippingAddress().trim() : "");
                    cs.setString(5, request.getFulfillmentStore());
                    cs.setString(6, StringUtils.hasText(request.getPromoCode()) ? request.getPromoCode().trim() : null);
                    cs.registerOutParameter(7, Types.NUMERIC); // o_order_id
                    cs.registerOutParameter(8, Types.VARCHAR); // o_order_code
                    cs.registerOutParameter(9, Types.NUMERIC); // o_total_amount
                    cs.registerOutParameter(10, Types.NUMERIC); // o_points_earned
                    cs.execute();
                    return cs.getString(8);
                }
            });

            Order savedOrder = orderRepository.findByOrderCodeWithItems(orderCode)
                    .orElseThrow(() -> new ResourceNotFoundException("Đơn hàng vừa tạo không tìm thấy: " + orderCode));

            return toOrderDto(savedOrder);
        } catch (DataAccessException ex) {
            String msg = ex.getMostSpecificCause() != null ? ex.getMostSpecificCause().getMessage() : ex.getMessage();
            if (msg != null && msg.contains("ORA-20001")) {
                String clean = msg.replaceFirst(".*ORA-20001:\\s*", "").split("\n")[0];
                throw new IllegalStateException(clean);
            } else if (msg != null && msg.contains("ORA-20002")) {
                String clean = msg.replaceFirst(".*ORA-20002:\\s*", "").split("\n")[0];
                throw new IllegalArgumentException(clean);
            } else if (msg != null && msg.contains("ORA-20004")) {
                String clean = msg.replaceFirst(".*ORA-20004:\\s*", "").split("\n")[0];
                throw new IllegalArgumentException(clean);
            }
            throw ex;
        }
    }

    @Transactional(readOnly = true)
    public List<OrderDto> getMyOrders() {
        Long userId = SecurityUtil.getCurrentUserId();
        return orderRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::toOrderDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public OrderDto getOrderByCode(String orderCode) {
        Long userId = SecurityUtil.getCurrentUserId();
        Order order = orderRepository.findByOrderCodeWithItems(orderCode.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy đơn hàng: " + orderCode));

        if (!order.getUser().getId().equals(userId)) {
            throw new ResourceNotFoundException("Không tìm thấy đơn hàng: " + orderCode);
        }

        return toOrderDto(order);
    }
    // endregion

    // region Rewards Redemption
    @Transactional
    public RewardRedeemResponse redeemReward(String rewardCode) {
        Long userId = SecurityUtil.getCurrentUserId();
        User user = getUser(userId);

        RewardItem reward = rewardItemRepository.findByRewardCode(rewardCode.trim())
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy phần quà với mã: " + rewardCode));

        if (reward.getIsActive() != 1 || reward.getStockQty() <= 0) {
            throw new IllegalStateException("Phần quà này hiện đã hết hàng hoặc ngừng áp dụng");
        }

        if (user.getPointsBalance() < reward.getPointsCost()) {
            throw new IllegalArgumentException("Bạn cần " + reward.getPointsCost() + " điểm để đổi phần quà này (hiện có: " + user.getPointsBalance() + " điểm)");
        }

        // Deduct points & stock
        user.setPointsBalance(user.getPointsBalance() - reward.getPointsCost());
        user.setUpdatedAt(LocalDateTime.now());
        userRepository.save(user);

        reward.setStockQty(reward.getStockQty() - 1);
        rewardItemRepository.save(reward);

        RewardRedemption redemption = RewardRedemption.builder()
                .user(user)
                .rewardItem(reward)
                .pointsSpent(reward.getPointsCost())
                .createdAt(LocalDateTime.now())
                .build();
        rewardRedemptionRepository.save(redemption);

        auditLogService.record(user.getId(), user.getUsername(), "REDEEM_REWARD", "REWARD", reward.getRewardCode(),
                "Đổi thành công phần quà '" + reward.getName() + "'. Trừ: " + reward.getPointsCost() + " điểm.");

        return RewardRedeemResponse.builder()
                .rewardCode(reward.getRewardCode())
                .rewardName(reward.getName())
                .pointsSpent(reward.getPointsCost())
                .remainingPoints(user.getPointsBalance())
                .redeemedAt(redemption.getCreatedAt())
                .build();
    }

    @Transactional(readOnly = true)
    public List<RewardRedemptionDto> getMyRedemptions() {
        Long userId = SecurityUtil.getCurrentUserId();
        return rewardRedemptionRepository.findByUserIdWithReward(userId).stream()
                .map(r -> RewardRedemptionDto.builder()
                        .id(r.getId())
                        .rewardCode(r.getRewardItem().getRewardCode())
                        .brand(r.getRewardItem().getBrand())
                        .name(r.getRewardItem().getName())
                        .imageUrl(r.getRewardItem().getImageUrl())
                        .pointsSpent(r.getPointsSpent())
                        .createdAt(r.getCreatedAt())
                        .build())
                .collect(Collectors.toList());
    }
    // endregion

    private User getUser(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Người dùng không tồn tại"));
    }

    public OrderDto toOrderDto(Order o) {
        return OrderDto.builder()
                .id(o.getId())
                .orderCode(o.getOrderCode())
                .orderStatus(o.getOrderStatus())
                .subtotalAmount(o.getSubtotalAmount())
                .discountAmount(o.getDiscountAmount())
                .totalAmount(o.getTotalAmount())
                .promoCode(o.getPromoCode())
                .shippingName(o.getShippingName())
                .shippingPhone(o.getShippingPhone())
                .shippingAddress(o.getShippingAddress())
                .fulfillmentStore(o.getFulfillmentStore())
                .pointsEarned(o.getPointsEarned())
                .createdAt(o.getCreatedAt())
                .items(o.getItems().stream().map(oi -> OrderDto.OrderItemDto.builder()
                        .id(oi.getId())
                        .skuId(oi.getSkuId())
                        .productName(oi.getProductName())
                        .brand(oi.getBrand())
                        .imageUrl(oi.getImageUrl())
                        .unitPrice(oi.getUnitPrice())
                        .quantity(oi.getQuantity())
                        .lineTotal(oi.getLineTotal())
                        .build()).collect(Collectors.toList()))
                .build();
    }
}
