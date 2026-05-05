import { KEYS, URL_KEYS } from "@/constants";
import { AppQueryOptions, CategoryApiResponse, CategoryByIdApiResponse, ComponentApiResponse, ComponentByIdApiResponse, Params, PlanApiResponse, PlanByIdApiResponse, StoreApiResponse, StoreByIdApiResponse, ThemeApiResponse, ThemeByIdApiResponse, UploadResponse } from "@/type";
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
  useGetDomainSetting: (storeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.DOMAIN, storeId], () => Get(URL_KEYS.SETTINGS.DOMAIN, { storeId }), { enabled: !!storeId && enabled !== false }),
  useGetPaymentSetting: (storeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.PAYMENT, storeId], () => Get(URL_KEYS.SETTINGS.PAYMENT, { storeId }), { enabled: !!storeId && enabled !== false }),
  useGetShippingSetting: (storeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.SHIPPING, storeId], () => Get(URL_KEYS.SETTINGS.SHIPPING, { storeId }), { enabled: !!storeId && enabled !== false }),
  useGetTaxSetting: (storeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.TAX, storeId], () => Get(URL_KEYS.SETTINGS.TAX, { storeId }), { enabled: !!storeId && enabled !== false }),
  useGetCheckoutSetting: (storeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.CHECKOUT, storeId], () => Get(URL_KEYS.SETTINGS.CHECKOUT, { storeId }), { enabled: !!storeId && enabled !== false }),
  useGetMailSetting: (storeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.MAIL, storeId], () => Get(URL_KEYS.SETTINGS.MAIL, { storeId }), { enabled: !!storeId && enabled !== false }),
  useGetNotificationSetting: (storeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.NOTIFICATION, storeId], () => Get(URL_KEYS.SETTINGS.NOTIFICATION, { storeId }), { enabled: !!storeId && enabled !== false }),
  useGetRegionSetting: (storeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.REGION, storeId], () => Get(URL_KEYS.SETTINGS.REGION, { storeId }), { enabled: !!storeId && enabled !== false }),
  useGetSEOSetting: (storeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.SEO, storeId], () => Get(URL_KEYS.SETTINGS.SEO, { storeId }), { enabled: !!storeId && enabled !== false }),
  useGetVisualSetting: (storeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.VISUAL, storeId], () => Get(URL_KEYS.SETTINGS.VISUAL, { storeId }), { enabled: !!storeId && enabled !== false }),
  useGetThemeSetting: (storeId?: string, themeId?: string, enabled?: boolean) => useQueries<any>([KEYS.SETTINGS.THEME, storeId, themeId], () => Get(URL_KEYS.SETTINGS.THEME, { storeId, themeId }), { enabled: !!storeId && enabled !== false }),

  /* ========================== Component ========================== */
  useGetComponent: (params?: Params, enabled?: boolean) => useQueries<ComponentApiResponse>([KEYS.COMPONENT.BASE, params], () => Get(URL_KEYS.COMPONENT.BASE, params), { enabled: enabled }),
  useGetComponentById: (id?: string, enabled?: boolean) => useQueries<ComponentByIdApiResponse>([KEYS.COMPONENT.BASE, id], () => Get(`${URL_KEYS.COMPONENT.BASE}/${id}`), { enabled: enabled }),

  /* ========================== Category ========================== */
  useGetCategory: (params?: Params, enabled?: boolean) => useQueries<CategoryApiResponse>([KEYS.CATEGORY.BASE, params], () => Get(URL_KEYS.CATEGORY.BASE, params), { enabled: enabled }),
  useGetCategoryById: (id?: string, enabled?: boolean) => useQueries<CategoryByIdApiResponse>([KEYS.CATEGORY.BASE, id], () => Get(`${URL_KEYS.CATEGORY.BASE}/${id}`), { enabled: enabled }),
};
