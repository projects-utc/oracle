package vn.sephora.oracle.application.model.storefront;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import vn.sephora.oracle.application.model.catalog.ProductDto;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AiChatReplyResponse {
    private String reply;
    private List<ProductDto> recommendedProducts;
}
