package vn.sephora.oracle.domain.catalog.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.catalog.model.Product;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    Optional<Product> findBySkuId(String skuId);
    Optional<Product> findBySkuIdAndIsActive(String skuId, Integer isActive);

    @Query("SELECT p FROM Product p WHERE p.categorySlug = :categorySlug AND p.isActive = 1 AND p.skuId <> :excludeSkuId ORDER BY p.ratingValue DESC")
    List<Product> findRelatedProducts(@Param("categorySlug") String categorySlug, @Param("excludeSkuId") String excludeSkuId);

    @Query("SELECT p FROM Product p WHERE p.isActive = 1 AND " +
           "(LOWER(p.name) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(p.brand) LIKE LOWER(CONCAT('%', :query, '%')) OR " +
           " LOWER(p.variation) LIKE LOWER(CONCAT('%', :query, '%')))")
    List<Product> searchActive(@Param("query") String query);

    @Query("SELECT p FROM Product p WHERE p.isActive = 1 AND p.categorySlug = :slug")
    List<Product> findByCategorySlug(@Param("slug") String slug);
}
