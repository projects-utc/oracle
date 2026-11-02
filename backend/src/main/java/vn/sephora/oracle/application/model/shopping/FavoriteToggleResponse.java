package vn.sephora.oracle.application.model.shopping;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteToggleResponse {
    private String skuId;
    private boolean loved;
    private long lovesCount;
}
