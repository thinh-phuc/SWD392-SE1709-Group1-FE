import BaseRequest, { BaseRequestV2 } from '@/config/axios.config';
import __helpers from '@/helpers';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export const useGetAllCategory = () => {
  return useQuery({
    queryKey: ['get-all-category'],
    queryFn: async () => {
      return await BaseRequest.Get(`/api/categories`);
    }
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-category'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(`/api/categories`, model);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-category']
      });
    }
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-category'],
    mutationFn: async (id: string) => {
      return await BaseRequest.Delete(`/api/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-category']
      });
    }
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-category'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Put(
        `/api/categories/${model.category_code}`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-all-category']
      });
    }
  });
};

export const useGetAllProduct = () => {
  return useQuery({
    queryKey: ['get-all-product'],
    queryFn: async () => {
      return await BaseRequest.Get(`/api/products`);
    }
  });
};

export const useGetGoiThau = (keyword) => {
  return useQuery({
    queryKey: ['get-goi-thau', keyword],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('keyword', keyword);
      return await BaseRequest.Get(
        `api/procurement-management/get-list?${params.toString()}`
      );
    }
  });
};

export const useGetSpecie = () => {
  return useQuery({
    queryKey: ['get-specie'],
    queryFn: async () => {
      return await BaseRequest.Get(`/api/specie-mangament/get-all`);
    }
  });
};
export const useGetSpecieType = () => {
  return useQuery({
    queryKey: ['get-specie-type'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/specie-mangament/get-list-specie-type`
      );
      return res.data;
    }
  });
};

export const useGetSpeciceName = (id: string) => {
  return useQuery({
    queryKey: ['get-specie-name', id],
    queryFn: async () => {
      var res = await BaseRequest.Get(
        `/api/specie-mangament/get-list-specie-name/${id}`
      );
      return res.data;
    }
  });
};

export const useCreateGoiThau = () => {
  return useMutation({
    mutationKey: ['create-goi-thau'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(`api/procurement-management/create`, model);
    }
  });
};

export const useGetThongTinGoiThau = (id: string) => {
  return useQuery({
    queryKey: ['get-thong-tin-goi-thau', id],
    queryFn: async () => {
      return await BaseRequest.Get(
        `/api/procurement-management/general-info/${id}`
      );
    }
  });
};

export const useGetDanhSachKhachHangGoiThau = (id: string) => {
  return useQuery({
    queryKey: ['get-danh-sach-khach-hang-goi-thau', id],
    queryFn: async () => {
      return await BaseRequest.Post(
        `/api/export-management/get-list-customers/${id}`,
        {}
      );
    }
  });
};

export const useChinhSuaGoiThau = () => {
  return useMutation({
    mutationKey: ['chinh-sua-goi-thau'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(`api/procurement-management/update`, model);
    }
  });
};

export const useUploadExcelKhachHang = () => {};

export const useGetListVatNuoiKhachHang = (id) => {
  return useQuery({
    queryKey: ['get-list-vat-nuoi-khach-hang'],
    queryFn: async () => {
      return await BaseRequest.Get(
        `/api/procurement-management/list-export-details/${id}`
      );
    }
  });
};

export const useGetBatchVaccinList = (keyword) => {
  return useQuery({
    queryKey: ['get-batch-vaccin-list', keyword],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append('keyword', keyword);
      return await BaseRequest.Get(
        `/api/vaccination-management/get-batch-vaccinations-list?${params.toString()}`
      );
    }
  });
};

export const useGetNguoiThucHien = () => {
  return useMutation({
    mutationKey: ['get-nguoi-thuc-hien'],
    mutationFn: async (dateTime: any) => {
      return await BaseRequest.Get(
        `/api/vaccination-management/get-list-conductor?dateSchedule=${dateTime}`
      );
    }
  });
};

export const useGetListLoTiemNhacLai = () => {
  return useQuery({
    queryKey: ['get-list-lo-tiem-nhac-lai'],
    queryFn: async () => {
      var data = await BaseRequest.Get(
        `/api/vaccination-management/get-list-suggest-re-vaccination`
      );
      return data.data;
    }
  });
};

export const useGetListLoTiemSapToi = () => {
  return useQuery({
    queryKey: ['get-list-lo-tiem-sap-toi'],
    queryFn: async () => {
      var res = await BaseRequest.Get(
        `/api/vaccination-management/get-list-future-vaccination`
      );
      return res.data;
    }
  });
};

export const useAddLiveStockToBatch = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['add-live-stock-to-batch'],
    mutationFn: async (model: any) => {
      return await BaseRequestV2.Put(
        `/api/import-management/add-livestock-to-batchimport/${model.id}`,
        model.item
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-list-lo-tiem-sap-toi']
      });
    }
  });
};

export const useGetThuocTheoLoaiBenh = (id: string) => {
  return useQuery({
    queryKey: ['get-thuoc-theo-loai-benh', id],
    queryFn: async () => {
      const data = await BaseRequest.Get(
        `/api/medicine-management/get-list-medicine-by-disease/${id}`
      );
      return data.data;
    }
  });
};

