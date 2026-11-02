package vn.sephora.oracle.application.model.storefront;

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
public class HomeStorefrontResponse {
    private List<CategoryDto> categories;
    private List<HeroBannerDto> heroBanners;
    private List<vn.sephora.oracle.application.model.catalog.ProductDto> chosenForYou;
    private List<vn.sephora.oracle.application.model.catalog.ProductDto> justDropped;
    private List<vn.sephora.oracle.application.model.catalog.ProductDto> sellingFast;
    private SavingsBannerDto savingsBanner;
    private List<PromoOfferDto> beautyOffers;
    private List<FeatureTileDto> featureTiles;
    private List<RewardItemDto> rewards;
    private List<GuidanceLinkDto> guidanceLinks;
    private List<ReassuranceBannerDto> reassuranceBanners;
    private List<FooterColumnDto> footerColumns;

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class HeroBannerDto {
        private String id;
        private String bgColor;
        private String textColor;
        private String image;
        private String alt;
        private String title;
        private String subtitle;
        private String cta;
        private String targetUrl;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class SavingsBannerDto {
        private String bgColor;
        private String image;
        private String title;
        private String subtitle;
        private String cta;
        private List<TierDto> tiers;

        @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
        public static class TierDto {
            private String label;
            private String discount;
            private String dates;
            private String badgeColor;
            private String textColor;
        }
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class PromoOfferDto {
        private Long dbId;
        private String id;
        private String title;
        private String description;
        private String code;
        private Integer discountPercent;
        private BigDecimal minOrderAmount;
        private String legalCopy;
        private String actionLabel;
        private String detailsActionLabel;
        private String image;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class FeatureTileDto {
        private String id;
        private String bgColor;
        private String textColor;
        private String title;
        private String subtitle;
        private String cta;
        private String image;
        private String targetUrl;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class RewardItemDto {
        private Long dbId;
        private String id;
        private String brand;
        private String name;
        private String points;
        private Integer pointsCost;
        private String image;
        private String url;
        private Integer stockQty;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class GuidanceLinkDto {
        private String label;
        private String slug;
        private String iconColor;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class ReassuranceBannerDto {
        private String id;
        private String bgColor;
        private String title;
        private String subtitle;
        private String cta;
        private String image;
    }

    @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
    public static class FooterColumnDto {
        private String title;
        private List<FooterLinkDto> links;

        @Getter @Setter @Builder @NoArgsConstructor @AllArgsConstructor
        public static class FooterLinkDto {
            private String label;
            private String href;
        }
    }
}
