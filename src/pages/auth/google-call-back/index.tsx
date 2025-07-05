import __helpers from '@/helpers';
import { useRouter } from '@/routes/hooks';
import { useEffect } from 'react';

const GoogleCallback = () => {
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      __helpers.cookie_set('AT', token);

      router.push('/dashboard');
    } else {
    }
  }, []);

  return <div>Đang xử lý đăng nhập...</div>;
};

export default GoogleCallback;
