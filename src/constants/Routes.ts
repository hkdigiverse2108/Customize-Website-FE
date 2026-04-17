export const ROUTES = {
  HOME: "/",
  DASHBOARD: "/admin/dashboard",
  AUTH: {
    SIGNIN: "/auth/signin",
    VERIFY_OTP: "/auth/verify-otp",
    RESET_PASSWORD: "/auth/reset-password",
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
