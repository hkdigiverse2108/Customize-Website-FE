export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/admin/dashboard",
  AUTH: {
    SIGNUP: "/auth/signup",
    LOGIN: "/auth/login",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
    FORGOT_PASSWORD: "/auth/forgot-password",
  },
  PRODUCT: {
    BASE: "/inventory/product",
  },
  STOCK: {
    BASE: "/inventory/stock",
  },
  RECIPE: {
    BASE: "/inventory/recipe",
  },
  STOCK_VERIFICATION: {
    BASE: "/inventory/stock-verification",
  },
  BILL_OF_LIVE_PRODUCT: {
    BASE: "/inventory/bill-of-live-product",
  },
  MATERIAL_CONSUMPTION: {
    BASE: "/inventory/material-consumption",
  },
} as const;
