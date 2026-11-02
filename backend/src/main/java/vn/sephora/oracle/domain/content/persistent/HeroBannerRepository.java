package vn.sephora.oracle.domain.content.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.content.model.FeatureTile;
import vn.sephora.oracle.domain.content.model.FooterColumn;
import vn.sephora.oracle.domain.content.model.GuidanceLink;
import vn.sephora.oracle.domain.content.model.HeroBanner;
import vn.sephora.oracle.domain.content.model.ReassuranceBanner;
import vn.sephora.oracle.domain.content.model.SavingsEvent;

import java.util.List;
import java.util.Optional;

@Repository
public interface HeroBannerRepository extends JpaRepository<HeroBanner, Long> {
    List<HeroBanner> findAllByIsActiveOrderByDisplayOrderAsc(Integer isActive);
}
