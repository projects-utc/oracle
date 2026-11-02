package vn.sephora.oracle.domain.catalog.model;

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
import org.hibernate.annotations.DynamicUpdate;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "sep_products")
@Getter
@Setter
@DynamicUpdate
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_code", nullable = false, length = 50)
    private String productCode;

    @Column(name = "sku_id", nullable = false, unique = true, length = 50)
    private String skuId;

    @Column(nullable = false, length = 150)
    private String brand;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(name = "category_slug", nullable = false, length = 100)
    private String categorySlug;

    @Column(name = "price_display", nullable = false, length = 50)
    private String priceDisplay;

    @Column(name = "price_value", nullable = false, precision = 12, scale = 2)
    private BigDecimal priceValue;

    @Column(length = 150)
    private String variation;

    @Column(name = "rating_value", nullable = false, precision = 3, scale = 2)
    @Builder.Default
    private BigDecimal ratingValue = BigDecimal.valueOf(4.50);

    @Column(name = "reviews_count", nullable = false)
    @Builder.Default
    private Integer reviewsCount = 0;

    @Column(name = "image_url", nullable = false, length = 500)
    private String imageUrl;

    @Column(length = 100)
    private String badge;

    @Column(name = "product_url", nullable = false, length = 500)
    private String productUrl;

    @Column(name = "stock_qty", nullable = false)
    @Builder.Default
    private Integer stockQty = 40;

    @Column(name = "is_active", nullable = false)
    @Builder.Default
    private Integer isActive = 1;

    @Column(name = "created_at", nullable = false, updatable = false)
    @Builder.Default
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at", nullable = false)
    @Builder.Default
    private LocalDateTime updatedAt = LocalDateTime.now();
}
