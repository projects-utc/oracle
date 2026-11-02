package vn.sephora.oracle.application.model.admin;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PromoUpsertRequest {
    private String offerCode;

    @NotBlank(message = "Tiêu đề ưu đãi không được để trống")
    private String title;

    @NotBlank(message = "Mô tả ưu đãi không được để trống")
    private String descriptionText;

    private String promoCode;
    private Integer discountPercent;
    private BigDecimal minOrderAmount;
    private String legalCopy;
    private String actionLabel;
    private String detailsActionLabel;
    private String imageUrl;
    private Integer displayOrder;
    private Integer isActive;
}
