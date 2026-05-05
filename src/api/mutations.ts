import { KEYS, URL_KEYS } from "@/constants";
import { LoginPayload, ResendOtpPayload, SignupPayload, LoginResponse, VerifyOtpPayload, ForgotPasswordPayload, ResetPasswordPayload, SignupGooglePayload, AddPlanPayload, EditPlanPayload, AddStorePayload, EditStorePayload, UploadResponse, AddThemePayload, EditThemePayload, AddComponentPayload, EditComponentPayload, AddCategoryPayload, EditCategoryPayload } from "@/type";
import { Delete, Post, Put } from "./methods";
import { useMutations } from "./reactQuery";

export const Mutations = {
  /* ========================== Auth ========================== */
  useSignup: () => useMutations<SignupPayload, LoginResponse>([KEYS.AUTH.SIGNUP], (input) => Post(URL_KEYS.AUTH.SIGNUP, input, false)),
  useLogin: () => useMutations<LoginPayload, void>([KEYS.AUTH.LOGIN], (input) => Post(URL_KEYS.AUTH.LOGIN, input, false)),
  // useChangePassword: () => useMutations<ChangePasswordPayload, void>([KEYS.AUTH.CHANGE_PASSWORD], (input) => Post(URL_KEYS.AUTH.CHANGE_PASSWORD, input)),
  useForgotPassword: () => useMutations<ForgotPasswordPayload, void>([KEYS.AUTH.FORGOT_PASSWORD], (input) => Post(URL_KEYS.AUTH.FORGOT_PASSWORD, input, false)),
  useVerifyOtp: () => useMutations<VerifyOtpPayload, LoginResponse>([KEYS.AUTH.VERIFY_OTP], (input) => Post(URL_KEYS.AUTH.VERIFY_OTP, input, false)),
  useResendOtp: () => useMutations<ResendOtpPayload, void>([KEYS.AUTH.RESEND_OTP], (input) => Post(URL_KEYS.AUTH.RESEND_OTP, input, false)),
  useResetPassword: () => useMutations<ResetPasswordPayload, void>([KEYS.AUTH.RESET_PASSWORD], (input) => Post(URL_KEYS.AUTH.RESET_PASSWORD, input, false)),
  useSignupGoogle: () => useMutations<SignupGooglePayload, LoginResponse>([KEYS.AUTH.SIGNUP_GOOGLE], (input) => Post(URL_KEYS.AUTH.SIGNUP_GOOGLE, input, false)),

  /* ========================== Upload ========================== */
  useUpload: () => useMutations<FormData, UploadResponse>([KEYS.UPLOAD.ADD, KEYS.UPLOAD.ALL_IMAGE, KEYS.UPLOAD.ALL_PDF], (input) => Post(URL_KEYS.UPLOAD.ADD, input)),
  useDeleteUpload: () => useMutations<{ fileUrl: string }, void>([KEYS.UPLOAD.DELETE, KEYS.UPLOAD.ALL_IMAGE, KEYS.UPLOAD.ALL_PDF], (id) => Delete(`${URL_KEYS.UPLOAD.DELETE}`, id)),

  /* ========================== Plan ========================== */
  useAddPlan: () => useMutations<AddPlanPayload, void>([KEYS.PLAN.ADD, KEYS.PLAN.BASE], (input) => Post(URL_KEYS.PLAN.BASE, input)),
  useEditPlan: () => useMutations<EditPlanPayload, void>([KEYS.PLAN.EDIT, KEYS.PLAN.BASE], (input) => Put(URL_KEYS.PLAN.BASE, input)),
  useDeletePlan: () => useMutations<string, void>([KEYS.PLAN.DELETE, KEYS.PLAN.BASE], (id) => Delete(`${URL_KEYS.PLAN.BASE}/${id}`)),

  /* ========================== Store ========================== */
  useAddStore: () => useMutations<AddStorePayload, void>([KEYS.STORE.ADD, KEYS.STORE.BASE], (input) => Post(URL_KEYS.STORE.BASE, input)),
  useEditStore: () => useMutations<EditStorePayload, void>([KEYS.STORE.EDIT, KEYS.STORE.BASE], (input) => Put(URL_KEYS.STORE.BASE, input)),
  useDeleteStore: () => useMutations<string, void>([KEYS.STORE.DELETE, KEYS.STORE.BASE], (id) => Delete(`${URL_KEYS.STORE.BASE}/${id}`)),

  /* ========================== User ========================== */
  useUpdateUserSubscription: () => useMutations<{ planId: string }, LoginResponse>([KEYS.USER.SUBSCRIBE], (input) => Post(URL_KEYS.USER.SUBSCRIBE, input)),

  /* ========================== Theme ========================== */
  useAddTheme: () => useMutations<AddThemePayload, void>([KEYS.THEME.ADD, KEYS.THEME.BASE], (input) => Post(URL_KEYS.THEME.BASE, input)),
  useEditTheme: () => useMutations<EditThemePayload, void>([KEYS.THEME.EDIT, KEYS.THEME.BASE], (input) => Put(URL_KEYS.THEME.BASE, input)),
  useDeleteTheme: () => useMutations<string, void>([KEYS.THEME.DELETE, KEYS.THEME.BASE], (id) => Delete(`${URL_KEYS.THEME.BASE}/${id}`)),

  /* ========================== Settings ========================== */
  useUpsertStoreSetting: () => useMutations<any, void>([KEYS.SETTINGS.STORE_UPSERT, KEYS.SETTINGS.STORE], (input) => Post(URL_KEYS.SETTINGS.STORE, input)),
  useAddDomainSetting: () => useMutations<any, any>([KEYS.SETTINGS.DOMAIN_ADD, KEYS.SETTINGS.DOMAIN], (input) => Post(URL_KEYS.SETTINGS.DOMAIN, input)),
  useEditDomainSetting: () => useMutations<any, any>([KEYS.SETTINGS.DOMAIN_EDIT, KEYS.SETTINGS.DOMAIN], (input) => Put(URL_KEYS.SETTINGS.DOMAIN, input)),
  useDeleteDomainSetting: () => useMutations<any, any>([KEYS.SETTINGS.DOMAIN_DELETE, KEYS.SETTINGS.DOMAIN], (input) => Delete(URL_KEYS.SETTINGS.DOMAIN, input)),
  useUpsertPaymentSetting: () => useMutations<any, void>([KEYS.SETTINGS.PAYMENT_UPSERT, KEYS.SETTINGS.PAYMENT], (input) => Post(URL_KEYS.SETTINGS.PAYMENT, input)),
  useAddShippingSetting: () => useMutations<any, any>([KEYS.SETTINGS.SHIPPING_ADD, KEYS.SETTINGS.SHIPPING], (input) => Post(URL_KEYS.SETTINGS.SHIPPING, input)),
  useEditShippingSetting: () => useMutations<any, any>([KEYS.SETTINGS.SHIPPING_EDIT, KEYS.SETTINGS.SHIPPING], (input) => Put(URL_KEYS.SETTINGS.SHIPPING, input)),
  useDeleteShippingSetting: () => useMutations<any, any>([KEYS.SETTINGS.SHIPPING_DELETE, KEYS.SETTINGS.SHIPPING], (input) => Delete(URL_KEYS.SETTINGS.SHIPPING, input)),
  useUpsertTaxSetting: () => useMutations<any, void>([KEYS.SETTINGS.TAX_UPSERT, KEYS.SETTINGS.TAX], (input) => Post(URL_KEYS.SETTINGS.TAX, input)),
  useUpsertCheckoutSetting: () => useMutations<any, void>([KEYS.SETTINGS.CHECKOUT_UPSERT, KEYS.SETTINGS.CHECKOUT], (input) => Post(URL_KEYS.SETTINGS.CHECKOUT, input)),
  useUpsertMailSetting: () => useMutations<any, void>([KEYS.SETTINGS.MAIL_UPSERT, KEYS.SETTINGS.MAIL], (input) => Post(URL_KEYS.SETTINGS.MAIL, input)),
  useUpsertNotificationSetting: () => useMutations<any, void>([KEYS.SETTINGS.NOTIFICATION_UPSERT, KEYS.SETTINGS.NOTIFICATION], (input) => Post(URL_KEYS.SETTINGS.NOTIFICATION, input)),
  useUpsertRegionSetting: () => useMutations<any, void>([KEYS.SETTINGS.REGION_UPSERT, KEYS.SETTINGS.REGION], (input) => Post(URL_KEYS.SETTINGS.REGION, input)),
  useUpsertSEOSetting: () => useMutations<any, void>([KEYS.SETTINGS.SEO_UPSERT, KEYS.SETTINGS.SEO], (input) => Post(URL_KEYS.SETTINGS.SEO, input)),
  useUpsertVisualSetting: () => useMutations<any, void>([KEYS.SETTINGS.VISUAL_UPSERT, KEYS.SETTINGS.VISUAL], (input) => Post(URL_KEYS.SETTINGS.VISUAL, input)),
  useUpsertThemeSetting: () => useMutations<any, void>([KEYS.SETTINGS.THEME_UPSERT, KEYS.SETTINGS.THEME], (input) => Post(URL_KEYS.SETTINGS.THEME, input)),
  usePublishTheme: () => useMutations<any, void>([KEYS.SETTINGS.THEME_PUBLISH, KEYS.SETTINGS.THEME], (input) => Post(URL_KEYS.SETTINGS.THEME + "/publish", input)),

  /* ========================== Component ========================== */
  useAddComponent: () => useMutations<AddComponentPayload, void>([KEYS.COMPONENT.ADD, KEYS.COMPONENT.BASE], (input) => Post(URL_KEYS.COMPONENT.BASE, input)),
  useEditComponent: () => useMutations<EditComponentPayload, void>([KEYS.COMPONENT.EDIT, KEYS.COMPONENT.BASE], (input) => Put(URL_KEYS.COMPONENT.BASE, input)),
  useDeleteComponent: () => useMutations<string, void>([KEYS.COMPONENT.DELETE, KEYS.COMPONENT.BASE], (id) => Delete(`${URL_KEYS.COMPONENT.BASE}/${id}`)),

  /* ========================== Category ========================== */
  useAddCategory: () => useMutations<AddCategoryPayload, void>([KEYS.CATEGORY.ADD, KEYS.CATEGORY.BASE], (input) => Post(URL_KEYS.CATEGORY.BASE, input)),
  useEditCategory: () => useMutations<EditCategoryPayload, void>([KEYS.CATEGORY.EDIT, KEYS.CATEGORY.BASE], (input) => Put(URL_KEYS.CATEGORY.BASE, input)),
  useDeleteCategory: () => useMutations<string, void>([KEYS.CATEGORY.DELETE, KEYS.CATEGORY.BASE], (id) => Delete(`${URL_KEYS.CATEGORY.BASE}/${id}`)),
};
