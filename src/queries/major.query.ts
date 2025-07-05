import BaseRequest from '@/config/axios.config';
import { useQuery } from '@tanstack/react-query';

const SUB_URL = `major`;

export const useGetAllMajor = () => {
  return useQuery({
    queryKey: ['get-all-major'],
    queryFn: async () => {
      return await BaseRequest.Get(`/${SUB_URL}/get-all-major`);
    }
  });
};
