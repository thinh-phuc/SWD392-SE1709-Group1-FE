'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import { useRouter } from '@/routes/hooks';

export default function Register() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [queryError, setQueryError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setQueryError(null);
    try {
      await axios.post(
        'https://thinhthpse183083-001-site1.qtempurl.com/api/auth/register',
        form
      );
      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 1500);
    } catch (err: any) {
      setQueryError(
        err?.response?.data?.message ||
          'Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="mx-auto w-full max-w-md rounded-lg border bg-white p-8 shadow">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-semibold">Đăng ký</h1>
          <p className="text-sm text-muted-foreground">
            Tạo tài khoản mới để tiếp tục
          </p>
        </div>
        {success ? (
          <div className="text-center text-green-600">
            Đăng ký thành công! Đang chuyển hướng...
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Họ và tên</Label>
              <Input
                id="name"
                name="name"
                value={form.name}
                onChange={onChange}
                disabled={loading}
                placeholder="Nhập họ và tên"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                disabled={loading}
                placeholder="Nhập email"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Số điện thoại</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                disabled={loading}
                placeholder="Nhập số điện thoại"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Mật khẩu</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={form.password}
                onChange={onChange}
                disabled={loading}
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
            {queryError && (
              <p className="text-center text-sm text-red-500">{queryError}</p>
            )}
            <Button disabled={loading} className="w-full" type="submit">
              Đăng ký
            </Button>
          </form>
        )}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Đã có tài khoản?{' '}
          <button
            onClick={() => router.push('/login')}
            className="underline underline-offset-4 hover:text-primary"
          >
            Đăng nhập
          </button>
        </div>
      </div>
    </div>
  );
}
