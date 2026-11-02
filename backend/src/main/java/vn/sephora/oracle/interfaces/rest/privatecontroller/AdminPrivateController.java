package vn.sephora.oracle.interfaces.rest.privatecontroller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import vn.sephora.oracle.application.common.ApiResponse;
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
import vn.sephora.oracle.application.service.admin.AdminManagementService;
import vn.sephora.oracle.domain.engagement.model.Subscription;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminPrivateController {

    private final AdminManagementService adminManagementService;

    // region Dashboard
    @GetMapping("/dashboard")
    public ApiResponse<AdminDashboardResponse> getDashboard() {
        return ApiResponse.ok(adminManagementService.getDashboard());
    }
    // endregion

    // region Products
    @GetMapping("/products")
    public ApiResponse<List<ProductDto>> getAllProducts() {
        return ApiResponse.ok(adminManagementService.getAllProducts());
    }

    @PostMapping("/products")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<ProductDto> createProduct(@RequestBody @Valid ProductUpsertRequest request) {
        return ApiResponse.ok("Thêm mới sản phẩm thành công", adminManagementService.createProduct(request));
    }

    @PutMapping("/products/{id}")
    public ApiResponse<ProductDto> updateProduct(@PathVariable Long id, @RequestBody @Valid ProductUpsertRequest request) {
        return ApiResponse.ok("Cập nhật sản phẩm thành công", adminManagementService.updateProduct(id, request));
    }

    @DeleteMapping("/products/{id}")
    public ApiResponse<Void> deleteProduct(@PathVariable Long id) {
        adminManagementService.deleteProduct(id);
        return ApiResponse.ok("Xóa sản phẩm thành công", null);
    }
    // endregion

    // region Promotions & Rewards
    @PostMapping("/promotions")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<HomeStorefrontResponse.PromoOfferDto> createPromotion(@RequestBody @Valid PromoUpsertRequest request) {
        return ApiResponse.ok("Thêm mới ưu đãi thành công", adminManagementService.createPromotion(request));
    }

    @PutMapping("/promotions/{id}")
    public ApiResponse<HomeStorefrontResponse.PromoOfferDto> updatePromotion(@PathVariable Long id, @RequestBody @Valid PromoUpsertRequest request) {
        return ApiResponse.ok("Cập nhật ưu đãi thành công", adminManagementService.updatePromotion(id, request));
    }

    @DeleteMapping("/promotions/{id}")
    public ApiResponse<Void> deletePromotion(@PathVariable Long id) {
        adminManagementService.deletePromotion(id);
        return ApiResponse.ok("Xóa ưu đãi thành công", null);
    }

    @PostMapping("/rewards")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<HomeStorefrontResponse.RewardItemDto> createReward(@RequestBody @Valid RewardUpsertRequest request) {
        return ApiResponse.ok("Thêm phần quà đổi điểm thành công", adminManagementService.createReward(request));
    }

    @PutMapping("/rewards/{id}")
    public ApiResponse<HomeStorefrontResponse.RewardItemDto> updateReward(@PathVariable Long id, @RequestBody @Valid RewardUpsertRequest request) {
        return ApiResponse.ok("Cập nhật phần quà đổi điểm thành công", adminManagementService.updateReward(id, request));
    }

    @DeleteMapping("/rewards/{id}")
    public ApiResponse<Void> deleteReward(@PathVariable Long id) {
        adminManagementService.deleteReward(id);
        return ApiResponse.ok("Xóa phần quà đổi điểm thành công", null);
    }
    // endregion

    // region Orders
    @GetMapping("/orders")
    public ApiResponse<List<OrderDto>> getAllOrders(@RequestParam(required = false) String status) {
        return ApiResponse.ok(adminManagementService.getAllOrders(status));
    }

    @PatchMapping("/orders/{id}/status")
    public ApiResponse<OrderDto> updateOrderStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null || status.isBlank()) {
            throw new IllegalArgumentException("Trạng thái đơn hàng không được để trống");
        }
        return ApiResponse.ok("Cập nhật trạng thái đơn hàng thành công", adminManagementService.updateOrderStatus(id, status));
    }
    // endregion

    // region Users
    @GetMapping("/users")
    public ApiResponse<List<UserDto>> getAllUsers() {
        return ApiResponse.ok(adminManagementService.getAllUsers());
    }

    @PatchMapping("/users/{id}/status")
    public ApiResponse<UserDto> updateUserStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        return ApiResponse.ok("Cập nhật trạng thái tài khoản thành công", adminManagementService.updateUserStatus(id, status));
    }

    @PatchMapping("/users/{id}/role")
    public ApiResponse<UserDto> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String role = body.get("role");
        return ApiResponse.ok("Cập nhật quyền tài khoản thành công", adminManagementService.updateUserRole(id, role));
    }

    @PatchMapping("/users/{id}/points")
    public ApiResponse<UserDto> updateUserPoints(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        int points = body.get("points") != null ? Integer.parseInt(body.get("points").toString()) : 0;
        return ApiResponse.ok("Cập nhật điểm tích luỹ thành công", adminManagementService.updateUserPoints(id, points));
    }
    // endregion

    // region Stores & Subscriptions
    @GetMapping("/stores")
    public ApiResponse<List<StoreDto>> getAllStores() {
        return ApiResponse.ok(adminManagementService.getAllStores());
    }

    @PostMapping("/stores")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<StoreDto> createStore(@RequestBody @Valid StoreUpsertRequest request) {
        return ApiResponse.ok("Thêm mới cửa hàng thành công", adminManagementService.createStore(request));
    }

    @PutMapping("/stores/{id}")
    public ApiResponse<StoreDto> updateStore(@PathVariable Long id, @RequestBody @Valid StoreUpsertRequest request) {
        return ApiResponse.ok("Cập nhật cửa hàng thành công", adminManagementService.updateStore(id, request));
    }

    @DeleteMapping("/stores/{id}")
    public ApiResponse<Void> deleteStore(@PathVariable Long id) {
        adminManagementService.deleteStore(id);
        return ApiResponse.ok("Xóa cửa hàng thành công", null);
    }

    @GetMapping("/subscriptions")
    public ApiResponse<List<Subscription>> getSubscriptions() {
        return ApiResponse.ok(adminManagementService.getSubscriptions());
    }
    // endregion

    // region Audit Logs
    @GetMapping("/audit-logs")
    public ApiResponse<List<AuditLogDto>> getAuditLogs() {
        return ApiResponse.ok(adminManagementService.getAuditLogs());
    }
    // endregion
}
