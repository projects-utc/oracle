package vn.sephora.oracle.domain.content.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.content.model.SavingsEvent;

import java.util.Optional;

@Repository
public interface SavingsEventRepository extends JpaRepository<SavingsEvent, Long> {
    Optional<SavingsEvent> findFirstByIsActiveOrderByIdDesc(Integer isActive);
}
