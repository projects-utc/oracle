package vn.sephora.oracle.domain.promotion.persistent;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.sephora.oracle.domain.promotion.model.PromoOffer;

import java.util.List;
import java.util.Optional;

@Repository
public interface PromoOfferRepository extends JpaRepository<PromoOffer, Long> {
    List<PromoOffer> findAllByIsActiveOrderByDisplayOrderAsc(Integer isActive);
    Optional<PromoOffer> findByPromoCodeAndIsActive(String promoCode, Integer isActive);
}
