package vn.sephora.oracle.domain.content.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "sep_savings_tiers")
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class SavingsTier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "event_id", nullable = false)
    private SavingsEvent savingsEvent;

    @Column(nullable = false, length = 100)
    private String label;

    @Column(name = "discount_text", nullable = false, length = 50)
    private String discountText;

    @Column(name = "date_range", nullable = false, length = 100)
    private String dateRange;

    @Column(name = "badge_color", nullable = false, length = 30)
    private String badgeColor;

    @Column(name = "text_color", nullable = false, length = 30)
    private String textColor;

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;
}
