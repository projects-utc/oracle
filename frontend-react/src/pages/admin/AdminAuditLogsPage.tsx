import React, { useState, useEffect } from 'react';
import { adminApi } from '../../api/adminApi';
import { AuditLog } from '../../data';
import { RefreshCw, FileText } from 'lucide-react';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    setLoading(true);
    const res = await adminApi.getAuditLogs();
    if (res.success && res.data) {
      setLogs(res.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-gray-900 tracking-tight">Nhật ký Kiểm toán Hệ thống</h1>
          <p className="text-xs text-gray-500 mt-1">Lưu trữ thời gian thực mọi thao tác đăng ký, đăng nhập, đặt đơn, chỉnh sửa sản phẩm và duyệt đơn</p>
        </div>
        <button
          onClick={fetchLogs}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
          <span>Làm mới</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Thời gian</th>
                <th className="py-3 px-4">Tài khoản</th>
                <th className="py-3 px-4">Hành động</th>
                <th className="py-3 px-4">Đối tượng</th>
                <th className="py-3 px-4">Chi tiết thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={5} className="py-12 text-center text-gray-400">Đang tải nhật ký kiểm toán...</td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={5} className="py-12 text-center text-gray-400">Chưa có bản ghi kiểm toán nào</td></tr>
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
  );
}
