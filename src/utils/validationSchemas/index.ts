import * as Yup from "yup";
import { KYC_STATUS } from "@/data";
import { Validation } from "./validation";
// import { Primitive } from "@/type";

// const RequiredWhenTrue = (dependentField: string, message: string, baseSchema: Yup.AnySchema) => {
//   return baseSchema.when(dependentField, {
//     is: true,
//     then: (schema) => schema.required(`${message} is required`),
//     otherwise: (schema) => schema.notRequired(),
//   });
// };

// const RequiredWhen = (dependentField: string, requiredValues: Primitive[], label: string, type: "string" | "number" | "array" = "string", options?: { extraRules?: (schema: Yup.AnySchema) => Yup.AnySchema }) => {
//   let schema: Yup.AnySchema;

//   // Base schema by type
//   if (type === "number") schema = Yup.number();
//   else if (type === "array") schema = Yup.array();
//   else schema = Yup.string();

//   // Apply extra rules if provided
//   if (options?.extraRules) schema = options.extraRules(schema);

//   return schema.test("required-when", `${label} is required`, (value, { from }) => {
//     const root = from?.[from.length - 1]?.value;
//     const dependentValue = root?.[dependentField];
//     const match = requiredValues.includes(dependentValue);

//     if (match) {
//       if (type === "array") return Array.isArray(value) && value.length > 0;
//       if (type === "number") return value !== undefined && value !== null;
//       return !!value;
//     }

//     return true;
//   });
// };

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
  name: Validation("string", "Store Name", { extraRules: (s) => s.trim().min(3, "Store Name must be at least 3 characters") }),
  slug: Validation("string", "Slug", { extraRules: (s) => s.matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens") } ),
  description: Validation("string", "Description", { required: false, extraRules: (s) => s.trim().max(200, "Description must be at most 200 characters") }),
  logo: Validation("array", "Logo", { required: false ,}),
  banner: Validation("array", "Banner", { required: false }),
  themeIds: Validation("array", "Themes", { required: false ,extraRules: (s) => s.min(1, "At least one theme must be selected") }),
  subdomain: Validation("string", "Subdomain", { required: false, extraRules: (s) => s.matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Subdomain can only contain lowercase letters, numbers, and hyphens") }),
  customDomain: Validation("string", "Custom Domain", { required: false ,extraRules: (s) => s.matches(/^(?!:\/\/)([a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]+)+)(:\d+)?(\/[^\s]*)?$/, "Invalid domain format") }),
  domainVerified: Validation("boolean", "Domain Verified", { required: false,extraRules: (s) => s.oneOf([true], "Domain must be verified to be active") }),
  isPublished: Validation("boolean", "Published", { required: false }),
  businessName: Validation("string", "Business Name", { extraRules: (s) => s.trim().min(3, "Business Name must be at least 3 characters") }),
  businessType: Validation("string", "Business Type", { required: false, extraRules: (s) => s.trim().min(3, "Business Type must be at least 3 characters") }),
  gstNumber: Validation("string", "GST Number", { required: false, extraRules: (s) => s.trim().matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST Number format") }),
  panNumber: Validation("string", "PAN Number", { required: false ,extraRules: (s) => s.trim().matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Number format") }),
  kycStatus: Validation("string", "KYC Status", { required: false ,extraRules: (s) => s.oneOf(Object.values(KYC_STATUS), `KYC Status must be one of: ${Object.values(KYC_STATUS).join(", ")}`) }),
  // kycDocuments: Validation("array", "KYC Documents", { required: false },extraRules: (s) => s.of(
  //   Yup.object({
  //     type: Validation("string", "Document Type", { extraRules: (s) => s.oneOf(Object.values(KYC_DOCUMENT_TYPE), `Document Type must be one of: ${Object.values(KYC_DOCUMENT_TYPE).join(", ")}`) }),
  //     documentUrl: Validation("string", "Document URL", { extraRules: (s) => s.url("Invalid URL format") }),
  //     verified: Validation("boolean", "Verified"),
  //   })
  // ) ),
  // address: Validation("object", "Address", { required: false }, extraRules: (s) => s.shape({
  //   country: Validation("string", "Country"),
  //   state: Validation("string", "State"),
  //   city: Validation("string", "City",),
  //   pincode: Validation("string", "Pincode", { extraRules: (s) => s.trim().matches(/^[0-9]{5,6}$/, "Pincode must be 5 or 6 digits") }),
  //   addressLine1: Validation("string", "Address Line 1"),
  //   addressLine2: Validation("string", "Address Line 2", { required: false }),
  //   landmark: Validation("string", "Landmark", { required: false }),
  // })),
  email: Validation("string", "Email", {required: false, extraRules: (s) => s.email("Invalid email address") }),
  phone: Validation("string", "Phone", { required: false ,extraRules: (s) => s.trim().matches(/^[0-9]{10}$/, "Phone number must be 10 digits") }),
  isActive: Validation("boolean", "Active",),
});
