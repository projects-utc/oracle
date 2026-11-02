package vn.sephora.oracle.domain.catalog.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.catalog.model.Product;
import vn.sephora.oracle.domain.catalog.model.ProductCollection;

import java.util.List;

@Repository
public interface ProductCollectionRepository extends JpaRepository<ProductCollection, Long> {

    @Query("SELECT pc.product FROM ProductCollection pc " +
           "WHERE pc.collectionCode = :code AND pc.product.isActive = 1 " +
           "ORDER BY pc.displayOrder ASC")
    List<Product> findProductsByCollectionCode(@Param("code") String code);

    void deleteAllByProductId(Long productId);
    List<ProductCollection> findByProductId(Long productId);
}
