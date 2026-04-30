import { CommonNotification } from "@/attribute";
import { HTTP_STATUS } from "@/constants";
import { getToken } from "@/utils";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export async function Delete<T, TInput>(url: string, data?: TInput): Promise<T> {
  const authToken = getToken();

  const config: AxiosRequestConfig = {
    method: "DELETE",
    url,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data,
  };

  try {
    const response = await apiClient(config);
    const resData = response.data;

    if (response.status === HTTP_STATUS.OK) {
      CommonNotification("success", resData.message);
      return resData;
    }

    return null as T;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;
    const message =
      axiosError.response?.data?.message ?? axiosError.message ?? "Something went wrong";

    throw new Error(message);
  }
}
