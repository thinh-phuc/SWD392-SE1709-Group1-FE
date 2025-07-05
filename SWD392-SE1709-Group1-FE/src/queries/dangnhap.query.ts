import { BaseRequestV2 } from '@/config/axios.config';
import { useMutation } from '@tanstack/react-query';

export const useHandleLogin = () => {
  return useMutation({
    mutationKey: ['handle-login'],
    mutationFn: async (payload: any) => {
      const loginResponse = await BaseRequestV2.Post(
        'http://thinhthpse183083-001-site1.qtempurl.com/api/auth/login',
        payload
      );
      return loginResponse;
    }
  });
};
