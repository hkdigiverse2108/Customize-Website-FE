import { KEYS, URL_KEYS } from "@/constants";
import { LoginPayload, ResendOtpPayload, SignupPayload, LoginResponse, VerifyOtpPayload, ForgotPasswordPayload, ResetPasswordPayload, SignupGooglePayload, AddPlanPayload, EditPlanPayload, AddStorePayload, EditStorePayload, UploadResponse } from "@/type";
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
};
