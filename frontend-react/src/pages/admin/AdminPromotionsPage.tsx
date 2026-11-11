import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { PromoOffer, RewardItem } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { formatVND } from '../../constants';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminPromotionsPage() {
  const { addToast } = useStore();
  const [activeTab, setActiveTab] = useState<'PROMOS' | 'REWARDS'>('PROMOS');
  const [promos, setPromos] = useState<PromoOffer[]>([]);
  const [rewards, setRewards] = useState<RewardItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Promo Modal
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<PromoOffer | null>(null);
  const [formPromoTitle, setFormPromoTitle] = useState('');
  const [formPromoDesc, setFormPromoDesc] = useState('');
  const [formPromoCode, setFormPromoCode] = useState('');
  const [formPromoDiscount, setFormPromoDiscount] = useState('20');
  const [formPromoMinOrder, setFormPromoMinOrder] = useState('500000');

  // Reward Modal
  const [isRewardModalOpen, setIsRewardModalOpen] = useState(false);
  const [editingReward, setEditingReward] = useState<RewardItem | null>(null);
  const [formRewardBrand, setFormRewardBrand] = useState('');
  const [formRewardName, setFormRewardName] = useState('');
  const [formRewardPoints, setFormRewardPoints] = useState('100');
  const [formRewardStock, setFormRewardStock] = useState('50');

  const fetchData = async () => {
    setLoading(true);
    // Reuse storefront/admin endpoints
    const resP = await fetch('/api/public/promotions').then((r) => r.json());
    if (resP.success && resP.data) setPromos(resP.data);
    const resR = await fetch('/api/public/rewards').then((r) => r.json());
    if (resR.success && resR.data) setRewards(resR.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openCreatePromo = () => {
    setEditingPromo(null);
    setFormPromoTitle('Khuyến mãi đặc biệt');
    setFormPromoDesc('Giảm ngay 20% cho đơn hàng làm đẹp khi nhập mã');
    setFormPromoCode('BEAUTY20');
    setFormPromoDiscount('20');
    setFormPromoMinOrder('50.00');
    setIsPromoModalOpen(true);
  };

  const openCreateReward = () => {
    setEditingReward(null);
    setFormRewardBrand('Sephora Collection');
    setFormRewardName('Mặt nạ dưỡng da mini cao cấp');
    setFormRewardPoints('100');
    setFormRewardStock('50');
    setIsRewardModalOpen(true);
  };

  const handleSavePromo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        title: formPromoTitle.trim(),
        descriptionText: formPromoDesc.trim(),
        promoCode: formPromoCode.trim().toUpperCase() || undefined,
        discountPercent: parseInt(formPromoDiscount) || 10,
        minOrderAmount: parseFloat(formPromoMinOrder) || 0,
      };

      if (editingPromo && editingPromo.dbId) {
        await adminApi.updatePromotion(editingPromo.dbId, payload);
        addToast('Cập nhật ưu đãi thành công!', 'success');
      } else {
        await adminApi.createPromotion(payload);
        addToast('Thêm mới ưu đãi thành công!', 'success');
      }
      setIsPromoModalOpen(false);
      await fetchData();
    } catch {
      addToast('Không thể lưu ưu đãi', 'error');
    }
  };

  const handleSaveReward = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        brand: formRewardBrand.trim(),
        name: formRewardName.trim(),
        pointsCost: parseInt(formRewardPoints) || 100,
        stockQty: parseInt(formRewardStock) || 50,
      };

      if (editingReward && editingReward.dbId) {
        await adminApi.updateReward(editingReward.dbId, payload);
        addToast('Cập nhật quà đổi điểm thành công!', 'success');
      } else {
        await adminApi.createReward(payload);
        addToast('Thêm mới quà đổi điểm thành công!', 'success');
      }
      setIsRewardModalOpen(false);
      await fetchData();
    } catch {
      addToast('Không thể lưu quà đổi điểm', 'error');
    }
  };

  const handleDeletePromo = async (p: PromoOffer) => {
    if (!p.dbId || !window.confirm(`Xóa ưu đãi "${p.title}"?`)) return;
    await adminApi.deletePromotion(p.dbId);
    addToast('Đã xóa ưu đãi', 'info');
    await fetchData();
  };

  const handleDeleteReward = async (r: RewardItem) => {
    if (!r.dbId || !window.confirm(`Ẩn phần quà "${r.name}"?`)) return;
    await adminApi.deleteReward(r.dbId);
    addToast('Đã ẩn phần quà đổi điểm', 'info');
    await fetchData();
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Quản lý Ưu đãi & Quà đổi điểm</h1>
          <p className="text-xs text-gray-500 mt-1">Cấu hình các chiến dịch Beauty Offers và danh mục quà đổi điểm</p>
        </div>

        {activeTab === 'PROMOS' ? (
          <button
            onClick={openCreatePromo}
            className="inline-flex items-center gap-2 bg-[#810017] hover:bg-[#6b0013] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Ưu đãi Promo</span>
          </button>
        ) : (
          <button
            onClick={openCreateReward}
            className="inline-flex items-center gap-2 bg-[#810017] hover:bg-[#6b0013] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Quà đổi điểm</span>
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('PROMOS')}
          className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-all cursor-pointer ${
            activeTab === 'PROMOS' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Ưu đãi & Mã giảm giá ({promos.length})
        </button>
        <button
          onClick={() => setActiveTab('REWARDS')}
          className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-all cursor-pointer ${
            activeTab === 'REWARDS' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Quà đổi điểm Beauty Insider ({rewards.length})
        </button>
      </div>

      {/* Content Table */}
      {activeTab === 'PROMOS' ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Chiến dịch / Tiêu đề</th>
                <th className="py-3 px-4">Mã Code</th>
                <th className="py-3 px-4">Mức giảm</th>
                <th className="py-3 px-4">Đơn tối thiểu</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400">Đang tải...</td></tr>
              ) : promos.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{p.title}</div>
                    <div className="text-[11px] text-gray-500 truncate max-w-md">{p.description}</div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#810017]">{p.code || '—'}</td>
                  <td className="py-3 px-4 font-bold">{p.discountPercent ? `${p.discountPercent}%` : 'Tặng kèm'}</td>
                  <td className="py-3 px-4 text-gray-600">{p.minOrderAmount ? formatVND(p.minOrderAmount) : '0 ₫'}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => handleDeletePromo(p)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Phần quà</th>
                <th className="py-3 px-4">Thương hiệu</th>
                <th className="py-3 px-4">Mức điểm đổi</th>
                <th className="py-3 px-4">Tồn kho</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400">Đang tải...</td></tr>
              ) : rewards.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="font-bold text-gray-900">{r.name}</div>
                    <div className="font-mono text-[10px] text-gray-400">{r.id}</div>
                  </td>
                  <td className="py-3 px-4 font-semibold text-gray-700">{r.brand}</td>
                  <td className="py-3 px-4 font-bold text-[#810017]">{r.pointsCost || 100} điểm</td>
                  <td className="py-3 px-4 font-semibold">{r.stockQty || 50}</td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => handleDeleteReward(r)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Promo Modal */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <h3 className="font-bold text-base text-black mb-4">Thêm mới Ưu đãi Promo</h3>
            <form onSubmit={handleSavePromo} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Tiêu đề *</label>
                <input required value={formPromoTitle} onChange={(e) => setFormPromoTitle(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Mô tả *</label>
                <textarea required rows={2} value={formPromoDesc} onChange={(e) => setFormPromoDesc(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block font-bold mb-1">Mã Code</label>
                  <input value={formPromoCode} onChange={(e) => setFormPromoCode(e.target.value.toUpperCase())} className="w-full px-3 py-2 border rounded-lg font-mono" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Giảm (%)</label>
                  <input type="number" value={formPromoDiscount} onChange={(e) => setFormPromoDiscount(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Đơn tối thiểu</label>
                  <input type="number" step="0.01" value={formPromoMinOrder} onChange={(e) => setFormPromoMinOrder(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsPromoModalOpen(false)} className="px-4 py-2 border rounded-full">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-black text-white rounded-full font-bold">Lưu ưu đãi</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reward Modal */}
      {isRewardModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <h3 className="font-bold text-base text-black mb-4">Thêm mới Quà đổi điểm</h3>
            <form onSubmit={handleSaveReward} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Thương hiệu *</label>
                <input required value={formRewardBrand} onChange={(e) => setFormRewardBrand(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Tên phần quà *</label>
                <input required value={formRewardName} onChange={(e) => setFormRewardName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1">Điểm đổi (điểm thưởng)</label>
                  <input type="number" value={formRewardPoints} onChange={(e) => setFormRewardPoints(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Số lượng quà</label>
                  <input type="number" value={formRewardStock} onChange={(e) => setFormRewardStock(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsRewardModalOpen(false)} className="px-4 py-2 border rounded-full">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-black text-white rounded-full font-bold">Lưu phần quà</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
