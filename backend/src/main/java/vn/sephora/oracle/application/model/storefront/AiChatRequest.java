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
public class AiChatRequest {
    @NotBlank(message = "Mã phiên không được để trống")
    private String sessionKey;

    @NotBlank(message = "Nội dung tin nhắn không được để trống")
    private String message;
}
