import { BaseRequestV2 } from '@/config/axios.config';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const usseCreateSpecie = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['them-vat-nuoi'],
    mutationFn: async (model: any) => {
      const res = await BaseRequestV2.Post(
        `/api/specie-mangament/create`,
        model
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-specie'],
        exact: false
      });
    }
  });
};

export const useSetSpeciedDead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['set-vat-nuoi-chet'],
    mutationFn: async (model: any) => {
      const res = await BaseRequestV2.Put(
        `/api/specie-mangament/set-dead`,
        model
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-specie'],
        exact: false
      });
    }
  });
};
