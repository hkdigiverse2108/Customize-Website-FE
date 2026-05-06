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
    SETTINGS: {
      STORE: "/store/settings/store",
      DOMAIN: "/store/settings/domain",
      PAYMENT: "/store/settings/payment",
      SHIPPING: "/store/settings/shipping",
      TAX: "/store/settings/tax",
      CHECKOUT: "/store/settings/checkout",
      MAIL: "/store/settings/mail",
      NOTIFICATION: "/store/settings/notification",
      REGION: "/store/settings/region",
      SEO: "/store/settings/seo",
      THEME: "/store/settings/theme",
      VISUAL: "/store/settings/visual",
    },
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
    CATEGORY: {
      BASE: "/admin/category",
      ADD: "/admin/category/add",
      EDIT: "/admin/category/edit",
    },
    PAGE: {
      BASE: "/admin/page",
      ADD: "/admin/page/add",
      EDIT: "/admin/page/edit",
    },
    COLLECTION: {
      BASE: "/admin/collection",
      ADD: "/admin/collection/add",
      EDIT: "/admin/collection/edit",
    },
  },
} as const;
