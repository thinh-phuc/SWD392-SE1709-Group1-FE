import BaseRequest from '@/config/axios.config';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useGetListLoNhap = () => {
  return useQuery({
    queryKey: ['get-list-lo-nhap'],
    queryFn: async () => {
      return await BaseRequest.Get(
        `/api/import-management/get-list-import-batches`
      );
    }
  });
};

export const useGetLoNhapById = (id: string) => {
  return useQuery({
    queryKey: ['get-lo-nhap-by-id', id],
    queryFn: async () => {
      var res = await BaseRequest.Get(
        `/api/import-management/get-import-batch-details/${id}`
      );
      return res.data;
    }
  });
};

export const useGetTraiNhap = () => {
  return useQuery({
    queryKey: ['get-trai-nhap'],
    queryFn: async () => {
      var res = await BaseRequest.Get(`/api/barn/get-list-barns`);
      return res?.data?.items;
    }
  });
};

export const useUpdateLoNhap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (model: any) => {
      return await BaseRequest.Put(
        `/api/import-management/update-batch-import/${model.id}`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-list-lo-nhap']
      });
    }
  });
};

export const useUpdateSuccessLoNhap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(`/api/import-management/success`, model);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-list-lo-nhap']
      });
    }
  });
};
export const useUpdateCancelLoNhap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(`/api/import-management/cancel`, model);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-list-lo-nhap']
      });
    }
  });
};

export const useCreateLoNhap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(
        `/api/import-management/create-batch-import`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-list-lo-nhap']
      });
    }
  });
};
