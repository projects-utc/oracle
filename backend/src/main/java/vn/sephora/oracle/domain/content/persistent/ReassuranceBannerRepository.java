package vn.sephora.oracle.domain.content.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.content.model.ReassuranceBanner;

import java.util.List;

@Repository
public interface ReassuranceBannerRepository extends JpaRepository<ReassuranceBanner, Long> {
    List<ReassuranceBanner> findAllByOrderByDisplayOrderAsc();
}
