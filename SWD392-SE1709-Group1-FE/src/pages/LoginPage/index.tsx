'use client';

import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import __helpers from '@/helpers';
// import { useHandleLogin } from '@/queries/dangnhap.query';
import { toast } from '@/components/ui/use-toast';
import { login } from '@/redux/auth.slice';

export default function Component() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // const { mutateAsync: login } = useHandleLogin();

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập đầy đủ email và mật khẩu',
        variant: 'destructive'
      });
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        email: email,
        password: password
      };

      const loginResponse = await axios.post(
        'http://thinhthpse183083-001-site1.qtempurl.com/api/auth/login',
        payload
      );

      console.log('Login response:', loginResponse);

      // Check if login was successful
      if (loginResponse.data && loginResponse.data.tokenString) {
        const token = loginResponse.data.tokenString;
        const userInfo = loginResponse.data.response;

        // Store token in cookie (token is already a string, no need for JSON.stringify)
        __helpers.cookie_set('AT', token);

        // Optionally store user info
        if (userInfo) {
          __helpers.cookie_set('USER_INFO', JSON.stringify(userInfo));
        }

        toast({
          title: 'Đăng nhập thành công',
          description: `Chào mừng ${userInfo?.name || email}!`
        });

        // Redirect after successful login
        window.location.href = '/student-profile';
      } else {
        throw new Error('Token không tồn tại trong response');
      }
    } catch (error: any) {
      console.error('Login error:', error);

      let errorMessage = 'Vui lòng thử lại sau';

      if (error.response) {
        // Server responded with error status
        const status = error.response.status;
        if (status === 401) {
          errorMessage = 'Email hoặc mật khẩu không chính xác';
        } else if (status === 400) {
          errorMessage = 'Thông tin đăng nhập không hợp lệ';
        } else {
          errorMessage = error.response.data?.message || 'Lỗi từ server';
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Không thể kết nối đến server';
      }

      toast({
        title: 'Đăng nhập thất bại',
        description: errorMessage,
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleLogin();
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
          //window.location.href = '/student-profile'
        }
      } catch (error: any) {
        console.error('Google callback error:', error);
        toast({
          title: 'Đăng nhập thất bại',
          description: 'Có lỗi xảy ra khi xử lý đăng nhập Google',
          variant: 'destructive'
        });
        // Redirect back to login page
        window.location.href = '/login';
      } finally {
        setIsLoading(false);
      }
    } else if (error) {
      toast({
        title: 'Đăng nhập thất bại',
        description: 'Người dùng đã hủy đăng nhập Google',
        variant: 'destructive'
      });
      // Redirect back to login page
      window.location.href = '/login';
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
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Đăng nhập</CardTitle>
          <CardDescription>
            Nhập thông tin tài khoản của bạn để đăng nhập
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text">User</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="text"
                type="text"
                placeholder="example"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
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
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="rounded border-gray-300"
              />
              <Label htmlFor="remember" className="text-sm">
                Ghi nhớ đăng nhập
              </Label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Quên mật khẩu?
            </a>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button
            className="w-full bg-blue-600 hover:bg-blue-700"
            onClick={handleLogin}
          >
            Đăng nhập
          </Button>
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
          <Button
            variant="outline"
            className="w-full"
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
            {isLoading ? 'Đang xử lý...' : 'Đăng nhập với Google'}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{' '}
            <button
              onClick={() => navigate('/')}
              className="cursor-pointer border-none bg-transparent font-medium text-blue-600 hover:underline"
            >
              Đăng ký ngay
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
