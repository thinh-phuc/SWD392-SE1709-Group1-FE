import axios, { AxiosResponse } from 'axios';
import helpers from '../helpers';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://lms.autopass.blog/'
    : 'https://lms.autopass.blog/';

const onRequestSuccess = (config: any) => {
  config.headers['Authorization'] = `Bearer ${helpers.cookie_get('AT')}`;
  return config;
};
const onRequestError = (error: any) => {
  return Promise.reject(error);
};
const onResponseSuccess = (response: any) => {
  return response.data;
};
const onResponseError = (error: any) => {
  if (error.response) {
    if (
      (error.response.status == 403 &&
        error.response.data.message == 'Token expired') ||
      error.response.status == 401
    ) {
      helpers.cookie_delete('AT');
      window.location.href = '/login';
    }
    return Promise.reject(error.response);
  }
  return Promise.reject(error);
};
axios.interceptors.request.use(onRequestSuccess, onRequestError);
axios.interceptors.response.use(onResponseSuccess, onResponseError);
axios.defaults.baseURL = baseURL;

var BaseRequest = {
  Get: async <T = any>(url: string) => {
    try {
      const response: any = await axios.get<T>(url);
      return response; // Trả về toàn bộ response thay vì chỉ response.data
    } catch (err) {
      console.error('GET Error:', err);
      throw err;
    }
  },

  Post: async <T = any, D = any>(url: string, data?: D) => {
    try {
      const response: any = await axios.post<T>(url, data);
      return response; // Trả về toàn bộ response
    } catch (err) {
      console.error('POST Error:', err);
      throw err;
    }
  },

  Put: async <T = any, D = any>(url: string, data?: D) => {
    try {
      const response: any = await axios.put<T>(url, data);
      return response;
    } catch (err) {
      console.error('PUT Error:', err);
      throw err;
    }
  },

  Patch: async <T = any, D = any>(url: string, data?: D) => {
    try {
      const response: any = await axios.patch<T>(url, data);
      return response;
    } catch (err) {
      console.error('PATCH Error:', err);
      throw err;
    }
  },

  Delete: async <T = any>(url: string) => {
    try {
      const response: AxiosResponse<T> = await axios.delete<T>(url);
      return response;
    } catch (err) {
      console.error('DELETE Error:', err);
      throw err;
    }
  }
};

var BaseRequestV2 = {
  Get: async <T = any>(url: string) => {
    try {
      const res: AxiosResponse<T> = await axios.get(url);
      return [null, res]; // Trả về toàn bộ response thay vì chỉ res.data
    } catch (err: any) {
      return [err?.response || err, null]; // Trả về toàn bộ lỗi response nếu có
    }
  },

  Post: async <T = any>(url: string, data?: any) => {
    try {
      const res: AxiosResponse<T> = await axios.post(url, data);
      return [null, res];
    } catch (err: any) {
      return [err?.response || err, null];
    }
  },

  Put: async <T = any>(url: string, data?: any) => {
    try {
      const res: AxiosResponse<T> = await axios.put(url, data);
      return [null, res];
    } catch (err: any) {
      return [err?.response || err, null];
    }
  },

  Delete: async <T = any>(url: string) => {
    try {
      const res: AxiosResponse<T> = await axios.delete(url);
      return [null, res];
    } catch (err: any) {
      return [err?.response || err, null];
    }
  }
};

export default BaseRequest;
export { BaseRequestV2 };
