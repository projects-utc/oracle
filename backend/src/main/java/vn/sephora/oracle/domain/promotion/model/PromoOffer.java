package vn.sephora.oracle.domain.promotion.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Table(name = "sep_promo_offers")
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class PromoOffer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "offer_code", nullable = false, unique = true, length = 150)
    private String offerCode;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(name = "description_text", nullable = false, length = 1000)
    private String descriptionText;

    @Column(name = "promo_code", length = 50)
    private String promoCode;

    @Column(name = "discount_percent")
    private Integer discountPercent;

    @Column(name = "min_order_amount", precision = 12, scale = 2)
    private BigDecimal minOrderAmount;

    @Column(name = "legal_copy", nullable = false, length = 1000)
    private String legalCopy;

    @Column(name = "action_label", nullable = false, length = 100)
    private String actionLabel;

    @Column(name = "details_action_label", nullable = false, length = 100)
    private String detailsActionLabel;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Integer isActive = 1;
}
