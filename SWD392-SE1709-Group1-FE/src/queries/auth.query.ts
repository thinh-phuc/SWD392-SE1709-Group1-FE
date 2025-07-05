import BaseRequest, { BaseRequestV2 } from '@/config/axios.config';
import { useMutation } from '@tanstack/react-query';
import __helpers from '@/helpers/index';

export const useLogin = () => {
  return useMutation({
    mutationKey: ['login'],
    mutationFn: async (model: any) => {
      return BaseRequest.Post(`/api/auth/login`, model);
    }
  });
};

export const useLoginGoogle = () => {
  return useMutation({
    mutationKey: ['login-google'],
    mutationFn: async () => {
      return BaseRequest.Get(`/api/auth/google-login`);
    }
  });
};
export const useInitForgotPassword = () => {
  return useMutation({
    mutationKey: ['init-forgot-password'],
    mutationFn: async (model: any) => {
      return BaseRequestV2.Post(`/api/auth/forgot-password/initiate`, model);
    }
  });
};

export const useCompletedForgotPassword = () => {
  return useMutation({
    mutationKey: ['completed-password'],
    mutationFn: async (model: any) => {
      return BaseRequestV2.Post(`/api/auth/forgot-password/complete`, model);
    }
  });
};

export const useInitChangePassword = () => {
  return useMutation({
    mutationKey: ['init-change-password'],
    mutationFn: async (model: any) => {
      return BaseRequestV2.Post(`/api/user/change-password/initiate`, model);
    }
  });
};

export const useCompletedChangePassword = () => {
  return useMutation({
    mutationKey: ['completed-change-password'],
    mutationFn: async (model: any) => {
      return BaseRequestV2.Post(`/api/user/change-password/complete`, model);
    }
  });
};
