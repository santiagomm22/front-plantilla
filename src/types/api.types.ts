/**
 * @file api.types.ts
 * @description Hook personalizado para tipos relacionados con API y peticiones
 */

import { AxiosRequestConfig } from "axios";

export interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
  message?: string;
}

export interface UseApiResult {
  get: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  post: <T>(url: string, data: any, config?: AxiosRequestConfig) => Promise<T>;
  put: <T>(url: string, data: any, config?: AxiosRequestConfig) => Promise<T>;
  del: <T>(url: string, config?: AxiosRequestConfig) => Promise<T>;
  patch: <T>(url: string, data: any, config?: AxiosRequestConfig) => Promise<T>;
}
