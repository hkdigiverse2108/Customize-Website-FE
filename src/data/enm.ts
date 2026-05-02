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

export const SETTING_FIELD_STATUS = {
  DISABLED: "disabled",
  OPTIONAL: "optional",
  REQUIRED: "required",
} as const;

export const AUTH_METHOD = {
  EMAIL: "email",
  PHONE_OR_EMAIL: "phone_or_email",
} as const;

export const VISIBILITY_STATUS = {
  HIDDEN: "hidden",
  OPTIONAL: "optional",
  REQUIRED: "required",
} as const;

export const EMAIL_PROVIDER = {
  GMAIL: "gmail",
  SMTP: "smtp",
  RESEND: "resend",
  SENDGRID: "sendgrid",
} as const;

export const MEASUREMENT_SYSTEM = {
  METRIC: "metric",
  IMPERIAL: "imperial",
} as const;

export const THEME_SETTING_TYPE = {
  TEXT: "text",
  NUMBER: "number",
  BOOLEAN: "boolean",
  COLOR: "color",
  IMAGE: "image",
  SELECT: "select",
  SLIDER: "slider",
  FONT: "font",
  TEXTAREA: "textarea",
  JSON: "json",
} as const;

export const THEME_SETTING_TYPE_OPTIONS = [
  { label: "Text", value: THEME_SETTING_TYPE.TEXT },
  { label: "Number", value: THEME_SETTING_TYPE.NUMBER },
  { label: "Boolean", value: THEME_SETTING_TYPE.BOOLEAN },
  { label: "Color", value: THEME_SETTING_TYPE.COLOR },
  { label: "Image", value: THEME_SETTING_TYPE.IMAGE },
  { label: "Select", value: THEME_SETTING_TYPE.SELECT },
  { label: "Slider", value: THEME_SETTING_TYPE.SLIDER },
  { label: "Font", value: THEME_SETTING_TYPE.FONT },
  { label: "Textarea", value: THEME_SETTING_TYPE.TEXTAREA },
  { label: "Json", value: THEME_SETTING_TYPE.JSON },
];

export const THEME_SETTING_GROUP = {
  GENERAL: "general",
  COLORS: "colors",
  TYPOGRAPHY: "typography",
  LAYOUT: "layout",
  HEADER: "header",
  FOOTER: "footer",
  ADVANCED: "advanced",
} as const;

export const THEME_SETTING_GROUP_OPTIONS = [
  { label: "General", value: THEME_SETTING_GROUP.GENERAL },
  { label: "Colors", value: THEME_SETTING_GROUP.COLORS },
  { label: "Typography", value: THEME_SETTING_GROUP.TYPOGRAPHY },
  { label: "Layout", value: THEME_SETTING_GROUP.LAYOUT },
  { label: "Header", value: THEME_SETTING_GROUP.HEADER },
  { label: "Footer", value: THEME_SETTING_GROUP.FOOTER },
  { label: "Advanced", value: THEME_SETTING_GROUP.ADVANCED },
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

export const THEME_EDIT_MODE_OPTIONS = [
  { label: "Basic", value: "basic" },
  { label: "Supported", value: "supported" },
  { label: "Versioning", value: "versioning" },
  { label: "Breakpoints", value: "breakpoints" },
  { label: "Styles", value: "styles" },
  { label: "Default Config", value: "defaultConfig" },
  { label: "Layout", value: "layout" },
  { label: "Draft Layout", value: "draftLayoutJSON" },
  { label: "Component Schema", value: "componentSchema" },
  { label: "Settings Schema", value: "settingsSchema" },
  { label: "Features", value: "features" },
];
