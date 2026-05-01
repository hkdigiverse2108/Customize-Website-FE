import { KEYS, URL_KEYS } from "@/constants";
import { AppQueryOptions, Params, PlanApiResponse, PlanByIdApiResponse, StoreApiResponse, StoreByIdApiResponse, ThemeApiResponse, ThemeByIdApiResponse, UploadResponse } from "@/type";
import { Get } from "./methods";
import { useQueries } from "./reactQuery";

export const Queries = {
  /* ========================== Upload ========================== */
  useGetUploadImage: (options?: AppQueryOptions<UploadResponse>) => useQueries<UploadResponse>([KEYS.UPLOAD.ALL_IMAGE], () => Get(URL_KEYS.UPLOAD.ALL_IMAGE), options),
  useGetUploadPdf: (options?: AppQueryOptions<UploadResponse>) => useQueries<UploadResponse>([KEYS.UPLOAD.ALL_PDF], () => Get(URL_KEYS.UPLOAD.ALL_PDF), options),

  /* ========================== Plan ========================== */
  useGetPlan: (params?: Params, enabled?: boolean) => useQueries<PlanApiResponse>([KEYS.PLAN.BASE, params], () => Get(URL_KEYS.PLAN.BASE, params), { enabled: enabled }),
  useGetPlanById: (id?: string, enabled?: boolean) => useQueries<PlanByIdApiResponse>([KEYS.PLAN.BASE, id], () => Get(`${URL_KEYS.PLAN.BASE}/${id}`), { enabled: enabled }),

  /* ========================== Store ========================== */
  useGetStore: (params?: Params, enabled?: boolean) => useQueries<StoreApiResponse>([KEYS.STORE.BASE, params], () => Get(URL_KEYS.STORE.BASE, params), { enabled: enabled }),
  useGetStoreById: (id?: string, enabled?: boolean) => useQueries<StoreByIdApiResponse>([KEYS.STORE.BASE, id], () => Get(`${URL_KEYS.STORE.BASE}/${id}`), { enabled: enabled }),

  /* ========================== Theme ========================== */
  useGetTheme: (params?: Params, enabled?: boolean) => useQueries<ThemeApiResponse>([KEYS.THEME.BASE, params], () => Get(URL_KEYS.THEME.BASE, params), { enabled: enabled }),
  useGetThemeById: (id?: string, enabled?: boolean) => useQueries<ThemeByIdApiResponse>([KEYS.THEME.BASE, id], () => Get(`${URL_KEYS.THEME.BASE}/${id}`), { enabled: enabled }),

  /* ========================== Settings ========================== */
  useGetStoreSetting: (storeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.STORE, storeId], () => Get(URL_KEYS.SETTINGS.STORE, { storeId }), { enabled: !!storeId && enabled !== false }),
};
