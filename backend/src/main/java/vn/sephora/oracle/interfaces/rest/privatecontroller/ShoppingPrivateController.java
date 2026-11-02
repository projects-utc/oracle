package vn.sephora.oracle.interfaces.rest.privatecontroller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import vn.sephora.oracle.application.common.ApiResponse;
import vn.sephora.oracle.application.model.catalog.ProductDto;
import vn.sephora.oracle.application.model.shopping.CartMutationDto;
import vn.sephora.oracle.application.model.shopping.CartResponse;
import vn.sephora.oracle.application.model.shopping.CreateOrderRequest;
import vn.sephora.oracle.application.model.shopping.FavoriteToggleResponse;
import vn.sephora.oracle.application.model.shopping.OrderDto;
import vn.sephora.oracle.application.model.shopping.RewardRedeemResponse;
import vn.sephora.oracle.application.model.shopping.RewardRedemptionDto;
import vn.sephora.oracle.application.service.shopping.ShoppingPrivateService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/private")
public class ShoppingPrivateController {

    private final ShoppingPrivateService shoppingPrivateService;

    // region Favorites
    @GetMapping("/favorites")
    public ApiResponse<List<ProductDto>> getFavorites() {
        return ApiResponse.ok(shoppingPrivateService.getFavorites());
    }

    @PostMapping("/favorites/{skuId}/toggle")
    public ApiResponse<FavoriteToggleResponse> toggleFavorite(@PathVariable String skuId) {
        return ApiResponse.ok(shoppingPrivateService.toggleFavorite(skuId));
    }
    // endregion

    // region Cart
    @GetMapping("/cart")
    public ApiResponse<CartResponse> getCart() {
        return ApiResponse.ok(shoppingPrivateService.getCart());
    }

    @PostMapping("/cart/items")
    public ApiResponse<CartResponse> addToCart(@RequestBody @Valid CartMutationDto.ItemRequest request) {
        return ApiResponse.ok("Đã thêm vào giỏ hàng", shoppingPrivateService.addToCart(request.getSkuId(), request.getQuantity()));
    }

    @PostMapping("/cart/sync")
    public ApiResponse<CartResponse> syncCart(@RequestBody CartMutationDto.SyncRequest request) {
        return ApiResponse.ok("Đồng bộ giỏ hàng thành công", shoppingPrivateService.syncGuestCart(request != null ? request.getItems() : null));
    }

    @PatchMapping("/cart/items/{skuId}")
    public ApiResponse<CartResponse> updateCartItem(@PathVariable String skuId, @RequestBody CartMutationDto.QuantityRequest request) {
        return ApiResponse.ok("Cập nhật giỏ hàng thành công", shoppingPrivateService.updateCartItem(skuId, request.getQuantity()));
    }

    @DeleteMapping("/cart/items/{skuId}")
    public ApiResponse<CartResponse> removeCartItem(@PathVariable String skuId) {
        return ApiResponse.ok("Đã xóa sản phẩm khỏi giỏ hàng", shoppingPrivateService.removeCartItem(skuId));
    }

    @DeleteMapping("/cart")
    public ApiResponse<CartResponse> clearCart() {
        return ApiResponse.ok("Đã làm trống giỏ hàng", shoppingPrivateService.clearCart());
    }
    // endregion

    // region Orders
    @PostMapping("/orders")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<OrderDto> createOrder(@RequestBody @Valid CreateOrderRequest request) {
        OrderDto order = shoppingPrivateService.createOrder(request);
        return ApiResponse.ok("Đặt đơn hàng thành công", order);
    }

    @GetMapping("/orders")
    public ApiResponse<List<OrderDto>> getMyOrders() {
        return ApiResponse.ok(shoppingPrivateService.getMyOrders());
    }

    @GetMapping("/orders/{orderCode}")
    public ApiResponse<OrderDto> getOrderByCode(@PathVariable String orderCode) {
        return ApiResponse.ok(shoppingPrivateService.getOrderByCode(orderCode));
    }
    // endregion

    // region Rewards
    @PostMapping("/rewards/{rewardCode}/redeem")
    public ApiResponse<RewardRedeemResponse> redeemReward(@PathVariable String rewardCode) {
        return ApiResponse.ok("Đổi phần quà thành công", shoppingPrivateService.redeemReward(rewardCode));
    }

    @GetMapping("/rewards/redemptions")
    public ApiResponse<List<RewardRedemptionDto>> getMyRedemptions() {
        return ApiResponse.ok(shoppingPrivateService.getMyRedemptions());
    }
    // endregion
}
