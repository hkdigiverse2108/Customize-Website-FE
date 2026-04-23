import { CommonNotification } from "@/attribute";
import { HTTP_STATUS } from "@/constants";
import { getToken } from "@/utils";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

export async function Delete<T, TInput>(url: string, data?: TInput): Promise<T> {
  const authToken = getToken();
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const config: AxiosRequestConfig = {
    method: "DELETE",
    url: BASE_URL + url,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    data,
  };

  try {
    const response = await axios(config);
    const resData = response.data;

    if (response.status === HTTP_STATUS.OK) {
      CommonNotification("success", resData.message);
      return resData;
    } else {
      return null as T;
    }
  } catch (error) {
    const axiosError = error as AxiosError<any>;
    const responseData = axiosError.response?.data as { message?: string };
    const message = responseData?.message || axiosError.message || "Something went wrong";
    throw new Error(message);
  }
}
