import BaseRequest, { BaseRequestV2 } from '@/config/axios.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetLoaiBenh = () => {
  return useQuery({
    queryKey: ['get-list-diseases'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/disease-management/get-list-diseases`
      );
      return res.data;
    }
  });
};

export const useCreateBenh = () => {
  return useMutation({
    mutationKey: ['create-disease'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Post(
        `/api/disease-management/create`,
        data
      );
      return res;
    }
  });
};

export const useGetListLoaiBenhType = () => {
  return useQuery({
    queryKey: ['get-list-loai-benh-type'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/disease-management/get-list-disease-type`
      );
      return res.data;
    }
  });
};

export const useUpdateBenh = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-disease'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Put(
        `/api/disease-management/update-diseases/${data.id}`,
        data
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-list-diseases'] });
    }
  });
};

export const useDeleteBenh = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-disease'],
    mutationFn: async (id: string) => {
      const res = await BaseRequestV2.Delete(
        `/api/disease-management/delete-disease/${id}`
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['get-list-diseases'] });
    }
  });
};
