export const ROUTES = {
  HOME: "/",
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  STORE: {
    DASHBOARD: "/store/dashboard",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PLAN: {
      BASE: "/admin/plan",
      ADD_EDIT: "/admin/plan/add-edit",
    },
  },
} as const;
