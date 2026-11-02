package vn.sephora.oracle.domain.content.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.content.model.FeatureTile;

import java.util.List;

@Repository
public interface FeatureTileRepository extends JpaRepository<FeatureTile, Long> {
    List<FeatureTile> findAllByOrderByDisplayOrderAsc();
}
