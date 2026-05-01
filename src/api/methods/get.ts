import { CommonNotification, ErrorMessage } from "@/attribute";
import { HTTP_STATUS } from "@/constants";
import Store from "@/store/store";
import { setSignOut } from "@/store/slices/authSlice";
import { Params } from "@/type";
import { getToken } from "@/utils";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

let isRedirecting = false;

// Reuse a single axios instance with base config to avoid repeated header setup
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export async function Get<T>(url: string, params?: Params, headers?: Record<string, string>): Promise<T> {
  const authToken = getToken();
  const config: AxiosRequestConfig = {
    headers: {
      Authorization: `Bearer ${authToken}`,
      ...headers,
    },
    params,
  };

  try {
    const response = await apiClient.get<T>(url, config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ status?: string }>;

    if (axiosError?.response?.status === HTTP_STATUS.UNAUTHORIZED && !isRedirecting) {
      isRedirecting = true;
      Store.dispatch(setSignOut());
      setTimeout(() => (isRedirecting = false), 1000);
    } else if (axiosError?.response?.status !== HTTP_STATUS.UNAUTHORIZED) {
      CommonNotification("error", ErrorMessage(error));
    }
    throw axiosError;
  }
}
