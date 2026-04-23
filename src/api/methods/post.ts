import { CommonNotification } from "@/attribute";
import { HTTP_STATUS } from "@/constants";
import { getToken } from "@/utils";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export async function Post<TInput, TResponse>(url: string, data?: TInput, isToken: boolean = true): Promise<TResponse> {
  const authToken = getToken();
  const isFormData = data instanceof FormData;
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const config: AxiosRequestConfig = {
    method: "POST",
    url: BASE_URL + url,
    headers: {
      ...(isToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
    },
    data,
  };

  try {
    const response = await axios(config);
    const resData = response.data;

    if (response.status === HTTP_STATUS.CREATED || response.status === HTTP_STATUS.OK) {
      CommonNotification("success", resData.message);
      return resData;
    } else {
      return null as TResponse;
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const responseData = axiosError.response?.data as { message?: string };
    const message = responseData?.message || axiosError.message || "Something went wrong";

    throw new Error(message);
  }
}
