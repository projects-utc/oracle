package vn.sephora.oracle.domain.reward.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sep_reward_items")
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class RewardItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "reward_code", nullable = false, unique = true, length = 100)
    private String rewardCode;

    @Column(nullable = false, length = 150)
    private String brand;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(name = "points_label", nullable = false, length = 50)
    private String pointsLabel;

    @Column(name = "points_cost", nullable = false)
    @Builder.Default
    private Integer pointsCost = 100;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "reward_url", nullable = false, length = 500)
    private String rewardUrl;

    @Column(name = "stock_qty", nullable = false)
    @Builder.Default
    private Integer stockQty = 50;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Integer isActive = 1;
}
