import BaseRequest, { BaseRequestV2 } from '@/config/axios.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetStudentProfileById = (id: string) => {
  return useQuery({
    queryKey: ['get-student-profile', id],
    queryFn: async () => {
      const res = await BaseRequest.Get(`/api/student-profiles/${id}`);
      return res;
    },
    enabled: !!id
  });
};

export const useUpdateStudentProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['update-student-profile'],
    mutationFn: async (data: any) => {
      const res = await BaseRequestV2.Put(
        `/api/student-profiles/${data.id}`,
        data
      );
      return res;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['get-student-profile', variables.id]
      });
    }
  });
};
