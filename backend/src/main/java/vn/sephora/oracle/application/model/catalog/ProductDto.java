package vn.sephora.oracle.application.model.catalog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private Long dbId;
    private String id; // productCode (e.g. "P455418")
    private String skuId; // unique SKU identifier
    private String brand;
    private String name;
    private String categorySlug;
    private String price; // formatted string "$48.00"
    private BigDecimal priceValue;
    private String variation;
    private Double rating;
    private Integer reviews;
    private String image;
    private String badge;
    private String url;
    private Integer stockQty;
    private Integer isActive;
    private List<String> collections;
}
