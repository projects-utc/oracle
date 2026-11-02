package vn.sephora.oracle.application.model.shopping;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RewardRedemptionDto {
    private Long id;
    private String rewardCode;
    private String brand;
    private String name;
    private String imageUrl;
    private Integer pointsSpent;
    private LocalDateTime createdAt;
}