export const useDeleteVatNuoiLoNhap = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-vat-nuoi-lo-nhap'],
    mutationFn: async (id: any) => {
      return await BaseRequestV2.Delete(
        `/api/import-management/delete-livestock-from-batch-import/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-lo-nhap-by-id'],
        exact: false
      });
    }
  });
};

export const useDanhDauVatNuoIDaChet = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['danh-dau-vat-nuoi-da-chet'],
    mutationFn: async (model: any) => {
      const userId = __helpers.getUserId();
      console.log(model);
      return await BaseRequestV2.Put(
        `/api/import-management/set-livestock-dead/${model}?requestedBy=${userId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-lo-nhap-by-id'],
        exact: false
      });
    }
  });
};

export const useGetLiveStockManagementDashboard = () => {
  return useQuery({
    queryKey: ['get-live-stock-management-dashboard'],
    queryFn: async () => {
      var data = await BaseRequest.Get(`/api/livestock-management/dashboard`);
      return data.data;
    }
  });
};

export const useGetListLiveStockSumary = () => {
  return useQuery({
    queryKey: ['get-list-live-stock-sumary'],
    queryFn: async () => {
      var data = await BaseRequest.Get(
        `/api/livestock-management/get-list-livestocks-summary`
      );
      return data.data;
    }
  });
};

export const useGetAllLiveStock = () => {
  return useQuery({
    queryKey: ['get-all-live-stock'],
    queryFn: async () => {
      var data = await BaseRequest.Get(
        `/api/livestock-management/get-all-livestock`
      );
      return data.data;
    }
  });
};

export const useTaiMauGhiNhanTrangThai = () => {
  return useMutation({
    mutationKey: ['get-tai-mau-ghi-nhan-trang-thai'],
    mutationFn: async () => {
      var data = await BaseRequest.Get(
        `/api/livestock-management/get-record-livestock-status-template`
      );
      return data.data;
    }
  });
};

export const useGetBaoCaoDichBenh = () => {
  return useMutation({
    mutationKey: ['get-bao-cao-dich-benh'],
    mutationFn: async () => {
      var data = await BaseRequest.Get(
        `/api/livestock-management/get-disease-report`
      );
      return data.data;
    }
  });
};

export const useGetBaoCaoPhanBoVatNuoiTheoCanNang = () => {
  return useMutation({
    mutationKey: ['get-bao-cao-phan-bo-vat-nuoi-theo-can-nang'],
    mutationFn: async () => {
      var data = await BaseRequest.Get(
        `/api/livestock-management/get-weight-by-specie-report`
      );
      return data.data;
    }
  });
};

export const useUpdateLiveStockInBatchImport = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-live-stock-in-batch-import'],
    mutationFn: async (model: any) => {
      return await BaseRequestV2.Put(
        `/api/import-management/update-livestock-in-batchimport/${model.id}`,
        model.item
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-lo-nhap-by-id'],
        exact: false
      });
    }
  });
};

export const useGetTotalEmptyRecords = () => {
  return useQuery({
    queryKey: ['get-total-empty-records'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/livestock-management/get-total-empty-records`
      );
      return res.data;
    }
  });
};

export const useDownloadQRCode = () => {
  return useMutation({
    mutationKey: ['download-qrcode'],
    mutationFn: async () => {
      const res = await BaseRequestV2.Get(
        `api/livestock-management/get-empty-qr-codes-file`
      );
      return res;
    }
  });
};

export const useCreateLiveStockRecord = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['create-live-stock-record'],
    mutationFn: async (model: any) => {
      return await BaseRequestV2.Post(
        `/api/livestock-management/create-empty-livestock-records`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-list-live-stock-sumary']
      });
    }
  });
};

export const useMarkLiveStockAsDead = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['mark-live-stock-as-dead'],
    mutationFn: async (model: any) => {
      return await BaseRequestV2.Post(
        `/api/livestock-management/mark-livestocks-dead`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-list-live-stock-sumary']
      });
      queryClient.invalidateQueries({
        queryKey: ['get-all-live-stock'],
        exact: false
      });
    }
  });
};

export const useMarkLiveStockRecovered = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['mark-live-stock-recovered'],
    mutationFn: async (model: any) => {
      return await BaseRequestV2.Post(
        `/api/livestock-management/mark-livestocks-recover`,
        model
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-list-live-stock-sumary'],
        exact: false
      });
      queryClient.invalidateQueries({
        queryKey: ['get-all-live-stock'],
        exact: false
      });
    }
  });
};

export const useExportLivestockReport = () => {
  return useMutation({
    mutationKey: ['export-livestock-report'],
    mutationFn: async () => {
      return await BaseRequestV2.Get(
        `/api/livestock-management/get-list-livestocks-report`
      );
    }
  });
};
