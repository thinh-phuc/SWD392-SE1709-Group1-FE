import BaseRequest, { BaseRequestV2 } from '@/config/axios.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetListMuaLe = () => {
  return useQuery({
    queryKey: ['get-list-orders'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/order-management/get-list-orders`
      );
      return res.data;
    }
  });
};

export const useGetListLoaiVat = () => {
  return useQuery({
    queryKey: ['get-list-loai-vat'],
    queryFn: async () => {
      const res = await BaseRequest.Get(`/api/specie-mangament/get-all`);
      return res.data;
    }
  });
};

export const useGetListDanhSachBenh = () => {
  return useQuery({
    queryKey: ['get-list-danh-sach-benh'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/disease-management/get-list-diseases`
      );
      return res.data;
    }
  });
};

export const useCreateDonMuaLe = () => {
  return useMutation({
    mutationKey: ['create-don-mua-le'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Post(
        `/api/order-management/create-order`,
        data
      );
      return res;
    }
  });
};

export const useGetChiTietDonMuaLe = (id: any) => {
  return useQuery({
    queryKey: ['get-list-orders'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/order-management/get-order-details-info/${id}`
      );
      return res.data;
    }
  });
};

export const useUpdateStatusDonMuaLe = () => {
  return useMutation({
    mutationKey: ['update-status-don-mua-le'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Post(
        `/api/order-management/update-order-status`,
        data
      );
      return res;
    }
  });
};

export const useCancelDonMuaLe = () => {
  return useMutation({
    mutationKey: ['cancel-don-mua-le'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Post(
        `/api/order-management/cancel-order/${data.id}?requestedBy=${data.requestBy}`
      );
      return res;
    }
  });
};
export const useCompleteDonMuaLe = () => {
  return useMutation({
    mutationKey: ['complete-don-mua-le'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Post(
        `/api/order-management/complete-order/${data.id}?requestedBy=${data.requestBy}`
      );
      return res;
    }
  });
};

export const useGetListVatNuoiDonMuaLe = (id: any) => {
  return useQuery({
    queryKey: ['get-list-orders', id],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/order-management/get-list-order-livestock-details/${id}`
      );
      return res.data;
    }
  });
};

export const useDeleteStockFromOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-stock-from-order'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Delete(
        `/api/order-management/delete-livestock-from-order/${data}`
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-list-orders'],
        exact: false
      });
    }
  });
};

export const useTaoBaoCaoDonMuaLe = () => {
  return useMutation({
    mutationKey: ['tao-bao-cao-don-mua-le'],
    mutationFn: async (id) => {
      const res = await BaseRequestV2.Post(
        `/api/order-management/request-export/${id}`
      );
      return res;
    }
  });
};

export const useDownloadDonMuaLeTemplate = () => {
  return useMutation({
    mutationKey: ['download-don-mua-le-template'],
    mutationFn: async (id: any) => {
      const res = await BaseRequestV2.Get(
        `/api/order-management/template-to-choose-livestock/${id}`
      );
      return res;
    }
  });
};

export const useUploadDonMuaLeTemplate = () => {
  return useMutation({
    mutationKey: ['upload-don-mua-le-template'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Post(
        `/api/order-management/upload-template-to-choose-livestock`,
        data
      );
      return res;
    }
  });
};
