import React from 'react';
import { useStore } from '../../contexts/StoreContext';
import { HeroBanners } from '../../components/sephora/HeroBanners';
import { ProductCarousel } from '../../components/sephora/ProductCarousel';
import { SavingsBanner } from '../../components/sephora/SavingsBanner';
import { PromoCarousel } from '../../components/sephora/PromoCarousel';
import { FeatureTiles } from '../../components/sephora/FeatureTiles';
import { RewardsCarousel } from '../../components/sephora/RewardsCarousel';
import { GuidanceSection } from '../../components/sephora/GuidanceSection';
import { ReassuranceBanners } from '../../components/sephora/ReassuranceBanners';

export default function HomePage() {
  const { homeData, loadingHome } = useStore();

  if (loadingHome && !homeData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 font-sans">
        <div className="w-10 h-10 border-3 border-black border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs font-semibold text-gray-500">Đang tải dữ liệu từ máy chủ Oracle...</p>
      </div>
    );
  }

  if (!homeData) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 py-16 text-center font-sans">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Chưa tải được dữ liệu Storefront</h2>
        <p className="text-xs text-gray-500">Vui lòng kiểm tra kết nối API tới backend Spring Boot.</p>
      </div>
    );
  }

  return (
    <div className="font-sans">
      {/* 1. Hero Editorial Banners */}
      <HeroBanners banners={homeData.heroBanners} />

      {/* 2. Product Carousel: Gợi ý cho bạn */}
      <ProductCarousel
        title="Gợi ý cho bạn"
        subtitle="Những sản phẩm làm đẹp nổi bật được yêu thích nhất"
        viewAllUrl="/shop/gifts-value-sets"
        products={homeData.chosenForYou}
      />

      {/* 3. Sephora Savings Event Banner */}
      <SavingsBanner data={homeData.savingsBanner} />

      {/* 4. Beauty Offers (23 items) */}
      <PromoCarousel offers={homeData.beautyOffers} />

      {/* 5. Product Carousel: Mới về */}
      <ProductCarousel
        title="Sản phẩm mới về"
        subtitle="Các dòng mỹ phẩm chính hãng vừa cập bến"
        viewAllUrl="/shop/new"
        products={homeData.justDropped}
      />

      {/* 6. Feature Tiles */}
      <FeatureTiles tiles={homeData.featureTiles} />

      {/* 7. Product Carousel: Bán chạy nhất */}
      <ProductCarousel
        title="Bán chạy nhất"
        subtitle="Top sản phẩm thịnh hành được khách hàng chọn mua nhiều nhất"
        viewAllUrl="/shop/trending-on-social"
        products={homeData.sellingFast}
      />

      {/* 8. Guided Shopping */}
      <GuidanceSection links={homeData.guidanceLinks} />

      {/* 10. Reassurance Banners */}
      <ReassuranceBanners banners={homeData.reassuranceBanners} />
    </div>
  );
}
