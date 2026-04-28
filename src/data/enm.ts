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
  { label: "aadhaar", value: KYC_DOCUMENT_TYPE.AADHAAR },
  { label: "pan", value: KYC_DOCUMENT_TYPE.PAN },
  { label: "gst", value: KYC_DOCUMENT_TYPE.GST },
];
