export const ACCOUNT_TYPE = {
  ADMIN: "admin",
  VENDOR: "vendor",
  USER: "user",
} as const;

export const SUBSCRIPTION_TYPE = {
  FREE: "free",
  BASIC: "basic",
  PRO: "pro",
} as const;

export const SUBSCRIPTION_TYPE_OPTIONS = [
  { label: "Free", value: SUBSCRIPTION_TYPE.FREE },
  { label: "Basic", value: SUBSCRIPTION_TYPE.BASIC },
  { label: "Pro", value: SUBSCRIPTION_TYPE.PRO },
];

export const PLAN_DURATION = {
  MONTHLY: "monthly",
  YEARLY: "yearly",
} as const;

export const PLAN_DURATION_OPTIONS = [
  { label: "Monthly", value: PLAN_DURATION.MONTHLY },
  { label: "Yearly", value: PLAN_DURATION.YEARLY },
];

export const KYC_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export const KYC_STATUS_OPTIONS = [
  { label: "Pending", value: KYC_STATUS.PENDING },
  { label: "Approved", value: KYC_STATUS.APPROVED },
  { label: "Rejected", value: KYC_STATUS.REJECTED },
];

export const KYC_DOCUMENT_TYPE = {
  AADHAAR: "aadhaar",
  PAN: "pan",
  GST: "gst",
} as const;

export const KYC_DOCUMENT_TYPE_OPTIONS = [
  { label: "Aadhaar", value: KYC_DOCUMENT_TYPE.AADHAAR },
  { label: "Pan", value: KYC_DOCUMENT_TYPE.PAN },
  { label: "Gst", value: KYC_DOCUMENT_TYPE.GST },
];

export const THEME_TYPE = {
  FREE: "free",
  BASIC: "basic",
  PREMIUM: "premium",
} as const;

export const THEME_TYPE_OPTIONS = [
  { label: "Free", value: THEME_TYPE.FREE },
  { label: "Basic", value: THEME_TYPE.BASIC },
  { label: "Premium", value: THEME_TYPE.PREMIUM },
];

export const THEME_SUPPORTED_PAGE = {
  HOME: "home",
  PRODUCT: "product",
  CATEGORY: "category",
  CART: "cart",
  CHECKOUT: "checkout",
  CUSTOM: "custom",
  COLLECTION: "collection",
} as const;

export const THEME_SUPPORTED_PAGE_OPTIONS = [
  { label: "Home", value: THEME_SUPPORTED_PAGE.HOME },
  { label: "Product", value: THEME_SUPPORTED_PAGE.PRODUCT },
  { label: "Category", value: THEME_SUPPORTED_PAGE.CATEGORY },
  { label: "Cart", value: THEME_SUPPORTED_PAGE.CART },
  { label: "Checkout", value: THEME_SUPPORTED_PAGE.CHECKOUT },
  { label: "Custom", value: THEME_SUPPORTED_PAGE.CUSTOM },
  { label: "Collection", value: THEME_SUPPORTED_PAGE.COLLECTION },
];
