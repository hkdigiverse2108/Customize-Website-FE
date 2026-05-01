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
