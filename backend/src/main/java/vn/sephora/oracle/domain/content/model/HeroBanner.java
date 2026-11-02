package vn.sephora.oracle.domain.content.model;

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

@Entity
@Table(name = "sep_hero_banners")
@Getter
@Setter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class HeroBanner {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "banner_code", nullable = false, unique = true, length = 150)
    private String bannerCode;

    @Column(name = "bg_color", nullable = false, length = 30)
    private String bgColor;

    @Column(name = "text_color", nullable = false, length = 30)
    private String textColor;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(name = "alt_text", length = 500)
    private String altText;

    @Column(nullable = false, length = 255)
    private String title;

    @Column(length = 500)
    private String subtitle;

    @Column(name = "cta_text", nullable = false, length = 100)
    private String ctaText;

    @Column(name = "target_url", nullable = false, length = 255)
    @Builder.Default
    private String targetUrl = "/shop/new";

    @Column(name = "display_order", nullable = false)
    @Builder.Default
    private Integer displayOrder = 0;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Integer isActive = 1;
}
