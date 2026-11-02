package vn.sephora.oracle.application.model.admin;

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
public class StoreUpsertRequest {
    @NotBlank(message = "Tên cửa hàng không được để trống")
    private String name;

    @NotBlank(message = "Địa chỉ không được để trống")
    private String address;

    @NotBlank(message = "Thành phố không được để trống")
    private String city;

    private String stateCode;

    @NotBlank(message = "Mã ZIP không được để trống")
    private String zipCode;

    private String distanceLabel;
    private String hoursLabel;
    private Integer isActive;
}
