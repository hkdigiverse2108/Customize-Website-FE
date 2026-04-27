export const URL_KEYS = {
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    CHANGE_PASSWORD: "/auth/reset-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_OTP: "/auth/verify-otp",
    RESEND_OTP: "/auth/resend-otp",
    RESET_PASSWORD: "/auth/reset-password",
    SIGNUP_GOOGLE: "/auth/google-auth",
  },
  UPLOAD: {
    ADD: "/upload",
    DELETE: "/upload/delete",
    ALL_IMAGE: "/upload/images",
    ALL_PDF: "/upload/pdfs",
  },
  PLAN: {
    BASE: "/plan",
  },
  STORE: {
    BASE: "/store",
  },
} as const;
