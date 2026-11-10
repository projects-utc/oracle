import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { User, AuditLog } from '../../data';
import { useStore } from '../../contexts/StoreContext';
import { formatRole, formatUserStatus } from '../../constants';
import { Shield, Lock, Unlock, Users, FileText, RefreshCw } from 'lucide-react';

export default function AdminUsersPage() {
  const { currentUser, addToast } = useStore();
  const [activeTab, setActiveTab] = useState<'users' | 'audit'>('users');

  // Users State
  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  // Audit State
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  const fetchUsers = async () => {
    setLoadingUsers(true);
    const res = await adminApi.getAllUsers();
    if (res.success && res.data) {
      setUsers(res.data);
    }
    setLoadingUsers(false);
  };

  const fetchLogs = async () => {
    setLoadingLogs(true);
    const res = await adminApi.getAuditLogs();
    if (res.success && res.data) {
      setLogs(res.data);
    }
    setLoadingLogs(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (activeTab === 'audit' && logs.length === 0) {
      fetchLogs();
    }
  }, [activeTab]);

  const handleToggleStatus = async (user: User) => {
    if (user.id === currentUser?.id) {
      addToast('Bạn không thể tự khóa tài khoản của chính mình', 'warn');
      return;
    }
    const nextStatus = user.status === 'ACTIVE' ? 'LOCKED' : 'ACTIVE';
    try {
      const res = await adminApi.updateUserStatus(user.id, nextStatus);
      if (res.success) {
        addToast(
          nextStatus === 'LOCKED'
            ? `Đã khóa tài khoản @${user.username} thành công`
            : `Đã mở khóa tài khoản @${user.username} thành công`,
          'success'
        );
        await fetchUsers();
      } else {
        addToast(res.message || 'Không thể cập nhật trạng thái', 'error');
      }
    } catch {
      addToast('Lỗi kết nối khi cập nhật tài khoản', 'error');
    }
  };

  const handleToggleRole = async (user: User) => {
    if (user.id === currentUser?.id) {
      addToast('Bạn không thể tự đổi vai trò của chính mình', 'warn');
      return;
    }
    const nextRole = user.role === 'ADMIN' ? 'CUSTOMER' : 'ADMIN';
    try {
      const res = await adminApi.updateUserRole(user.id, nextRole);
      if (res.success) {
        addToast(
          nextRole === 'ADMIN'
            ? `Đã nâng tài khoản @${user.username} lên Quản trị viên`
            : `Đã chuyển tài khoản @${user.username} về Khách hàng`,
          'success'
        );
        await fetchUsers();
      } else {
        addToast(res.message || 'Không thể thay đổi vai trò', 'error');
      }
    } catch {
      addToast('Lỗi kết nối khi thay đổi vai trò', 'error');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Tabs */}
      <div className="border-b border-gray-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Tài khoản & Kiểm toán</h1>
          <p className="text-xs text-gray-500 mt-1">
            Quản lý tài khoản người dùng, phân quyền truy cập và giám sát vết thao tác hệ thống qua Oracle Triggers
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto border border-gray-200">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'users'
                ? 'bg-white text-black shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Danh sách tài khoản ({users.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'audit'
                ? 'bg-white text-black shadow-xs'
                : 'text-gray-600 hover:text-black'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Nhật ký kiểm toán ({logs.length})</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Danh sách Tài khoản */}
      {activeTab === 'users' && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Tài khoản / Họ và tên</th>
                  <th className="py-3 px-4">Email / Số điện thoại</th>
                  <th className="py-3 px-4">Vai trò</th>
                  <th className="py-3 px-4">Trạng thái</th>
                  <th className="py-3 px-4 text-right">Tùy chọn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loadingUsers ? (
                  <tr><td colSpan={5} className="py-10 text-center text-gray-400">Đang tải danh sách tài khoản...</td></tr>
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
                          {formatRole(u.role)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          u.status === 'ACTIVE' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' : 'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {formatUserStatus(u.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleToggleRole(u)}
                            disabled={u.id === currentUser?.id}
                            className="p-1.5 text-purple-700 hover:bg-purple-50 rounded-lg cursor-pointer disabled:opacity-30"
                            title={u.role === 'ADMIN' ? 'Chuyển về Khách hàng' : 'Nâng lên Quản trị viên'}
                          >
                            <Shield className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleStatus(u)}
                            disabled={u.id === currentUser?.id}
                            className="p-1.5 text-gray-600 hover:text-black rounded-lg hover:bg-gray-100 cursor-pointer disabled:opacity-30"
                            title={u.status === 'ACTIVE' ? 'Khóa tài khoản này' : 'Mở khóa tài khoản'}
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
      )}

      {/* Tab 2: Nhật ký Kiểm toán */}
      {activeTab === 'audit' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Ghi nhận các sự kiện chỉnh sửa giá sản phẩm, đơn hàng và tài khoản từ Oracle Triggers
            </span>
            <button
              onClick={fetchLogs}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer"
            >
              <RefreshCw className={`w-3 h-3 ${loadingLogs ? 'animate-spin' : ''}`} />
              <span>Tải lại</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="py-3 px-4">Thời gian</th>
                    <th className="py-3 px-4">Tài khoản thao tác</th>
                    <th className="py-3 px-4">Hành động</th>
                    <th className="py-3 px-4">Dữ liệu tác động</th>
                    <th className="py-3 px-4">Nội dung chi tiết</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loadingLogs ? (
                    <tr><td colSpan={5} className="py-12 text-center text-gray-400">Đang tải nhật ký kiểm toán...</td></tr>
                  ) : logs.length === 0 ? (
                    <tr><td colSpan={5} className="py-12 text-center text-gray-400">Chưa có lịch sử thay đổi nào</td></tr>
                  ) : (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-gray-50/80">
                        <td className="py-3 px-4 text-gray-500 whitespace-nowrap">
                          {new Date(log.createdAt).toLocaleString('vi-VN')}
                        </td>
                        <td className="py-3 px-4 font-bold text-gray-900">
                          @{log.actorUsername}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            log.actionType.startsWith('CREATE')
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : log.actionType.startsWith('DELETE')
                              ? 'bg-rose-50 text-rose-800 border-rose-300'
                              : log.actionType.startsWith('UPDATE')
                              ? 'bg-sky-50 text-sky-800 border-sky-300'
                              : 'bg-neutral-100 text-neutral-800 border-neutral-300'
                          }`}>
                            {log.actionType}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-gray-600">{log.targetType} {log.targetId ? `#${log.targetId}` : ''}</span>
                        </td>
                        <td className="py-3 px-4 text-gray-800 font-medium">
                          {log.detailText || '—'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
