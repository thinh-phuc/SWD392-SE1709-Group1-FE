import BaseRequest, { BaseRequestV2 } from '@/config/axios.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetListLoaiTiem = () => {
  return useQuery({
    queryKey: ['get-list-loai-tiem'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/vaccination-management/get-list-vaccination-types`
      );
      return res.data;
    }
  });
};

export const useGetThuoc = () => {
  return useQuery({
    queryKey: ['get-loai-thuoc'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/medicine-management/get-list-medicine`
      );
      return res.data.items;
    }
  });
};

export const useGetLoaiDichBenh = () => {
  return useQuery({
    queryKey: ['get-loai-dich-benh'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/disease-management/get-list-diseases`
      );
      return res.data;
    }
  });
};

export const useTaoChiTietLoTiemVacxin = () => {
  return useMutation({
    mutationKey: ['tao-chi-tiet-lo-tiem-vacxin'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Post(
        `/api/vaccination-management/create-vacination-batch-details`,
        data
      );
      return res;
    }
  });
};
export const useGetLoTiemById = (id: string) => {
  return useQuery({
    queryKey: ['get-lo-tiem-by-id', id],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/vaccination-management/get-batch-vaccinations-general-info/${id}`
      );
      return res.data;
    }
  });
};

export const useGetDanhSachVatNuoi = (id: string) => {
  return useQuery({
    queryKey: ['get-danh-sach-vat-nuoi', id],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/vaccination-management/get-batch-livestock-vaccinations-list/${id}`
      );
      return res.data;
    }
  });
};

export const useGetLiveStockInfo = () => {
  return useMutation({
    mutationKey: ['get-live-stock-info'],
    mutationFn: async (model: any) => {
      const res = await BaseRequest.Get(
        `/api/vaccination-management/get-livestock-info?inspectionCode=${model.inspectionCode}&specieType=${model.specieType}`
      );
      return res.data;
    }
  });
};

export const useGetLiveStockInfoById = () => {
  return useMutation({
    mutationKey: ['get-live-stock-info-by-id'],
    mutationFn: async (model: any) => {
      const res = await BaseRequest.Get(
        `/api/vaccination-management/get-livestock-info?livestockId=${model.id}`
      );
      return res.data;
    }
  });
};

export const useThemVatNuoiVaoLoTiem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['them-vat-nuoi-vao-lo-tiem'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Post(
        `/api/vaccination-management/add-livestock-vacination-to-vacination-batch`,
        data
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-danh-sach-vat-nuoi'],
        exact: false
      });
    }
  });
};

export const useUpdateInfoLoTiem = () => {
  return useMutation({
    mutationKey: ['update-info-lo-tiem'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Put(
        `/api/vaccination-management/update-vacination-batch-details/${data.batchVaccinationId}`,
        data
      );
      return res;
    }
  });
};

export const useXacNhanHoanThanhLoTiem = () => {
  return useMutation({
    mutationKey: ['xac-nhan-lo-tiem'],
    mutationFn: async (model: any) => {
      const res = await BaseRequestV2.Post(
        `/api/vaccination-management/complete`,
        model
      );
      return res;
    }
  });
};

export const useHuyBoToLiem = () => {
  return useMutation({
    mutationKey: ['huy-bo-lo-tiem'],
    mutationFn: async (model: any) => {
      const res = await BaseRequestV2.Post(
        `/api/vaccination-management/cancel`,
        model
      );
      return res;
    }
  });
};

export const useCancelLoTiem = () => {
  return useMutation({
    mutationKey: ['cancel-lo-tiem'],
    mutationFn: async (model: any) => {
      const res = await BaseRequestV2.Post(
        `/api/vaccination-management/cancel`,
        model
      );
      return res;
    }
  });
};

export const useThemThuoc = () => {
  return useMutation({
    mutationKey: ['them-thuoc'],
    mutationFn: async (model: any) => {
      const res = await BaseRequestV2.Post(
        `/api/vaccination-management/create-medicine`,
        model
      );
      return res;
    }
  });
};

export const useGetLoaiThuocV2 = () => {
  return useQuery({
    queryKey: ['get-loai-thuoc'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/medicine-management/get-list-medicine-type`
      );
      return res.data;
    }
  });
};

export const useDeleteVatNuoiKhoiLoTiem = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-vat-nuoi-khoi-lo-tiem'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Delete(
        `/api/vaccination-management/delete-livestock-batch-vaccination/${data.livestockVaccinationId}`
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-danh-sach-vat-nuoi'],
        exact: false
      });
    }
  });
};

export const useThemThuocV2 = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['them-thuoc'],
    mutationFn: async (model: any) => {
      const res = await BaseRequestV2.Post(
        `/api/medicine-management/create-medicine`,
        model
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-loai-thuoc'],
        exact: false
      });
    }
  });
};

export const useGetGoiThauChuaDamBaoYeuCauTiemChung = () => {
  return useQuery({
    queryKey: ['get-goi-thau-chua-dam-bao-yeu-cau-tiem-chung'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/vaccination-management/get-list-procurement-require-vaccination`
      );
      return res.data;
    }
  });
};

export const useUpdateThuoc = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-thuoc'],
    mutationFn: async (model: any) => {
      const res = await BaseRequestV2.Put(
        `/api/medicine-management/update-medicine/${model.id}`,
        model
      );
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-loai-thuoc'],
        exact: false
      });
    }
  });
};

export const useDeleteThuoc = () => {
  return useMutation({
    mutationKey: ['delete-thuoc'],
    mutationFn: async (id: string) => {
      const res = await BaseRequestV2.Delete(
        `/api/medicine-management/delete-medicine/${id}`
      );
      return res;
    }
  });
};
