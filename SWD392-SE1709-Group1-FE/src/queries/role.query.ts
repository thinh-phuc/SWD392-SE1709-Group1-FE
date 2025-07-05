import BaseRequest, { BaseRequestV2 } from '@/config/axios.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

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
  return useMutation({
    mutationKey: ['update-user'],
    mutationFn: async (model: any) => {
      return await BaseRequestV2.Put(
        `/api/user-management/users/${model.id}`,
        model
      );
    }
  });
};

export const useGetAllRole = () => {
  return useQuery({
    queryKey: ['get-all-role'],
    queryFn: async () => {
      const data = await BaseRequest.Get(`/api/role-management/roles`);
      return data.data;
    }
  });
};

export const useGetPermissionByRoleId = () => {
  return useMutation({
    mutationKey: ['get-permission-by-role-id'],
    mutationFn: async (roleId: string) => {
      const data = await BaseRequest.Get(
        `/api/role-management/roles/${roleId}/permissions`
      );
      return data.data;
    }
  });
};

export const useAssignPermissionToRole = () => {
  return useMutation({
    mutationKey: ['assign-permission-to-role'],
    mutationFn: async (model: any) => {
      const data = await BaseRequest.Post(
        `/api/role-management/roles/${model.roleId}/permissions`,
        model.permissions
      );
      return data.data;
    }
  });
};

export const useGetAllPermission = () => {
  return useQuery({
    queryKey: ['get-all-permission'],
    queryFn: async () => {
      const data = await BaseRequest.Get(`/api/role-management/permissions`);
      return data.data;
    }
  });
};

export const useAddRole = () => {
  return useMutation({
    mutationKey: ['add-role'],
    mutationFn: async (model: any) => {
      const data = await BaseRequest.Post(`/api/role-management/roles`, model);
      return data.data;
    }
  });
};

export const useUpdateRole = () => {
  return useMutation({
    mutationKey: ['update-role'],
    mutationFn: async (model: any) => {
      const data = await BaseRequest.Put(
        `/api/role-management/roles/${model.id}`,
        model
      );
      return data.data;
    }
  });
};

export const useDeleteRole = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['delete-role'],
    mutationFn: async (roleId: string) => {
      const data = await BaseRequest.Delete(
        `/api/role-management/roles/${roleId}`
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['get-permission-by-role-id'],
        exact: true
      });
      queryClient.invalidateQueries({
        queryKey: ['get-all-role'],
        exact: true
      });
    }
  });
};
