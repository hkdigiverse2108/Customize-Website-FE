export const ROUTES = {
  HOME: "/",
  VENDOR: {
    DASHBOARD: "/vendor/dashboard",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
  },
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
} as const;
