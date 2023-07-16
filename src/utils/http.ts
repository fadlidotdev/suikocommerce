import constants from "@/utils/constants";
import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

type ConfigOptions = {
  isAuth?: boolean;
};

const createAxios = (config?: ConfigOptions) => {
  const customAxios = axios.create({
    baseURL: process.env.HOST_API,
  });

  customAxios.interceptors.request.use(
    (request) => {
      if (request.headers === undefined) {
        request.headers = {} as AxiosRequestHeaders;
      }

      if (config?.isAuth) {
        const accessToken = localStorage.getItem(constants("accessToken"));

        if (accessToken) {
          request.headers.Authorization = `Bearer ${accessToken}`;
        }
      }

      request.headers["Content-Type"] = "application/json";

      return request;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    },
  );

  return customAxios;
};

/**
 * Catch API Request and throw error for TanStack Query
 * @param fetcher axios request tobe called
 * @returns {Promise<any>} Returns the api response data
 */
const apiResolver = async (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetcher: () => Promise<AxiosResponse<any>>,
) => {
  try {
    const res = await fetcher();
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    const message = err.response?.data?.message || "Something went wrong";
    throw message;
  }
};

const http = (axiosInstance: AxiosInstance) => {
  return (params: AxiosRequestConfig) => {
    return apiResolver(() => axiosInstance({...params}));
  };
};

export const createHttp = (config?: ConfigOptions) => {
  const axiosInstance = createAxios(config);

  return http(axiosInstance);
};
