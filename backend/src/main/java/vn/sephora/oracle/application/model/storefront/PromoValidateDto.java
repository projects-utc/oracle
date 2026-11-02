package vn.sephora.oracle.application.model.storefront;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

public class PromoValidateDto {

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class Request {
        @NotBlank(message = "Mã giảm giá không được để trống")
        private String code;

        @NotNull(message = "Tổng tiền giỏ hàng không được để trống")
        private BigDecimal subtotal;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class Response {
        private String code;
        private Integer discountPercent;
        private BigDecimal discountAmount;
        private BigDecimal finalTotal;
        private String title;
    }
}
