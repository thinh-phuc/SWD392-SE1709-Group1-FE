import BaseRequest, { BaseRequestV2 } from '@/config/axios.config';
import __helpers from '@/helpers';
import { setInfoUser } from '@/redux/auth.slice';
import { RootState } from '@/redux/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const useGetAllUser = (keyword) => {
  return useQuery({
    queryKey: ['get-all-user', keyword],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('searchTerm', keyword);
      return await BaseRequest.Get(
        `/api/user-management/users?${params.toString()}`
      );
    }
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (model: any) => {
      return await BaseRequestV2.Put(
        `/api/user-management/users/${model.id}`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-user']
      });
    }
  });
};

export const useUpdateLockUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-lock-user'],
    mutationFn: async (model: any) => {
      console.log(model);
      return await axios.put(
        `/api/user-management/users/${model.id}/block`,
        !model.status,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-user']
      });
    }
  });
};

export const useGetMyInfo = () => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ['get-my-info'],
    queryFn: async () => {
      const res = await BaseRequest.Get(`/api/user/my-profile`);
      dispatch(setInfoUser(res.data));
      return res.data;
    },
    enabled: !!__helpers.cookie_get('AT')
  });
};

export const useGetMyInfoOnce = () => {
  const dispatch = useDispatch();
  const infoUser = useSelector((state: RootState) => state.auth.infoUser);
  const hasToken = !!__helpers.cookie_get('AT');

  return useQuery({
    queryKey: ['get-my-info'],
    queryFn: async () => {
      const res = await BaseRequest.Get(`/api/user/my-profile`);
      dispatch(setInfoUser(res.data));
      return res.data;
    },
    enabled: hasToken && !infoUser,
    staleTime: Infinity
  });
};
