package vn.sephora.oracle.application.model.shopping;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.sephora.oracle.application.model.catalog.ProductDto;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CartResponse {
    private List<CartItemDto> items;
    private int totalQuantity;
    private BigDecimal subtotal;

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CartItemDto {
        private Long id;
        private String skuId;
        private ProductDto product;
        private int quantity;
        private BigDecimal lineTotal;
    }
}
