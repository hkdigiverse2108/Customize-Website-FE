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
    PLANS: "/store/subscription",
    SETUP: "/store/setup",
  },
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PLAN: {
      BASE: "/admin/plan",
      ADD: "/admin/plan/add",
      EDIT: "/admin/plan/edit",
    },
    STORES: {
      BASE: "/admin/stores",
      ADD: "/admin/stores/add",
      EDIT: "/admin/stores/edit",
    },
    THEME: {
      BASE: "/admin/theme",
      ADD: "/admin/theme/add",
      EDIT: "/admin/theme/edit",
    },
    COMPONENT: {
      BASE: "/admin/component",
      ADD: "/admin/component/add",
      EDIT: "/admin/component/edit",
    },
  },
} as const;
