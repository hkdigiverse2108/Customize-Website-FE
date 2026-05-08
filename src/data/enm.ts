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

export const COMPONENT_EDIT_MODE_OPTIONS = [
  { label: "Basic", value: "basic" },
  { label: "Config JSON", value: "configJSON" },
  { label: "Default Config", value: "defaultConfig" },
  { label: "Config Schema", value: "configSchema" },
  { label: "Supported", value: "supported" },
  { label: "Features", value: "features" },
];

export const COMPONENT_TYPE = {
  HEADER: "header",
  FOOTER: "footer",
  BANNER: "banner",
  PRODUCT_GRID: "productGrid",
  CUSTOM: "custom",
} as const;

export const COMPONENT_TYPE_OPTIONS = [
  { label: "Header", value: COMPONENT_TYPE.HEADER },
  { label: "Footer", value: COMPONENT_TYPE.FOOTER },
  { label: "Banner", value: COMPONENT_TYPE.BANNER },
  { label: "Product Grid", value: COMPONENT_TYPE.PRODUCT_GRID },
  { label: "Custom", value: COMPONENT_TYPE.CUSTOM },
];

export const COMPONENT_CATEGORY = {
  LAYOUT: "layout",
  MARKETING: "marketing",
  ECOMMERCE: "ecommerce",
} as const;

export const COMPONENT_CATEGORY_OPTIONS = [
  { label: "Layout", value: COMPONENT_CATEGORY.LAYOUT },
  { label: "Marketing", value: COMPONENT_CATEGORY.MARKETING },
  { label: "Ecommerce", value: COMPONENT_CATEGORY.ECOMMERCE },
];

export const PAGE_TYPE = {
  HOME: "home",
  PRODUCT: "product",
  CATEGORY: "category",
  CUSTOM: "custom",
} as const;

export const PAGE_TYPE_OPTIONS = [
  { label: "Home", value: PAGE_TYPE.HOME },
  { label: "Product", value: PAGE_TYPE.PRODUCT },
  { label: "Category", value: PAGE_TYPE.CATEGORY },
  { label: "Custom", value: PAGE_TYPE.CUSTOM },
];

export const PAGE_VISIBILITY = {
  PUBLIC: "public",
  PRIVATE: "private",
  PASSWORD: "password",
} as const;

export const PAGE_VISIBILITY_OPTIONS = [
  { label: "Public", value: PAGE_VISIBILITY.PUBLIC },
  { label: "Private", value: PAGE_VISIBILITY.PRIVATE },
  { label: "Password", value: PAGE_VISIBILITY.PASSWORD },
];

export const COLLECTION_TYPE = {
  MANUAL: "manual",
  SMART: "smart",
} as const;

export const COLLECTION_TYPE_OPTIONS = [
  { label: "Manual", value: COLLECTION_TYPE.MANUAL },
  { label: "Smart", value: COLLECTION_TYPE.SMART },
];

export const COLLECTION_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active",
  ARCHIVED: "archived",
} as const;

export const COLLECTION_STATUS_OPTIONS = [
  { label: "Draft", value: COLLECTION_STATUS.DRAFT },
  { label: "Active", value: COLLECTION_STATUS.ACTIVE },
  { label: "Archived", value: COLLECTION_STATUS.ARCHIVED },
];

export const COLLECTION_RULE_CONDITION = {
  AND: "AND",
  OR: "OR",
} as const;

export const COLLECTION_RULE_CONDITION_OPTIONS = [
  { label: "And", value: COLLECTION_RULE_CONDITION.AND },
  { label: "Or", value: COLLECTION_RULE_CONDITION.OR },
];

export const COLLECTION_SORT_ORDER = {
  MANUAL: "manual",
  BEST_SELLING: "best-selling",
  PRICE_ASCENDING: "price-ascending",
  PRICE_DESCENDING: "price-descending",
  TITLE_ASCENDING: "title-ascending",
  TITLE_DESCENDING: "title-descending",
  CREATED_DESC: "created-desc",
  CREATED_ASC: "created-asc",
};

