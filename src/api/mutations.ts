import { KEYS, URL_KEYS } from "@/constants";
import { LoginPayload, ResendOtpPayload, SignupPayload, LoginResponse, VerifyOtpPayload, ForgotPasswordPayload } from "@/type";
import { Post } from "./methods";
import { useMutations } from "./reactQuery";

export const Mutations = {
  /* ========================== Auth ========================== */
  useSignup: () => useMutations<SignupPayload, LoginResponse>([KEYS.AUTH.SIGNUP], (input) => Post(URL_KEYS.AUTH.SIGNUP, input, false)),
  useLogin: () => useMutations<LoginPayload, void>([KEYS.AUTH.LOGIN], (input) => Post(URL_KEYS.AUTH.LOGIN, input, false)),
  // useChangePassword: () => useMutations<ChangePasswordPayload, void>([KEYS.AUTH.CHANGE_PASSWORD], (input) => Post(URL_KEYS.AUTH.CHANGE_PASSWORD, input)),
  useForgotPassword: () => useMutations<ForgotPasswordPayload, void>([KEYS.AUTH.FORGOT_PASSWORD], (input) => Post(URL_KEYS.AUTH.FORGOT_PASSWORD, input, false)),
  useVerifyOtp: () => useMutations<VerifyOtpPayload, LoginResponse>([KEYS.AUTH.VERIFY_OTP], (input) => Post(URL_KEYS.AUTH.VERIFY_OTP, input, false)),
  useResendOtp: () => useMutations<ResendOtpPayload, void>([KEYS.AUTH.RESEND_OTP], (input) => Post(URL_KEYS.AUTH.RESEND_OTP, input, false)),
  // useUpdatePassword: () => useMutations<UpdatePasswordPayload, void>([KEYS.AUTH.UPDATE_PASSWORD], (input) => Post(URL_KEYS.AUTH.UPDATE_PASSWORD, input, false)),
};
