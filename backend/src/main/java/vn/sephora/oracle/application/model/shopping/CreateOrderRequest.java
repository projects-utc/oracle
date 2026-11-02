package vn.sephora.oracle.application.model.shopping;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrderRequest {
    @NotBlank(message = "Tên người nhận không được để trống")
    private String shippingName;

    @NotBlank(message = "Số điện thoại giao hàng không được để trống")
    private String shippingPhone;

    @NotBlank(message = "Địa chỉ nhận hàng không được để trống")
    private String shippingAddress;

    private String promoCode;
    private String fulfillmentStore;
}
