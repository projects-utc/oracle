package vn.sephora.oracle.domain.favorite.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.favorite.model.UserFavorite;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserFavoriteRepository extends JpaRepository<UserFavorite, Long> {

    @Query("SELECT uf FROM UserFavorite uf JOIN FETCH uf.product WHERE uf.user.id = :userId AND uf.product.isActive = 1 ORDER BY uf.createdAt DESC")
    List<UserFavorite> findByUserIdWithProduct(@Param("userId") Long userId);

    Optional<UserFavorite> findByUserIdAndProductId(Long userId, Long productId);

    boolean existsByUserIdAndProductId(Long userId, Long productId);

    long countByUserId(Long userId);
}
