import { CommonNotification, ErrorMessage } from "@/attribute";
import { HTTP_STATUS } from "@/constants";
import { Params } from "@/type";
import { getToken } from "@/utils";
import axios, { AxiosError, type AxiosRequestConfig } from "axios";

let isRedirecting = false;

export async function Get<T>(url: string, params?: Params, headers?: Record<string, string>): Promise<T> {
  const authToken = getToken();
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const config: AxiosRequestConfig = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      ...headers,
    },
    params,
  };

  try {
    const response = await axios.get<T>(BASE_URL + url, config);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ status?: string }>;

    if (axiosError?.response?.status === HTTP_STATUS.UNAUTHORIZED && !isRedirecting) {
      // Storage.clear();
      isRedirecting = true;
      // window.location.href = ROUTES.HOME;
      setTimeout(() => (isRedirecting = false), 1000);
    } else {
      CommonNotification("error", ErrorMessage(error));
    }
    throw null;
  }
}
