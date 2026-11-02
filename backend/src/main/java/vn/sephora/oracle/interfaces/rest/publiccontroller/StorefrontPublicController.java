package vn.sephora.oracle.interfaces.rest.publiccontroller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import vn.sephora.oracle.application.common.ApiResponse;
import vn.sephora.oracle.application.model.catalog.ProductDetailDto;
import vn.sephora.oracle.application.model.catalog.ProductDto;
import vn.sephora.oracle.application.model.storefront.AiChatReplyResponse;
import vn.sephora.oracle.application.model.storefront.AiChatRequest;
import vn.sephora.oracle.application.model.storefront.HomeStorefrontResponse;
import vn.sephora.oracle.application.model.storefront.PromoValidateDto;
import vn.sephora.oracle.application.model.storefront.StoreDto;
import vn.sephora.oracle.application.model.storefront.SubscriptionRequest;
import vn.sephora.oracle.application.model.storefront.SubscriptionResponse;
import vn.sephora.oracle.application.service.catalog.CatalogPublicService;
import vn.sephora.oracle.application.service.storefront.StorefrontPublicService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/public")
public class StorefrontPublicController {

    private final StorefrontPublicService storefrontPublicService;
    private final CatalogPublicService catalogPublicService;

    @GetMapping("/storefront/home")
    public ApiResponse<HomeStorefrontResponse> getHome() {
        return ApiResponse.ok(storefrontPublicService.getHomeData());
    }

    @GetMapping("/products")
    public ApiResponse<List<ProductDto>> getProducts(
            @RequestParam(required = false) String q,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String collection,
            @RequestParam(required = false) String brand,
            @RequestParam(required = false) String sort) {
        return ApiResponse.ok(catalogPublicService.getProducts(q, category, collection, brand, sort));
    }

    @GetMapping("/products/{skuId}")
    public ApiResponse<ProductDetailDto> getProductDetail(@PathVariable String skuId) {
        return ApiResponse.ok(catalogPublicService.getProductDetail(skuId));
    }

    @GetMapping("/promotions")
    public ApiResponse<List<HomeStorefrontResponse.PromoOfferDto>> getPromotions() {
        return ApiResponse.ok(storefrontPublicService.getPromotions());
    }

    @PostMapping("/promotions/validate")
    public ApiResponse<PromoValidateDto.Response> validatePromo(@RequestBody @Valid PromoValidateDto.Request request) {
        return ApiResponse.ok(storefrontPublicService.validatePromoCode(request));
    }

    @GetMapping("/rewards")
    public ApiResponse<List<HomeStorefrontResponse.RewardItemDto>> getRewards() {
        return ApiResponse.ok(storefrontPublicService.getRewards());
    }

    @GetMapping("/stores")
    public ApiResponse<List<StoreDto>> getStores(@RequestParam(required = false) String q) {
        return ApiResponse.ok(storefrontPublicService.getStores(q));
    }

    @PostMapping("/subscriptions")
    @ResponseStatus(HttpStatus.CREATED)
    public ApiResponse<SubscriptionResponse> subscribe(@RequestBody @Valid SubscriptionRequest request) {
        return ApiResponse.ok("Đăng ký nhận thông tin thành công",
                storefrontPublicService.subscribe(request.getChannelType(), request.getContactValue()));
    }

    @PostMapping("/ai-chat")
    public ApiResponse<AiChatReplyResponse> aiChat(@RequestBody @Valid AiChatRequest request) {
        return ApiResponse.ok(storefrontPublicService.processAiChat(request.getSessionKey(), request.getMessage()));
    }
}
