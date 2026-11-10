import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { Product } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { formatUSD } from '../../constants';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';

export default function AdminProductsPage() {
  const { addToast, refreshHome } = useStore();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formSkuId, setFormSkuId] = useState('');
  const [formBrand, setFormBrand] = useState('');
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('skincare');
  const [formPrice, setFormPrice] = useState('45.00');
  const [formVariation, setFormVariation] = useState('');
  const [formStock, setFormStock] = useState('40');
  const [formImage, setFormImage] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formCollections, setFormCollections] = useState<string[]>(['CHOSEN_FOR_YOU']);
  const [saving, setSaving] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await adminApi.getAllProducts();
    if (res.success && res.data) {
      setProducts(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormSkuId(`SKU-${Date.now().toString().slice(-6)}`);
    setFormBrand('Sephora Collection');
    setFormName('Sản phẩm mỹ phẩm mới');
    setFormCategory('skincare');
    setFormPrice('35.00');
    setFormVariation('50ml');
    setFormStock('50');
    setFormImage('https://www.sephora.com/productimages/sku/s2333607-main-zoom.jpg');
    setFormBadge('Clean at Sephora');
    setFormCollections(['CHOSEN_FOR_YOU']);
    setIsModalOpen(true);
  };

  const openEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormSkuId(p.skuId);
    setFormBrand(p.brand);
    setFormName(p.name);
    setFormCategory(p.categorySlug);
    setFormPrice(p.priceValue.toString());
    setFormVariation(p.variation || '');
    setFormStock(p.stockQty.toString());
    setFormImage(p.image);
    setFormBadge(p.badge || '');
    setFormCollections(p.collections || ['CHOSEN_FOR_YOU']);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        skuId: formSkuId.trim(),
        brand: formBrand.trim(),
        name: formName.trim(),
        categorySlug: formCategory.trim(),
        priceValue: parseFloat(formPrice) || 0,
        priceDisplay: `$${parseFloat(formPrice).toFixed(2)}`,
        variation: formVariation.trim() || undefined,
        stockQty: parseInt(formStock) || 0,
        imageUrl: formImage.trim(),
        badge: formBadge.trim() || undefined,
        collections: formCollections,
      };

      if (editingProduct) {
        const res = await adminApi.updateProduct(editingProduct.dbId, payload);
        if (res.success) {
          addToast('Cập nhật thông tin sản phẩm thành công!', 'success');
        } else {
          addToast(res.message || 'Lỗi khi cập nhật sản phẩm', 'error');
        }
      } else {
        const res = await adminApi.createProduct(payload);
        if (res.success) {
          addToast('Thêm mới sản phẩm thành công!', 'success');
        } else {
          addToast(res.message || 'Lỗi khi tạo sản phẩm', 'error');
        }
      }

      setIsModalOpen(false);
      await fetchProducts();
      await refreshHome();
    } catch {
      addToast('Không thể lưu thông tin sản phẩm', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (p: Product) => {
    if (!window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${p.name}" (Mã SKU: ${p.skuId}) không?`)) return;
    try {
      const res = await adminApi.deleteProduct(p.dbId);
      if (res.success) {
        addToast(`Đã xóa sản phẩm ${p.skuId} thành công`, 'info');
        await fetchProducts();
        await refreshHome();
      } else {
        addToast(res.message || 'Không thể xóa sản phẩm', 'error');
      }
    } catch {
      addToast('Lỗi khi xóa sản phẩm', 'error');
    }
  };

  const filtered = products.filter((p) => {
    if (selectedCategory && p.categorySlug !== selectedCategory) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.skuId.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Quản lý Sản phẩm</h1>
          <p className="text-xs text-gray-500 mt-1">Quản lý danh sách {products.length} mặt hàng mỹ phẩm và theo dõi số lượng tồn kho</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 bg-[#810017] hover:bg-[#6b0013] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm sản phẩm mới</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm theo tên, thương hiệu hoặc mã SKU..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-50 focus:bg-white border border-gray-200 rounded-lg pl-9 pr-4 py-2 text-xs outline-none focus:border-black transition-all"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-auto bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs font-semibold outline-none focus:border-black"
        >
          <option value="">Tất cả danh mục</option>
          <option value="skincare">Chăm sóc da (skincare)</option>
          <option value="makeup">Trang điểm (makeup)</option>
          <option value="fragrance">Nước hoa (fragrance)</option>
          <option value="hair">Chăm sóc tóc (hair)</option>
          <option value="bath-body">Tắm & Cơ thể (bath-body)</option>
        </select>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Sản phẩm</th>
                <th className="py-3 px-4">SKU / Phân loại</th>
                <th className="py-3 px-4">Danh mục</th>
                <th className="py-3 px-4">Giá bán</th>
                <th className="py-3 px-4">Tồn kho</th>
                <th className="py-3 px-4">Bộ sưu tập</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">Đang tải danh sách sản phẩm...</td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">Không tìm thấy sản phẩm nào</td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.skuId} className="hover:bg-gray-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-contain rounded-md bg-gray-50 p-1 border border-gray-100 shrink-0" />
                        <div className="min-w-0 max-w-xs">
                          <div className="text-[10px] font-bold uppercase text-gray-500 truncate">{p.brand}</div>
                          <div className="font-semibold text-gray-900 truncate">{p.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-gray-800">{p.skuId}</div>
                      <div className="text-[11px] text-gray-400 truncate">{p.variation || '—'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-neutral-100 text-neutral-800 capitalize">
                        {p.categorySlug}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-900">{formatUSD(p.priceValue)}</td>
                    <td className="py-3 px-4">
                      <span className={`font-bold ${p.stockQty <= 10 ? 'text-rose-600' : 'text-gray-900'}`}>
                        {p.stockQty}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1">
                        {p.collections?.map((c) => (
                          <span key={c} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
                            {c === 'CHOSEN_FOR_YOU' ? 'Gợi ý' : c === 'JUST_DROPPED' ? 'Mới về' : 'Bán chạy'}
                          </span>
                        )) || '—'}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEditModal(p)}
                          className="p-1.5 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100 cursor-pointer"
                          title="Chỉnh sửa"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDelete(p)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 rounded-lg hover:bg-rose-50 cursor-pointer"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-base font-extrabold text-black mb-4 border-b border-gray-100 pb-2">
              {editingProduct ? `Chỉnh sửa sản phẩm: ${editingProduct.skuId}` : 'Thêm sản phẩm mới'}
            </h2>

            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Mã SKU *</label>
                  <input
                    type="text"
                    required
                    disabled={!!editingProduct}
                    value={formSkuId}
                    onChange={(e) => setFormSkuId(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none font-mono disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Thương hiệu *</label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Danh mục *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none bg-white font-semibold"
                  >
                    <option value="skincare">Skincare</option>
                    <option value="makeup">Makeup</option>
                    <option value="fragrance">Fragrance</option>
                    <option value="hair">Hair</option>
                    <option value="bath-body">Bath & Body</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Giá bán ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tồn kho *</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Phân loại (variation)</label>
                  <input
                    type="text"
                    value={formVariation}
                    onChange={(e) => setFormVariation(e.target.value)}
                    placeholder="50ml, 30 Colors..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Huy hiệu (badge)</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="Clean at Sephora..."
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">URL Ảnh sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-black outline-none font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1.5">Kệ trưng bày Storefront:</label>
                <div className="flex flex-wrap gap-4">
                  {[
                    { id: 'CHOSEN_FOR_YOU', label: 'Chosen For You' },
                    { id: 'JUST_DROPPED', label: 'Just Dropped' },
                    { id: 'SELLING_FAST', label: 'Selling Fast' },
                  ].map((col) => (
                    <label key={col.id} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formCollections.includes(col.id)}
                        onChange={(e) => {
                          if (e.target.checked) setFormCollections([...formCollections, col.id]);
                          else setFormCollections(formCollections.filter((c) => c !== col.id));
                        }}
                      />
                      <span>{col.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-100 font-bold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-full bg-black text-white hover:bg-neutral-800 font-bold"
                >
                  {saving ? 'Đang lưu...' : 'Lưu sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
