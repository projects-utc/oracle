import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import { SephoraLogo } from '../../components/sephora/icons';

export default function LoginPage() {
  const { login, addToast } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('guest.demo');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fillAccount = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
    setErrorMsg('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await login(username.trim(), password);
      if (res.success && res.user) {
        if (res.user.role === 'ADMIN') {
          navigate('/admin');
        } else {
          const from = new URLSearchParams(location.search).get('from') || '/';
          navigate(from);
        }
      } else {
        setErrorMsg(res.message || 'Tài khoản hoặc mật khẩu không chính xác');
      }
    } catch {
      setErrorMsg('Không thể kết nối đến máy chủ backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-gray-50 font-sans">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 shadow-xl">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-3">
            <SephoraLogo className="h-5 w-auto mx-auto text-black" />
          </Link>
          <h1 className="text-xl font-extrabold text-black tracking-tight">Đăng nhập tài khoản</h1>
          <p className="text-xs text-gray-500 mt-1">Trải nghiệm mua sắm cá nhân hóa & tích điểm Beauty Insider</p>
        </div>

        {/* 1-Click Demo Pills */}
        <div className="mb-6 p-3 bg-neutral-50 rounded-xl border border-gray-200">
          <div className="text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-2">Tài khoản thử nghiệm:</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => fillAccount('guest.demo', '123')}
              className="p-2 rounded-lg border border-gray-300 hover:border-black bg-white font-semibold text-left transition-all"
            >
              <div className="text-black font-bold">Khách hàng VIP</div>
              <div className="text-[10px] text-gray-500 font-mono">guest.demo / 123</div>
            </button>
            <button
              type="button"
              onClick={() => fillAccount('admin', '123')}
              className="p-2 rounded-lg border border-gray-300 hover:border-black bg-white font-semibold text-left transition-all"
            >
              <div className="text-[#810017] font-bold">Quản trị viên</div>
              <div className="text-[10px] text-gray-500 font-mono">admin / 123</div>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Tên đăng nhập</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black outline-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Mật khẩu</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black outline-none text-sm"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50"
          >
            {loading ? 'Đang xác thực...' : 'Đăng nhập'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500 border-t border-gray-100 pt-4">
          Chưa có tài khoản?{' '}
          <Link to="/register" className="font-bold text-black underline">
            Đăng ký ngay (nhận 100 điểm thưởng)
          </Link>
        </div>
      </div>
    </div>
  );
}
