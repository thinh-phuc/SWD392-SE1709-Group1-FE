import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import __helpers from '@/helpers';
import { useLogin } from '@/queries/auth.query';
import { useGetMyInfo } from '@/queries/user.query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
const formSchema = z.object({
  name: z.string().min(2, { message: 'Tên đăng nhập phải có ít nhất 2 ký tự' }),
  password: z.string().min(2, { message: 'Mật khẩu phải có ít nhất 2 ký tự' })
});

type UserFormValue = z.infer<typeof formSchema>;

export default function UserAuthForm() {
  const [loading, setLoading] = useState(false);
  const { mutateAsync: login } = useLogin();
  const [queryError, setQueryError] = useState<string | null>(null);
  const defaultValues = {
    name: '',
    password: ''
  };
  const { data: dataInfoUser, refetch } = useGetMyInfo();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get('error');
    if (error) {
      setQueryError(decodeURIComponent(error));
    }
  }, []);

  const form = useForm<UserFormValue>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  useEffect(() => {
    if (dataInfoUser) {
      console.log(dataInfoUser);
      window.location.href = '/dashboard';
    }
  }, [dataInfoUser]);

  const onSubmit = async (data: UserFormValue) => {
    setLoading(true);
    try {
      const model = {
        name: data.name,
        password: data.password
      };
      const res = await login(model);
      console.log(res);
      if (res) {
        const token = res.data;
        __helpers.cookie_set('AT', token);
        refetch();
        // window.location.href = '/';
      }
    } catch (err: any) {
      form.setError('password', {
        type: 'manual',
        message: err?.data?.message || 'Tên đăng nhập hoặc mật khẩu không đúng'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        {/* Username Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên đăng nhập</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Nhập tên đăng nhập..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Password Field */}
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nhập mật khẩu của bạn..."
                  disabled={loading}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {queryError && (
          <p className="text-center text-sm text-red-500">{queryError}</p>
        )}

        <Button disabled={loading} className="ml-auto w-full" type="submit">
          Đăng nhập
        </Button>
      </form>
    </Form>
  );
}