export const COLLECTION_SORT_ORDER_OPTIONS = [
  { label: "Manual", value: COLLECTION_SORT_ORDER.MANUAL },
  { label: "Best Selling", value: COLLECTION_SORT_ORDER.BEST_SELLING },
  { label: "Price Ascending", value: COLLECTION_SORT_ORDER.PRICE_ASCENDING },
  { label: "Price Descending", value: COLLECTION_SORT_ORDER.PRICE_DESCENDING },
  { label: "Title Ascending", value: COLLECTION_SORT_ORDER.TITLE_ASCENDING },
  { label: "Title Descending", value: COLLECTION_SORT_ORDER.TITLE_DESCENDING },
  { label: "Created Desc", value: COLLECTION_SORT_ORDER.CREATED_DESC },
  { label: "Created Asc", value: COLLECTION_SORT_ORDER.CREATED_ASC },
];

export const COLLECTION_RULE_FIELD = {
  PRICE: "price",
  TAG: "tag",
  TITLE: "title",
  VENDOR: "vendor",
  PRODUCT_TYPE: "productType",
};

export const COLLECTION_RULE_FIELD_OPTIONS = [
  { label: "Price", value: COLLECTION_RULE_FIELD.PRICE },
  { label: "Tag", value: COLLECTION_RULE_FIELD.TAG },
  { label: "Title", value: COLLECTION_RULE_FIELD.TITLE },
  { label: "Vendor", value: COLLECTION_RULE_FIELD.VENDOR },
  { label: "Product Type", value: COLLECTION_RULE_FIELD.PRODUCT_TYPE },
];

export const COLLECTION_OPERATOR = {
  EQUALS: "equals",
  NOT_EQUALS: "not_equals",
  CONTAINS: "contains",
  GREATER_THAN: "greater_than",
  LESS_THAN: "less_than",
} as const;

export const COLLECTION_OPERATOR_OPTIONS = [
  { label: "Equals", value: COLLECTION_OPERATOR.EQUALS },
  { label: "Not Equals", value: COLLECTION_OPERATOR.NOT_EQUALS },
  { label: "Contains", value: COLLECTION_OPERATOR.CONTAINS },
  { label: "Greater Than", value: COLLECTION_OPERATOR.GREATER_THAN },
  { label: "Less Than", value: COLLECTION_OPERATOR.LESS_THAN },
];

export const PRODUCT_EDIT_MODE_OPTIONS = [
  { label: "Basic", value: "basic" },
  { label: "Options", value: "options" },
  { label: "Variants", value: "variants" },
  { label: "SEO", value: "seo" },
  { label: "Media", value: "media" },
  { label: "Features", value: "features" },
];

export const PRODUCT_STATUS = {
  DRAFT: "draft",
  ACTIVE: "active",
  ARCHIVED: "archived",
} as const;

export const PRODUCT_STATUS_OPTIONS = [
  { label: "Draft", value: PRODUCT_STATUS.DRAFT },
  { label: "Active", value: PRODUCT_STATUS.ACTIVE },
  { label: "Archived", value: PRODUCT_STATUS.ARCHIVED },
];

export const PRODUCT_MEDIA_TYPE = {
  IMAGE: "image",
  VIDEO: "video",
} as const;

export const PRODUCT_MEDIA_TYPE_OPTIONS = [
  { label: "Image", value: PRODUCT_MEDIA_TYPE.IMAGE },
  { label: "Video", value: PRODUCT_MEDIA_TYPE.VIDEO },
];

export const BLOG_STATUS = {
  VISIBLE: "visible",
  HIDDEN: "hidden",
} as const;

export const BLOG_STATUS_OPTIONS = [
  { label: "Visible", value: BLOG_STATUS.VISIBLE },
  { label: "Hidden", value: BLOG_STATUS.HIDDEN },
];
