import { CommonNotification } from "@/attribute";
import { HTTP_STATUS } from "@/constants";
import { getToken } from "@/utils";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export async function Put<TInput, TResponse>(url: string, data?: TInput, isToken: boolean = true, isToast: boolean = true): Promise<TResponse> {
  const authToken = getToken();
  const isFormData = data instanceof FormData;

  const config: AxiosRequestConfig = {
    method: "PUT",
    url,
    headers: {
      ...(isToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    data,
  };

  try {
    const response = await apiClient(config);
    const resData = response.data;

    if (response.status === HTTP_STATUS.OK) {
      if (isToast) CommonNotification("success", resData.message);
      return resData;
    }

    return null as TResponse;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message = axiosError.response?.data?.message ?? axiosError.message ?? "Something went wrong";

    throw new Error(message);
  }
}
