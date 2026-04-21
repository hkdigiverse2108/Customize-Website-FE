import { KEYS, URL_KEYS } from "@/constants";
import { LoginPayload, ResendOtpPayload, SignupPayload, LoginResponse, VerifyOtpPayload, ForgotPasswordPayload, ResetPasswordPayload, SignupGooglePayload } from "@/type";
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
  useResetPassword: () => useMutations<ResetPasswordPayload, void>([KEYS.AUTH.RESET_PASSWORD], (input) => Post(URL_KEYS.AUTH.RESET_PASSWORD, input, false)),
  useSignupGoogle: () => useMutations<SignupGooglePayload, LoginResponse>([KEYS.AUTH.SIGNUP_GOOGLE], (input) => Post(URL_KEYS.AUTH.SIGNUP_GOOGLE, input, false)),
};
