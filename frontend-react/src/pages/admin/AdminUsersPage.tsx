import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { User } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { Shield, Lock, Unlock, Award } from 'lucide-react';

export default function AdminUsersPage() {
  const { currentUser, addToast } = useStore();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await adminApi.getAllUsers();
    if (res.success && res.data) {
      setUsers(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleStatus = async (user: User) => {
    if (user.id === currentUser?.id) {
      addToast('Không thể tự khóa tài khoản của chính mình', 'warn');
      return;
    }
    const nextStatus = user.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
    try {
      const res = await adminApi.updateUserStatus(user.id, nextStatus);
      if (res.success) {
        addToast(`Đã chuyển tài khoản @${user.username} sang ${nextStatus}`, 'success');
        await fetchUsers();
      } else {
        addToast(res.message || 'Lỗi cập nhật', 'error');
      }
    } catch {
      addToast('Lỗi khi thao tác tài khoản', 'error');
    }
  };

  const handleToggleRole = async (user: User) => {
    if (user.id === currentUser?.id) {
      addToast('Không thể tự thay đổi vai trò của chính mình', 'warn');
      return;
    }
    const nextRole = user.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';
    try {
      const res = await adminApi.updateUserRole(user.id, nextRole);
      if (res.success) {
        addToast(`Đã đổi vai trò @${user.username} sang ${nextRole}`, 'success');
        await fetchUsers();
      } else {
        addToast(res.message || 'Lỗi đổi vai trò', 'error');
      }
    } catch {
      addToast('Lỗi khi thao tác', 'error');
    }
  };

  const handleAdjustPoints = async (user: User) => {
    const input = window.prompt(`Nhập số điểm Beauty Insider mới cho @${user.username}:`, user.pointsBalance.toString());
    if (input === null) return;
    const pts = parseInt(input);
    if (isNaN(pts) || pts < 0) {
      addToast('Số điểm không hợp lệ', 'warn');
      return;
    }
    try {
      const res = await adminApi.updateUserPoints(user.id, pts);
      if (res.success) {
        addToast(`Đã cập nhật ${pts} điểm cho @${user.username}`, 'success');
        await fetchUsers();
      }
    } catch {
      addToast('Lỗi khi cập nhật điểm', 'error');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="border-b border-gray-200 pb-4">
        <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Người dùng & Phân quyền</h1>
        <p className="text-xs text-gray-500 mt-1">Quản lý danh sách tài khoản, khóa mở khóa và điều chỉnh hạng thẻ Beauty Insider</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Tài khoản / Họ tên</th>
                <th className="py-3 px-4">Liên hệ</th>
                <th className="py-3 px-4">Vai trò</th>
                <th className="py-3 px-4">Hạng thẻ & Điểm</th>
                <th className="py-3 px-4">Trạng thái</th>
                <th className="py-3 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="py-10 text-center text-gray-400">Đang tải danh sách người dùng...</td></tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50/80">
                    <td className="py-3 px-4">
                      <div className="font-bold text-gray-900">@{u.username}</div>
                      <div className="text-[11px] text-gray-500">{u.fullName}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      <div>{u.email || '—'}</div>
                      <div className="text-[11px] text-gray-400">{u.phone || '—'}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        u.role === 'ADMIN' ? 'bg-purple-50 text-purple-800 border-purple-200' : 'bg-gray-100 text-gray-800 border-gray-200'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-[#810017]">{u.loyaltyTier}</div>
                      <div className="text-[11px] text-emerald-700 font-semibold">{u.pointsBalance} pts</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                        u.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleAdjustPoints(u)}
                          className="p-1.5 text-amber-700 hover:bg-amber-50 rounded-lg cursor-pointer"
                          title="Sửa điểm tích luỹ"
                        >
                          <Award className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleRole(u)}
                          disabled={u.id === currentUser?.id}
                          className="p-1.5 text-purple-700 hover:bg-purple-50 rounded-lg cursor-pointer disabled:opacity-30"
                          title="Chuyển quyền ADMIN/CUSTOMER"
                        >
                          <Shield className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleToggleStatus(u)}
                          disabled={u.id === currentUser?.id}
                          className="p-1.5 text-gray-600 hover:text-black rounded-lg hover:bg-gray-100 cursor-pointer disabled:opacity-30"
                          title={u.status === 'ACTIVE' ? 'Khóa tài khoản' : 'Mở khóa tài khoản'}
                        >
                          {u.status === 'ACTIVE' ? <Lock className="w-3.5 h-3.5 text-rose-600" /> : <Unlock className="w-3.5 h-3.5 text-emerald-600" />}
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
    </div>
  );
}
