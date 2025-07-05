'use client';

import { useState } from 'react';
import UserAuthForm from './components/user-auth-form';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import Bg from '@/assets/bg.jpg';
import { Separator } from '@/components/ui/separator';
import { useInitForgotPassword } from '@/queries/auth.query';
import ForgotPasswordForm from './components/forgot-password-form';

export default function SignInPage() {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleLoginGoogle = () => {
    const a = document.createElement('a');
    const url =
      process.env.NODE_ENV === 'production'
        ? 'https://api.hoptacxaluavang.site'
        : 'https://api.hoptacxaluavang.site';
    a.href = `${url}/api/auth/google-login`;
    a.target = '_self';
    a.click();
  };

  const { mutateAsync: initForgotPassword } = useInitForgotPassword();

  const handleForgotPassword = async (email: string) => {
    const [err, data] = await initForgotPassword({ contactInfo: email });
    console.log('data', data);
    if (!err && data) {
      const { resetToken } = data.data;
      window.location.href = `${window.location.origin}/auth/forgot-password/${resetToken}`;
    }
  };

  return (
    <div className="relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute right-4 top-4 hidden md:right-8 md:top-8'
        )}
      >
        Login
      </Link>

      {/* Left column with background image */}
      <div className="relative hidden h-full flex-col bg-muted p-10 dark:border-r lg:flex">
        <div
          className="absolute inset-0 bg-secondary"
          style={{
            backgroundImage: `url(${Bg})`,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center'
          }}
        ></div>

        <div className="relative z-20 flex items-center text-lg font-medium text-current">
          LiveStock
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg text-current">
              Hệ thống quản trị - LiveStock
            </p>
          </blockquote>
        </div>
      </div>

      {/* Right column with login form */}
      <div className="flex h-full items-center justify-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          {!showForgotPassword && (
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Đăng nhập
              </h1>
              <p className="text-sm text-muted-foreground">
                Nhập tài khoản của bạn để tiếp tục
              </p>
            </div>
          )}

          {showForgotPassword ? (
            <ForgotPasswordForm
              onSubmit={handleForgotPassword}
              onCancel={() => setShowForgotPassword(false)}
            />
          ) : (
            <>
              {/* Main login form */}
              <UserAuthForm />

              {/* Forgot password link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-sm text-muted-foreground underline underline-offset-4 hover:text-primary"
                >
                  Quên mật khẩu?
                </button>
              </div>

              {/* Separator */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Hoặc tiếp tục với
                  </span>
                </div>
              </div>

              {/* Social login */}
              <Button
                variant="outline"
                type="button"
                className="w-full"
                onClick={() => {
                  handleLoginGoogle();
                }}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
              </Button>
            </>
          )}

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
