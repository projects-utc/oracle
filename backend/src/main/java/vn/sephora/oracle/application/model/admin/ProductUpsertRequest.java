package vn.sephora.oracle.application.model.admin;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductUpsertRequest {
    private String productCode;

    @NotBlank(message = "Mã SKU không được để trống")
    private String skuId;

    @NotBlank(message = "Thương hiệu không được để trống")
    private String brand;

    @NotBlank(message = "Tên sản phẩm không được để trống")
    private String name;

    @NotBlank(message = "Danh mục không được để trống")
    private String categorySlug;

    private String priceDisplay;

    @NotNull(message = "Giá bán không được để trống")
    private BigDecimal priceValue;

    private String variation;
    private Double ratingValue;
    private Integer reviewsCount;

    @NotBlank(message = "Ảnh sản phẩm không được để trống")
    private String imageUrl;

    private String badge;
    private String productUrl;
    private Integer stockQty;
    private Integer isActive;
    private List<String> collections; // e.g. ["CHOSEN_FOR_YOU", "SELLING_FAST"]
}
