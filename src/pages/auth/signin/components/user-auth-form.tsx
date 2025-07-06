import { jwtDecode } from 'jwt-decode';
import { Button } from '@/components/ui/button';
import __helpers from '@/helpers';
import { useState } from 'react';
import { useRouter } from '@/routes/hooks';

export default function UserAuthForm() {
  const [loading, setLoading] = useState(false);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [form, setForm] = useState({ username: '', password: '' });
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setQueryError(null);
    try {
      const model = {
        email: form.username,
        password: form.password
      };
      const response = await fetch(
        'https://thinhthpse183083-001-site1.qtempurl.com/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(model)
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setQueryError(
          errorData?.message || 'Tên đăng nhập hoặc mật khẩu không đúng'
        );
        setLoading(false);
        return;
      }
      const data = await response.json();
      console.log('Fetch API response:', data);
      const token = data.tokenString;
      if (token) {
        __helpers.cookie_set('AT', token);
        const decoded: any = jwtDecode(token);
        const role = decoded?.role;
        if (role === 'User') {
          router.push('/');
        } else {
          router.push('/admin');
        }
      } else {
        setQueryError('Đăng nhập thất bại. Không nhận được token.');
      }
    } catch (err: any) {
      setQueryError('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="mx-auto w-full max-w-sm space-y-4">
      <div>
        <label className="mb-1 block">Email</label>
        <input
          type="email"
          name="username"
          value={form.username}
          onChange={onChange}
          disabled={loading}
          className="w-full rounded border px-3 py-2"
          placeholder="Nhập email..."
          required
        />
      </div>
      <div>
        <label className="mb-1 block">Mật khẩu</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={onChange}
          disabled={loading}
          className="w-full rounded border px-3 py-2"
          placeholder="Nhập mật khẩu của bạn..."
          required
        />
      </div>
      {queryError && (
        <p className="text-center text-sm text-red-500">{queryError}</p>
      )}
      <Button disabled={loading} className="w-full" type="submit">
        Đăng nhập
      </Button>
    </form>
  );
}
