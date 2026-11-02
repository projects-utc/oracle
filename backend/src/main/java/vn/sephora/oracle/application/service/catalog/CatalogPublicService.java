package vn.sephora.oracle.application.service.catalog;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import vn.sephora.oracle.application.common.exception.ResourceNotFoundException;
import vn.sephora.oracle.application.model.catalog.ProductDetailDto;
import vn.sephora.oracle.application.model.catalog.ProductDto;
import vn.sephora.oracle.domain.catalog.model.Product;
import vn.sephora.oracle.domain.catalog.model.ProductCollection;
import vn.sephora.oracle.domain.catalog.persistent.ProductCollectionRepository;
import vn.sephora.oracle.domain.catalog.persistent.ProductRepository;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CatalogPublicService {

    private final ProductRepository productRepository;
    private final ProductCollectionRepository productCollectionRepository;

    @Transactional(readOnly = true)
    public List<ProductDto> getProducts(String query, String category, String collection, String brand, String sort) {
        if (StringUtils.hasText(collection)) {
            List<Product> collectionProducts = productCollectionRepository.findProductsByCollectionCode(collection.toUpperCase());
            return filterAndSortProducts(collectionProducts, query, brand, sort);
        }

        // Check if category represents special collections or guides
        if (StringUtils.hasText(category)) {
            String cat = category.toLowerCase().trim();
            if ("new".equals(cat)) {
                List<Product> products = productCollectionRepository.findProductsByCollectionCode("JUST_DROPPED");
                return filterAndSortProducts(products, query, brand, sort);
            }
            if ("sale-offers".equals(cat) || "sale".equals(cat)) {
                List<Product> all = productRepository.findAll();
                List<Product> saleProducts = all.stream()
                        .filter(p -> p.getIsActive() == 1)
                        .filter(p -> (p.getBadge() != null && !p.getBadge().isBlank()) || p.getPriceValue().compareTo(BigDecimal.valueOf(40)) <= 0)
                        .collect(Collectors.toList());
                return filterAndSortProducts(saleProducts, query, brand, sort);
            }
            if ("trending-on-social".equals(cat)) {
                List<Product> products = productCollectionRepository.findProductsByCollectionCode("SELLING_FAST");
                return filterAndSortProducts(products, query, brand, sort);
            }
            if ("teen-skincare-resource".equals(cat)) {
                List<Product> products = productRepository.findByCategorySlug("skincare");
                return filterAndSortProducts(products, query, brand, sort);
            }
            if ("mini-size".equals(cat)) {
                List<Product> products = productRepository.findAll().stream()
                        .filter(p -> p.getIsActive() == 1 && p.getPriceValue().compareTo(BigDecimal.valueOf(35)) <= 0)
                        .collect(Collectors.toList());
                return filterAndSortProducts(products, query, brand, sort);
            }
            if ("brands".equals(cat)) {
                List<Product> products = productRepository.findAll().stream()
                        .filter(p -> p.getIsActive() == 1)
                        .sorted(Comparator.comparing(Product::getBrand))
                        .collect(Collectors.toList());
                return filterAndSortProducts(products, query, brand, sort);
            }
            if ("gifts-value-sets".equals(cat) || "holiday-gift-guide".equals(cat) || "value-sets".equals(cat) || "beauty-advent-calendars".equals(cat) || "gift-cards".equals(cat)) {
                List<Product> products = productCollectionRepository.findProductsByCollectionCode("CHOSEN_FOR_YOU");
                return filterAndSortProducts(products, query, brand, sort);
            }

            // Direct category slug
            List<Product> catProducts = productRepository.findByCategorySlug(cat);
            return filterAndSortProducts(catProducts, query, brand, sort);
        }

        // General search or all active products
        List<Product> products;
        if (StringUtils.hasText(query)) {
            products = productRepository.searchActive(query.trim());
        } else {
            products = productRepository.findAll().stream()
                    .filter(p -> p.getIsActive() == 1)
                    .collect(Collectors.toList());
        }

        return filterAndSortProducts(products, null, brand, sort);
    }

    private List<ProductDto> filterAndSortProducts(List<Product> list, String query, String brand, String sort) {
        List<Product> filtered = list.stream()
                .filter(p -> p.getIsActive() == 1)
                .filter(p -> {
                    if (StringUtils.hasText(query)) {
                        String q = query.toLowerCase().trim();
                        boolean matchesName = p.getName() != null && p.getName().toLowerCase().contains(q);
                        boolean matchesBrand = p.getBrand() != null && p.getBrand().toLowerCase().contains(q);
                        boolean matchesVar = p.getVariation() != null && p.getVariation().toLowerCase().contains(q);
                        if (!matchesName && !matchesBrand && !matchesVar) return false;
                    }
                    if (StringUtils.hasText(brand)) {
                        if (p.getBrand() == null || !p.getBrand().equalsIgnoreCase(brand.trim())) return false;
                    }
                    return true;
                })
                .collect(Collectors.toList());

        if ("price_asc".equalsIgnoreCase(sort)) {
            filtered.sort(Comparator.comparing(Product::getPriceValue));
        } else if ("price_desc".equalsIgnoreCase(sort)) {
            filtered.sort(Comparator.comparing(Product::getPriceValue).reversed());
        } else if ("rating".equalsIgnoreCase(sort)) {
            filtered.sort(Comparator.comparing(Product::getRatingValue).reversed());
        } else if ("reviews".equalsIgnoreCase(sort)) {
            filtered.sort(Comparator.comparing(Product::getReviewsCount).reversed());
        }

        return filtered.stream().map(this::toProductDto).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public ProductDetailDto getProductDetail(String skuId) {
        Product product = productRepository.findBySkuIdAndIsActive(skuId, 1)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy sản phẩm với mã SKU: " + skuId));

        List<ProductDto> related = productRepository.findRelatedProducts(product.getCategorySlug(), skuId)
                .stream()
                .limit(6)
                .map(this::toProductDto)
                .collect(Collectors.toList());

        return ProductDetailDto.builder()
                .product(toProductDto(product))
                .relatedProducts(related)
                .build();
    }

    public ProductDto toProductDto(Product p) {
        return ProductDto.builder()
                .dbId(p.getId())
                .id(p.getProductCode())
                .skuId(p.getSkuId())
                .brand(p.getBrand())
                .name(p.getName())
                .categorySlug(p.getCategorySlug())
                .price(p.getPriceDisplay())
                .priceValue(p.getPriceValue())
                .variation(p.getVariation())
                .rating(p.getRatingValue() != null ? p.getRatingValue().doubleValue() : 4.5)
                .reviews(p.getReviewsCount())
                .image(p.getImageUrl())
                .badge(p.getBadge())
                .url(p.getProductUrl())
                .stockQty(p.getStockQty())
                .isActive(p.getIsActive())
                .collections(productCollectionRepository.findByProductId(p.getId()).stream()
                        .map(ProductCollection::getCollectionCode)
                        .collect(Collectors.toList()))
                .build();
    }
}
