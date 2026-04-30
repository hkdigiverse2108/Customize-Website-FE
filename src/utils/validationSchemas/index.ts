import { KYC_DOCUMENT_TYPE } from "@/data";
import * as Yup from "yup";
import { RequiredWhen, Validation } from "./validation";

/* ========================== Reusable helpers ========================== */
export const PhoneValidation = (label = "Phone No", options?: { requiredCountryCode?: boolean; requiredNumber?: boolean }) =>
  Yup.object({
    countryCode: Validation("string", "Country code", {
      required: options?.requiredCountryCode ?? true,
    }),

    phoneNo: Validation("string", label, {
      required: options?.requiredNumber ?? true,
      extraRules: (s) => s.trim().matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
    }),
  });

/* ========================== Auth ========================== */
export const SignupSchema = Yup.object({
  firstName: Validation("string", "First Name"),
  lastName: Validation("string", "Last Name"),
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
  password: Validation("string", "Password", { extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character") }),
});

export const LoginSchema = Yup.object({
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
  password: Validation("string", "Password"),
});

export const VerifyOtpSchema = Yup.object({
  otp: Validation("string", "OTP", { extraRules: (s) => s.trim().length(6, "OTP must be 6 digits") }),
});

export const ForgotPasswordSchema = Yup.object({
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
});

export const ResetPasswordSchema = Yup.object({
  password: Validation("string", "New Password", { extraRules: (s) => s.matches(/[!@#$%^&*()_+={}:;"'<>,.?/-]/, "Password must include at least one special character") }),
  confirmPassword: Validation("string", "Confirm Password")
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

/* ========================== Plan ========================== */
export const PlanSchema = Yup.object({
  name: Validation("string", "Plan Name"),
  price: Validation("number", "Price"),
  duration: Validation("string", "Duration"),
  themeLimit: Validation("number", "Theme Limit", { required: false, extraRules: (s) => s.min(1, "Theme Limit must be at least 1") }),
  productLimit: Validation("number", "Product Limit", { required: false, extraRules: (s) => s.min(1, "Product Limit must be at least 1") }),
  blogLimit: Validation("number", "Blog Limit", { required: false, extraRules: (s) => s.min(1, "Blog Limit must be at least 1") }),
  orderLimit: Validation("number", "Order Limit", { required: false, extraRules: (s) => s.min(1, "Order Limit must be at least 1") }),
  features: Validation("array", "Features", { required: false }),
  customDomainSupport: Validation("boolean", "Custom Domain Support", { required: false }),
  isActive: Validation("boolean", "Status"),
});

/* ========================== Store ========================== */
export const StoreSchema = Yup.object({
  name: Validation("string", "Store Name"),
  slug: Validation("string", "Slug", { extraRules: (s) => s.matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens") }),
  description: Validation("string", "Description", { required: false }),
  email: Validation("string", "Email", { extraRules: (s) => s.email("Invalid email address") }),
  phone: Validation("string", "Phone", { extraRules: (s) => s.trim().matches(/^[0-9]{10}$/, "Phone number must be 10 digits") }),
  subdomain: Validation("string", "Subdomain", { required: true, extraRules: (s) => s.matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Subdomain can only contain lowercase letters, numbers, and hyphens") }),
  customDomain: Validation("string", "Custom Domain", { required: false, extraRules: (s) => s.matches(/^(?!:\/\/)([a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]+)+)(:\d+)?(\/[^\s]*)?$/, "Invalid domain format") }),
  domainVerified: Validation("boolean", "Domain Verified", { required: false }),
  businessName: Validation("string", "Business Name"),
  businessType: RequiredWhen("businessName", [], "Business Type", "string"),
  gstNumber: Validation("string", "GST Number", { required: false, extraRules: (s) => s.trim().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST Number format") }),
  panNumber: Validation("string", "PAN Number", { required: false, extraRules: (s) => s.trim().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Number format") }),
  kycStatus: Validation("string", "KYC Status", { required: false }),
  kycDocuments: Yup.object({
    type: Validation("string", "Document Type", { required: false }),
    documentUrl: RequiredWhen("type", [KYC_DOCUMENT_TYPE.AADHAAR, KYC_DOCUMENT_TYPE.GST, KYC_DOCUMENT_TYPE.PAN], "Document URL", "string"),
    verified: Validation("boolean", "Verified", { required: false }),
  }),
  logo: Validation("array", "Logo", { required: false }),
  banner: Validation("array", "Banner", { required: false }),
  isPublished: Validation("boolean", "Published", { required: false }),
  isActive: Validation("boolean", "Active", { required: false }),
});
