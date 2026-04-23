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
