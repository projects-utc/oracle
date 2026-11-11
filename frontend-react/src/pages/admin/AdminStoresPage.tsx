import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { StoreLocation } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { Plus, Edit2, Trash2 } from 'lucide-react';

export default function AdminStoresPage() {
  const { addToast } = useStore();
  const [activeTab, setActiveTab] = useState<'STORES' | 'SUBS'>('STORES');
  const [stores, setStores] = useState<StoreLocation[]>([]);
  const [subs, setSubs] = useState<Array<{ id: number; channelType: string; contactValue: string; createdAt: string }>>([]);
  const [loading, setLoading] = useState(true);

  // Store Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<StoreLocation | null>(null);
  const [formName, setFormName] = useState('Sephora Landmark 81');
  const [formAddress, setFormAddress] = useState('720A Điện Biên Phủ, Bình Thạnh');
  const [formCity, setFormCity] = useState('TP.HCM');
  const [formZip, setFormZip] = useState('70000');
  const [formDistance, setFormDistance] = useState('1.2 km');

  const openCreateStore = () => {
    setEditingStore(null);
    setFormName('Sephora Landmark 81');
    setFormAddress('720A Điện Biên Phủ, Bình Thạnh');
    setFormCity('TP.HCM');
    setFormZip('70000');
    setFormDistance('1.2 km');
    setIsModalOpen(true);
  };

  const openEditStore = (s: StoreLocation) => {
    setEditingStore(s);
    setFormName(s.name);
    setFormAddress(s.address);
    setFormCity(s.city);
    setFormZip(s.zipCode);
    setFormDistance(s.distance || s.distanceLabel || '1.2 km');
    setIsModalOpen(true);
  };

  const fetchData = async () => {
    setLoading(true);
    const resS = await adminApi.getAllStores();
    if (resS.success && resS.data) setStores(resS.data);
    const resSub = await adminApi.getSubscriptions();
    if (resSub.success && resSub.data) setSubs(resSub.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveStore = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        name: formName.trim(),
        address: formAddress.trim(),
        city: formCity.trim(),
        state: 'VN',
        stateCode: 'VN',
        zipCode: formZip.trim(),
        distance: formDistance.trim(),
        distanceLabel: formDistance.trim(),
        hours: 'Mở cửa đến 22:00',
        hoursLabel: 'Mở cửa đến 22:00',
      };

      if (editingStore) {
        const res = await adminApi.updateStore(editingStore.id, payload);
        if (res.success) {
          addToast('Cập nhật cửa hàng thành công!', 'success');
          setIsModalOpen(false);
          await fetchData();
        } else {
          addToast(res.message || 'Không thể cập nhật cửa hàng', 'error');
        }
      } else {
        const res = await adminApi.createStore(payload);
        if (res.success) {
          addToast('Thêm mới cửa hàng thành công!', 'success');
          setIsModalOpen(false);
          await fetchData();
        } else {
          addToast(res.message || 'Không thể tạo cửa hàng', 'error');
        }
      }
    } catch {
      addToast('Không thể lưu cửa hàng', 'error');
    }
  };

  const handleDeleteStore = async (s: StoreLocation) => {
    if (!window.confirm(`Xóa cửa hàng "${s.name}"?`)) return;
    await adminApi.deleteStore(s.id);
    addToast('Đã xóa cửa hàng', 'info');
    await fetchData();
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Cửa hàng & Đăng ký SMS/Email</h1>
          <p className="text-xs text-gray-500 mt-1">Quản lý mạng lưới chi nhánh vật lý và tệp khách hàng đăng ký tiếp thị</p>
        </div>

        {activeTab === 'STORES' && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 bg-[#810017] hover:bg-[#6b0013] text-white font-bold text-xs px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Cửa hàng</span>
          </button>
        )}
      </div>

      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('STORES')}
          className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-all cursor-pointer ${
            activeTab === 'STORES' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Hệ thống Cửa hàng ({stores.length})
        </button>
        <button
          onClick={() => setActiveTab('SUBS')}
          className={`px-4 py-2.5 font-bold text-xs border-b-2 transition-all cursor-pointer ${
            activeTab === 'SUBS' ? 'border-black text-black' : 'border-transparent text-gray-500 hover:text-black'
          }`}
        >
          Danh sách Nhận tin Email/SMS ({subs.length})
        </button>
      </div>

      {activeTab === 'STORES' ? (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Tên cửa hàng</th>
                <th className="py-3 px-4">Địa chỉ</th>
                <th className="py-3 px-4">Khu vực / ZIP</th>
                <th className="py-3 px-4">Giờ mở cửa</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="py-10 text-center text-gray-400">Đang tải...</td></tr>
              ) : stores.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 font-bold text-gray-900">{s.name}</td>
                  <td className="py-3 px-4 text-gray-700">{s.address}</td>
                  <td className="py-3 px-4 text-gray-600">{s.city}, {s.state} {s.zipCode}</td>
                  <td className="py-3 px-4 font-semibold text-emerald-700">{s.hours}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => openEditStore(s)} className="p-1.5 text-gray-500 hover:text-black rounded-lg hover:bg-gray-100 cursor-pointer" title="Sửa cửa hàng">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDeleteStore(s)} className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg cursor-pointer" title="Xóa cửa hàng">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
                <th className="py-3 px-4">Kênh đăng ký</th>
                <th className="py-3 px-4">Thông tin liên hệ</th>
                <th className="py-3 px-4">Thời gian đăng ký</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {subs.length === 0 ? (
                <tr><td colSpan={3} className="py-10 text-center text-gray-400">Chưa có người dùng đăng ký nhận tin</td></tr>
              ) : subs.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      sub.channelType === 'EMAIL' ? 'bg-sky-50 text-sky-800' : 'bg-emerald-50 text-emerald-800'
                    }`}>
                      {sub.channelType}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-gray-900">{sub.contactValue}</td>
                  <td className="py-3 px-4 text-gray-500">{new Date(sub.createdAt).toLocaleString('vi-VN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Store Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <h3 className="font-bold text-base text-black mb-4">
              {editingStore ? `Chỉnh sửa cửa hàng: ${editingStore.name}` : 'Thêm mới Cửa hàng vật lý'}
            </h3>
            <form onSubmit={handleSaveStore} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold mb-1">Tên cửa hàng *</label>
                <input required value={formName} onChange={(e) => setFormName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div>
                <label className="block font-bold mb-1">Địa chỉ *</label>
                <input required value={formAddress} onChange={(e) => setFormAddress(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold mb-1">Thành phố *</label>
                  <input required value={formCity} onChange={(e) => setFormCity(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                </div>
                <div>
                  <label className="block font-bold mb-1">Mã ZIP *</label>
                  <input required value={formZip} onChange={(e) => setFormZip(e.target.value)} className="w-full px-3 py-2 border rounded-lg" />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-full">Hủy</button>
                <button type="submit" className="px-5 py-2 bg-black text-white rounded-full font-bold">Lưu cửa hàng</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
