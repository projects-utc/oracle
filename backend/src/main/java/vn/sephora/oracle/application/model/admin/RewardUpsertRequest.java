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
public class RewardUpsertRequest {
    private String rewardCode;

    @NotBlank(message = "Thương hiệu không được để trống")
    private String brand;

    @NotBlank(message = "Tên phần quà không được để trống")
    private String name;

    private String pointsLabel;
    private Integer pointsCost;
    private String imageUrl;
    private String rewardUrl;
    private Integer stockQty;
    private Integer displayOrder;
    private Integer isActive;
}
