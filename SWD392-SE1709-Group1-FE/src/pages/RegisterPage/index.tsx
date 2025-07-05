'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from '@/components/ui/use-toast';
import __helpers from '@/helpers';

export default function RegisterComponent() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    // Validation
    if (!username || !email || !password || !confirmPassword) {
      toast({
        title: String('Lỗi'),
        description: String('Vui lòng điền đầy đủ thông tin')
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: String('Lỗi'),
        description: String('Mật khẩu xác nhận không khớp')
      });
      return;
    }

    if (!acceptTerms) {
      toast({
        title: String('Lỗi'),
        description: String('Vui lòng đồng ý với điều khoản sử dụng')
      });
      return;
    }

    const payload = {
      name: username,
      email: email,
      password: password
    };

    try {
      const registerResponse = await axios.post(
        'http://thinhthpse183083-001-site1.qtempurl.com/api/auth/register',
        payload
      );

      console.log(registerResponse);

      toast({
        title: 'Đăng ký thành công',
        description: 'Tài khoản của bạn đã được tạo thành công'
      });

      // Redirect to login page or auto login
      window.location.href = '/login';
    } catch (error: any) {
      console.error('Registration error:', error);

      let errorMessage = 'Vui lòng thử lại sau';

      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast({
        title: 'Đăng ký thất bại',
        description: errorMessage
      });
    }
  };

  const handleGoogleLogin = () => {
    // Chuyển hướng trực tiếp đến Google OAuth endpoint
    const googleAuthUrl =
      'https://thinhthpse183083-001-site1.qtempurl.com/api/auth/google-signin';
    window.location.href = googleAuthUrl;
  };

  // Function để xử lý Google OAuth callback
  const handleGoogleCallback = async () => {
    // Kiểm tra xem có phải đang ở trang callback không
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (code) {
      setIsLoading(true);
      try {
        // Gọi API để exchange code lấy token
        const response = await axios.get(
          `https://thinhthpse183083-001-site1.qtempurl.com/api/auth/google-response?code=${code}`
        );

        if (response.data && response.data.tokenString) {
          const token = response.data.tokenString;
          const userInfo = response.data.response;

          // Store token in cookie
          __helpers.cookie_set('AT', token);

          // Store user info
          if (userInfo) {
            __helpers.cookie_set('USER_INFO', JSON.stringify(userInfo));
          }

          toast({
            title: 'Đăng nhập thành công',
            description: `Chào mừng ${userInfo?.name || 'Google User'}!`
          });

          // Redirect to chat page
          window.location.href = '/student-profile';
        }
      } catch (error: any) {
        console.error('Google callback error:', error);
        toast({
          title: 'Đăng nhập thất bại',
          description: 'Có lỗi xảy ra khi xử lý đăng nhập Google',
          variant: 'destructive'
        });
        // Redirect back to register page
        window.location.href = '/register';
      } finally {
        setIsLoading(false);
      }
    } else if (error) {
      toast({
        title: 'Đăng nhập thất bại',
        description: 'Người dùng đã hủy đăng nhập Google',
        variant: 'destructive'
      });
      // Redirect back to register page
      window.location.href = '/register';
    }
  };

  // Kiểm tra và xử lý Google callback khi component mount
  useEffect(() => {
    // Chỉ xử lý callback nếu có code hoặc error trong URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (code || error) {
      handleGoogleCallback();
    }
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Đăng ký</h1>
            <p className="text-sm text-muted-foreground">
              Tạo tài khoản mới để bắt đầu sử dụng dịch vụ
            </p>
          </div>

          {/* Registration form */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Tên người dùng</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Nhập tên người dùng"
                  value={username}
                  onChange={(e) => setUsername(e.target.value || '')}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value || '')}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value || '')}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value || '')}
                  className="pl-10 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 h-4 w-4 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(Boolean(e.target.checked))}
                className="rounded border-gray-300"
              />
              <Label htmlFor="terms" className="text-sm">
                Tôi đồng ý với{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  điều khoản sử dụng
                </a>{' '}
                và{' '}
                <a href="#" className="text-blue-600 hover:underline">
                  chính sách bảo mật
                </a>
              </Label>
            </div>

            <Button
              className="w-full bg-blue-600 hover:bg-blue-700"
              onClick={handleRegister}
            >
              Đăng ký
            </Button>
          </div>

          {/* Separator */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Hoặc
              </span>
            </div>
          </div>

          {/* Social login */}
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={handleGoogleLogin}
            disabled={isLoading}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            {isLoading ? 'Đang xử lý...' : 'Đăng ký với Google'}
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Đã có tài khoản?{' '}
            <a
              href="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Đăng nhập ngay
            </a>
          </div>

          <p className="text-center text-sm text-muted-foreground">
            Bằng cách tiếp tục, bạn đồng ý với{' '}
            <a className="underline underline-offset-4 hover:text-primary">
              điều khoản dịch vụ
            </a>{' '}
            và{' '}
            <a className="underline underline-offset-4 hover:text-primary">
              chính sách bảo mật của chúng tôi
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
