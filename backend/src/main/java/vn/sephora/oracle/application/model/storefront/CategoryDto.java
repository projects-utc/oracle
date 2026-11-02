package vn.sephora.oracle.application.model.storefront;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {
    private String id;
    private String slug;
    private String label;
    private boolean hasSparkle;
    private List<SubcategoryDto> subcategories;

    @Getter
    @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SubcategoryDto {
        private String label;
        private String slug;
        private String href;
    }
}
