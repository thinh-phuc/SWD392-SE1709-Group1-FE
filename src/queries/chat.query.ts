import BaseRequest from '@/config/axios.config';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetChatSessions = (studentId: string) => {
  return useQuery({
    queryKey: ['get-chat-sessions', studentId],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/chat-sessions/me?studentId=${studentId}`
      );
      return res || [];
    },
    enabled: !!studentId
  });
};

export const useGetChatMessages = (sessionId: number) => {
  return useQuery({
    queryKey: ['get-chat-messages', sessionId],
    queryFn: async () => {
      const res = await BaseRequest.Get(
        `/api/chat-messages?sessionId=${sessionId}`
      );
      return res || [];
    },
    enabled: !!sessionId
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['send-message'],
    mutationFn: async (data: {
      message: string;
      sessionId: number;
      studentId: number;
    }) => {
      const res = await BaseRequest.Post('/api/chat-messages', data);
      return res;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['get-chat-messages', variables.sessionId]
      });
      queryClient.invalidateQueries({
        queryKey: ['get-chat-sessions', variables.studentId.toString()]
      });
    }
  });
};
