package vn.sephora.oracle.domain.store.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.store.model.StoreLocation;

import java.util.List;

@Repository
public interface StoreLocationRepository extends JpaRepository<StoreLocation, Long> {
    List<StoreLocation> findAllByIsActiveOrderByIdAsc(Integer isActive);

    @Query("SELECT s FROM StoreLocation s WHERE s.isActive = 1 AND (" +
           "LOWER(s.zipCode) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(s.city) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(s.name) LIKE LOWER(CONCAT('%', :q, '%')) OR " +
           "LOWER(s.address) LIKE LOWER(CONCAT('%', :q, '%')))")
    List<StoreLocation> searchStores(@Param("q") String q);
}
