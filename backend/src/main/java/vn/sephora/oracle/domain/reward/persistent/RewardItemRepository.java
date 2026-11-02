package vn.sephora.oracle.domain.reward.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.reward.model.RewardItem;

import java.util.List;
import java.util.Optional;

@Repository
public interface RewardItemRepository extends JpaRepository<RewardItem, Long> {
    List<RewardItem> findAllByIsActiveOrderByDisplayOrderAsc(Integer isActive);
    Optional<RewardItem> findByRewardCode(String rewardCode);
}
