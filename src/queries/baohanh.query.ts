import BaseRequest, { BaseRequestV2 } from '@/config/axios.config';
import { useMutation, useQuery } from '@tanstack/react-query';

// theo group
export const useGetListBaoHanh = () => {
  return useQuery({
    queryKey: ['get-list-insurence-request-overview'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/insurence-request/get-list-insurence-request-overview`
      );
      return res.data;
    }
  });
};

export const useGetListBaoHanh2 = (status: string) => {
  return useQuery({
    queryKey: ['get-list-insurence-request'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/insurence-request/get-list-insurence-request?status=${status}`
      );
      return res.data;
    }
  });
};

export const useGetChiTietBaoHanh = (id: any) => {
  return useQuery({
    queryKey: ['get-list-insurence-request'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/insurence-request/get-insurence-request/${id}`
      );
      return res.data;
    }
  });
};

export const useDuyetDonBaoHanh = () => {
  return useMutation({
    mutationKey: ['duyet-don-bao-hanh'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Put(
        `/api/insurence-request/approve-livestock-insurence-request`,
        data
      );
      return res;
    }
  });
};

export const useTuChoiDonBaoHanh = () => {
  return useMutation({
    mutationKey: ['tu-choi-don-bao-hanh'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Put(
        `/api/insurence-request/reject-livestock-insurence-request`,
        data
      );
      return res;
    }
  });
};

export const useGetDanhSachStatusBaoHanh = () => {
  return useQuery({
    queryKey: ['get-list-insurence-request-status'],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/insurence-request/get-list-insurence-request-status`
      );
      return res.data;
    }
  });
};

export const useGetVacxinByInsureance = (id: any) => {
  return useQuery({
    queryKey: ['get-vaccine-by-insurance', id],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/insurence-request/get-vaccination-by-insurance/${id}`
      );
      return res.data;
    }
  });
};

export const useUpdateVatNuoiBaoHanh = () => {
  return useMutation({
    mutationKey: ['update-livestock-insurence-request'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Put(
        `/api/insurence-request/update-livestock-insurence-request`,
        data
      );
      return res;
    }
  });
};
