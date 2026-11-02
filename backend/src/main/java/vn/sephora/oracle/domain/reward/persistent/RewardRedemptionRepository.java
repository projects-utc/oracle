package vn.sephora.oracle.domain.reward.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.reward.model.RewardRedemption;

import java.util.List;

@Repository
public interface RewardRedemptionRepository extends JpaRepository<RewardRedemption, Long> {

    @Query("SELECT r FROM RewardRedemption r JOIN FETCH r.rewardItem WHERE r.user.id = :userId ORDER BY r.createdAt DESC")
    List<RewardRedemption> findByUserIdWithReward(@Param("userId") Long userId);
}
