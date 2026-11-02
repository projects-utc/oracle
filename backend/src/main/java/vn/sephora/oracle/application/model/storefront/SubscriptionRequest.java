package vn.sephora.oracle.application.model.storefront;

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
public class SubscriptionRequest {
    @NotBlank(message = "Loại kênh không được để trống")
    private String channelType; // 'EMAIL' or 'SMS'

    @NotBlank(message = "Thông tin liên hệ không được để trống")
    private String contactValue;
}
