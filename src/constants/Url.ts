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
  USER: {
    SUBSCRIBE: "/user/subscribe",
  },
  STORE: {
    BASE: "/store",
  },
  THEME: {
    BASE: "/theme",
  },
  SETTINGS: {
    STORE: "/settings/store",
    DOMAIN: "/settings/domain",
    PAYMENT: "/settings/payment",
    SHIPPING: "/settings/shipping",
    TAX: "/settings/tax",
    CHECKOUT: "/settings/checkout",
    MAIL: "/settings/mail",
    NOTIFICATION: "/settings/notification",
    REGION: "/settings/region",
    SEO: "/settings/seo",
    VISUAL: "/settings/visual",
    THEME: "/settings/theme",
  },
  COMPONENT: {
    BASE: "/component",
  },
  CATEGORY: {
    BASE: "/category",
  },
  PAGE: {
    BASE: "/page",
  },
  COLLECTION: {
    BASE: "/collection",
  },
} as const;
