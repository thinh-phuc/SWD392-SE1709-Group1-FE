import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetAllMaKiemDich = () => {
  return useQuery({
    queryKey: ['get-all-ma-kiem-dich'],
    queryFn: async () => {
      const data = await BaseRequest.Get(
        `/api/inspection-code-range/get-all-inspection-code-range`
      );
      return data.data;
    }
  });
};

export const useCreateMaKiemDich = () => {
  return useMutation({
    mutationKey: ['create-ma-kiem-dich'],
    mutationFn: async (model: any) => {
      return await BaseRequest.Post(
        `/api/inspection-code-range/create-inspection-code-range`,
        model
      );
    }
  });
};

export const useGetAllMaKiemDichTheoLoai = () => {
  return useQuery({
    queryKey: ['get-all-ma-kiem-dich-theo-loai'],
    queryFn: async () => {
      const data = await BaseRequest.Get(
        `/api/inspection-code-range/get-all-code-ranges-by-types`
      );
      return data.data;
    }
  });
};

export const useGetListCodeRangeBySpecies = (speciesName: string) => {
  return useQuery({
    queryKey: ['get-list-code-range-by-species', speciesName],
    queryFn: async () => {
      const data = await BaseRequest.Get(
        `/api/inspection-code-range/get-list-code-ranges-by-specie/${speciesName}`
      );
      return data.data;
    }
  });
};

export const useGetChiTietTiemChungGoiThau = (id: string) => {
  return useQuery({
    queryKey: ['get-chi-tiet-tiem-chung-goi-thau', id],
    queryFn: async () => {
      const data = await BaseRequest.Get(
        `/api/vaccination-management/get-procurement-require-vaccination/${id}`
      );
      return data.data;
    }
  });
};
