/**
 * @file useApi.ts
 * @description Hook personalizado para enviar las peticiones con token de validacion
 *
 * @authors
 * - Santiago Mendoza <asmendoza@emcali.com.co>
 * - Juan David Lievano <jdlievano@emcali.com.co>
 *
 * @copyright VERTIEM 2025
 */

import { useCallback } from "react"; // Importamos useCallback
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import { ApiError, UseApiResult } from "@/types";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

// Configuración de la instancia de Axios
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

// Hook personalizado
export const useApi = (): UseApiResult => {
  // Función para obtener el token
  const getToken = useCallback((): string => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error(
        "No se encontró un token de autenticación. Por favor, inicia sesión."
      );
    }
    return token;
  }, []); // Dependencias vacías porque no depende de variables externas

  // Interceptor para añadir el token a todas las peticiones
  api.interceptors.request.use((config) => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.warn("No se pudo obtener el token:", error);
    }
    return config;
  });

  // Manejo de errores genérico
  const handleError = useCallback((error: unknown): never => {
    const apiError = error as ApiError;
    const errorMessage =
      apiError.response?.data?.message ||
      apiError.response?.data?.error ||
      apiError.message ||
      "Ocurrió un error inesperado. Por favor, intenta de nuevo.";
    Notify.failure(errorMessage);
    throw error; // Re-lanzamos el error para que el componente lo maneje si es necesario
  }, []); // Dependencias vacías porque no depende de variables externas

  // Métodos de petición
  const get = useCallback(
    async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await api.get(url, config);
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError] // Dependemos de handleError, que ya está memoizado
  );

  const post = useCallback(
    async <T>(
      url: string,
      data: any,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await api.post(url, data, config);
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError] // Dependemos de handleError
  );

  const put = useCallback(
    async <T>(
      url: string,
      data: any,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await api.put(url, data, config);
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError] // Dependemos de handleError
  );

  const del = useCallback(
    async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await api.delete(url, config);
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError] // Dependemos de handleError
  );

  const patch = useCallback(
    async <T>(
      url: string,
      data: any,
      config?: AxiosRequestConfig
    ): Promise<T> => {
      try {
        const response: AxiosResponse<T> = await api.patch(url, data, config);
        return response.data;
      } catch (error) {
        return handleError(error);
      }
    },
    [handleError] // Dependemos de handleError
  );

  return { get, post, put, del, patch };
};

export default useApi;
