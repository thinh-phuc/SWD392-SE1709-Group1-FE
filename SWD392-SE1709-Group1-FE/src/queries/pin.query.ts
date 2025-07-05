import BaseRequest, { BaseRequestV2 } from '@/config/axios.config';
import __helpers from '@/helpers';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetListPinned = () => {
  const userId = __helpers.getUserId();
  return useQuery({
    queryKey: ['get-list-pinned'],
    queryFn: async () => {
      const data = await BaseRequest.Get(
        `/api/import-management/get-list-pinned-batchimport/${userId}`
      );
      return data.data;
    }
  });
};

export const useGetListOverdue = () => {
  return useQuery({
    queryKey: ['get-list-overdue'],
    queryFn: async () => {
      const data = await BaseRequest.Get(
        `/api/import-management/get-list-overdue-batchimport`
      );
      return data.data;
    }
  });
};

export const useGetListMissing = () => {
  return useQuery({
    queryKey: ['get-list-missing'],
    queryFn: async () => {
      const data = await BaseRequest.Get(
        `/api/import-management/get-list-missing-batchimport`
      );
      return data.data;
    }
  });
};

export const useAddPin = () => {
  const queryClient = useQueryClient();
  const userId = __helpers.getUserId();
  return useMutation({
    mutationFn: async (batchImportId: any) => {
      const data = await BaseRequestV2.Post(
        `/api/import-management/add-to-pinned-importbatch/${batchImportId}?requestedBy=${userId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-list-pinned'],
        exact: false
      });
      queryClient.invalidateQueries({
        queryKey: ['get-list-overdue'],
        exact: false
      });
      queryClient.invalidateQueries({
        queryKey: ['get-list-missing'],
        exact: false
      });
      queryClient.invalidateQueries({
        queryKey: ['get-list-neardue'],
        exact: false
      });
      queryClient.invalidateQueries({
        queryKey: ['get-upcoming'],
        exact: false
      });
    }
  });
};

export const useRemovePin = () => {
  const queryClient = useQueryClient();
  const userId = __helpers.getUserId();
  return useMutation({
    mutationFn: async (batchImportId) => {
      const data = await BaseRequestV2.Delete(
        `/api/import-management/remove-from-pinned-batch-import/${batchImportId}?requestedBy=${userId}`
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-list-pinned'],
        exact: false
      });
      queryClient.invalidateQueries({
        queryKey: ['get-list-overdue'],
        exact: false
      });
      queryClient.invalidateQueries({
        queryKey: ['get-list-missing'],
        exact: false
      });
      queryClient.invalidateQueries({
        queryKey: ['get-list-neardue'],
        exact: false
      });
      queryClient.invalidateQueries({
        queryKey: ['get-upcoming'],
        exact: false
      });
    }
  });
};

export const useListNeardue = (number: any) => {
  return useQuery({
    queryKey: ['get-list-neardue', number],
    queryFn: async () => {
      const data = await BaseRequest.Get(
        `/api/import-management/get-list-neardue-batchimport/${number}`
      );
      return data.data;
    }
  });
};

export const useGetUpcoming = (number: any) => {
  return useQuery({
    queryKey: ['get-upcoming', number],
    queryFn: async () => {
      const data = await BaseRequest.Get(
        `/api/import-management/get-list-upcoming-batchimport/${number}`
      );
      return data.data;
    }
  });
};
