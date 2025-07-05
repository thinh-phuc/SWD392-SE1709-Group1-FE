'use client';

import type React from 'react';

import { useState } from 'react';
import { useCompletedForgotPassword } from '@/queries/auth.query';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { AlertCircle, CheckCircle2, KeyRound, Lock, Mail } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function CompleteForgotPassword() {
  const { resetToken } = useParams();
  const { mutateAsync: complete, isPending } = useCompletedForgotPassword();

  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Basic validation
    if (verificationCode.length !== 6 || !/^\d+$/.test(verificationCode)) {
      setError('Mã xác thực phải là 6 chữ số');
      return;
    }

    if (newPassword.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('Mật khẩu không khớp');
      return;
    }

    try {
      const payload = {
        resetToken,
        verificationCode,
        newPassword,
        confirmNewPassword
      };

      const [err] = await complete(payload);
      console.log(err);
      if (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Mã xác thực không hợp lệ hoặc đã hết hạn'
        );
        return;
      }
      if (!err) {
        setSuccess(true);
        return;
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Không thể đặt lại mật khẩu'
      );
    }
  };

  if (success) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <Card className="w-full max-w-md border-0 shadow-lg">
          <CardHeader className="rounded-t-lg bg-green-50">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <CardTitle className="text-green-800">
                Đặt Lại Mật Khẩu Thành Công
              </CardTitle>
            </div>
            <CardDescription className="text-green-700">
              Mật khẩu của bạn đã được đặt lại thành công.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Thành công</AlertTitle>
              <AlertDescription className="text-green-700">
                Bạn có thể đăng nhập bằng mật khẩu mới của mình.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter className="pb-6">
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => (window.location.href = '/login')}
            >
              Đến Trang Đăng Nhập
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md border-0 shadow-lg">
        <CardHeader className="rounded-t-lg bg-blue-50">
          <div className="flex items-center gap-2">
            <KeyRound className="h-6 w-6 text-blue-600" />
            <CardTitle className="text-blue-800">Đặt Lại Mật Khẩu</CardTitle>
          </div>
          <CardDescription className="text-blue-700">
            Nhập mã xác thực 6 chữ số đã được gửi đến email của bạn và tạo mật
            khẩu mới.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <Alert variant="destructive" className="border-red-300 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertTitle className="text-red-800">Lỗi</AlertTitle>
                <AlertDescription className="text-red-700">
                  <p>{error}</p>
                  <p className="mt-2 flex gap-1 text-sm text-red-500">
                    Thử lại hoặc về trang đăng nhập
                    <a href="/login" className="font-bold underline">
                      tại đây
                    </a>
                  </p>
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label
                htmlFor="verificationCode"
                className="font-medium text-gray-700"
              >
                Mã Xác Thực
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="verificationCode"
                  placeholder="Nhập mã 6 chữ số"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  className="border-gray-200 bg-gray-50 py-6 pl-10 focus:border-blue-300 focus:ring-blue-200"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">
                Mã xác thực đã được gửi đến email của bạn
              </p>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="newPassword"
                className="font-medium text-gray-700"
              >
                Mật Khẩu Mới
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="Nhập mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="border-gray-200 bg-gray-50 py-6 pl-10 focus:border-blue-300 focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="confirmNewPassword"
                className="font-medium text-gray-700"
              >
                Xác Nhận Mật Khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmNewPassword"
                  type="password"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  className="border-gray-200 bg-gray-50 py-6 pl-10 focus:border-blue-300 focus:ring-blue-200"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="mt-4 w-full bg-blue-600 py-6 transition-colors hover:bg-blue-700"
              disabled={isPending}
            >
              {isPending ? 'Đang Đặt Lại Mật Khẩu...' : 'Đặt Lại Mật Khẩu'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
