import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../contexts/StoreContext';
import { SephoraLogo } from '../../components/sephora/icons';

export default function RegisterPage() {
  const { register } = useStore();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const res = await register({
        username: username.trim(),
        password,
        fullName: fullName.trim(),
        email: email.trim() || undefined,
        phone: phone.trim() || undefined,
      });

      if (res.success) {
        navigate('/');
      } else {
        setErrorMsg(res.message || 'Đăng ký không thành công');
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
          <h1 className="text-xl font-extrabold text-black tracking-tight">Tạo tài khoản Beauty Insider</h1>
          <p className="text-xs text-gray-500 mt-1">Gia nhập cộng đồng làm đẹp & nhận ngay 100 điểm thưởng chào mừng</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Tên đăng nhập *</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black outline-none text-sm"
              placeholder="Ví dụ: mybeauty2026"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Họ và tên *</label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black outline-none text-sm"
              placeholder="Nguyễn Thị Hoàng Yến"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Mật khẩu *</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black outline-none text-sm"
              placeholder="Tối thiểu 3 ký tự"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black outline-none text-sm"
              placeholder="ten@gmail.com"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">Số điện thoại</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:border-black outline-none text-sm"
              placeholder="0912345678"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-full text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer disabled:opacity-50 mt-2"
          >
            {loading ? 'Đang tạo tài khoản...' : 'Đăng ký tài khoản'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-500 border-t border-gray-100 pt-4">
          Đã có tài khoản?{' '}
          <Link to="/login" className="font-bold text-black underline">
            Đăng nhập ngay
          </Link>
        </div>
      </div>
    </div>
  );
}
