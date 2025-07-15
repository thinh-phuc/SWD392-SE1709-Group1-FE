import BaseRequest from '@/config/axios.config';

export const getBranches = (pageNumber = 1, pageSize = 10) =>
  BaseRequest.Get(
    `/api/branches?pageNumber=${pageNumber}&pageSize=${pageSize}`
  );

export const createBranch = (data: any) =>
  BaseRequest.Post('/api/branches', data);

export const updateBranch = (id: number, data: any) =>
  BaseRequest.Put(`/api/branches/${id}`, data);

export const deleteBranch = (id: number) =>
  BaseRequest.Delete(`/api/branches/${id}`);
