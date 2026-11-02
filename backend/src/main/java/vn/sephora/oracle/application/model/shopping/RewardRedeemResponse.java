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
public class RewardRedeemResponse {
    private String rewardCode;
    private String rewardName;
    private int pointsSpent;
    private int remainingPoints;
    private LocalDateTime redeemedAt;
}
