import { KYC_DOCUMENT_TYPE } from "@/data";
import * as Yup from "yup";
import { CreateConditionalSchema, RequiredWhen, Validation } from "./validation";

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

/* ========================== Theme ========================== */
export const ThemeSchema = Yup.object({
  name: Validation("string", "Theme Name"),
  slug: Validation("string", "Slug", { extraRules: (s) => s.matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens") }),
});

/* ========================== Component ========================== */

export const ComponentSchema = Yup.object({
  name: Validation("string", "Component Name"),
  type: Validation("string", "Component Type"),
  configJSON: Yup.array().of(
    CreateConditionalSchema([
      { name: "key", type: "string" },
      { name: "value", type: "string" },
      { name: "type", type: "string" },
      { name: "label", type: "string" },
      { name: "group", type: "string" },
    ]),
  ),
  defaultConfig: Yup.array().of(
    CreateConditionalSchema([
      { name: "key", type: "string" },
      { name: "value", type: "string" },
      { name: "type", type: "string" },
      { name: "label", type: "string" },
      { name: "group", type: "string" },
    ]),
  ),
  configSchema: Yup.array().of(
    CreateConditionalSchema([
      { name: "key", type: "string" },
      { name: "label", type: "string" },
      { name: "placeholder", type: "string" },
      { name: "options", type: "array" },
      { name: "type", type: "string" },
      { name: "group", type: "string" },
    ]),
  ),
});

/* ========================== Category ========================== */

export const CategorySchema = Yup.object({
  name: Validation("string", "Category Name"),
  slug: Validation("string", "Slug", { extraRules: (s) => s.matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens") }),
});

/* ========================== Page ========================== */

export const PageSchema = Yup.object({
  storeId: Validation("string", "Store"),
  title: Validation("string", "Page title"),
  slug: Validation("string", "Slug", { extraRules: (s) => s.matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug can only contain lowercase letters, numbers, and hyphens") }),
});

/* ========================== Collection ========================== */

export const CollectionSchema = Yup.object({
  storeId: Validation("string", "Store"),
  title: Validation("string", "Collection title"),
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

export const StoreSettingSchema = Yup.object({
  name: Validation("string", "Store Name", { required: false }),
  email: Validation("string", "Email", { required: false, extraRules: (s) => s.email("Invalid email address") }),
  phone: Validation("string", "Phone", { required: false, extraRules: (s) => s.trim().matches(/^[0-9]{10}$/, "Phone number must be 10 digits") }),
  logo: Validation("array", "Logo", { required: false }),
  banner: Validation("array", "Banner", { required: false }),
  favicon: Validation("array", "Favicon", { required: false }),
  address: Yup.object({
    line1: Validation("string", "Address Line 1", { required: false }),
    line2: Validation("string", "Address Line 2", { required: false }),
    city: Validation("string", "City", { required: false }),
    state: Validation("string", "State", { required: false }),
    zipCode: Validation("string", "Zip Code", { required: false }),
    country: Validation("string", "Country", { required: false }),
  }),
  socialLinks: Yup.object({
    facebook: Validation("string", "Facebook", { required: false }),
    instagram: Validation("string", "Instagram", { required: false }),
    twitter: Validation("string", "Twitter", { required: false }),
    youtube: Validation("string", "YouTube", { required: false }),
    linkedin: Validation("string", "LinkedIn", { required: false }),
  }),
});

export const DomainSettingSchema = Yup.object({
  domain: Validation("string", "Domain Name", { required: true, extraRules: (s) => s.matches(/^(?!:\/\/)([a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]+)+)(:\d+)?(\/[^\s]*)?$/, "Invalid domain format. Example: www.mystore.com") }),
  isPrimary: Validation("boolean", "Primary Domain", { required: false }),
});

export const PaymentSettingSchema = Yup.object({
  isGlobal: Validation("boolean", "Global Setting", { required: false }),
  razorpayApiKey: Validation("string", "Razorpay API Key", { required: false }),
  razorpayApiSecret: Validation("string", "Razorpay API Secret", { required: false }),
  isRazorpay: Validation("boolean", "Enable Razorpay", { required: false }),
  phonePeApiKey: Validation("string", "PhonePe API Key", { required: false }),
  phonePeApiSecret: Validation("string", "PhonePe API Secret", { required: false }),
  phonePeVersion: Validation("string", "PhonePe Version", { required: false }),
  isPhonePe: Validation("boolean", "Enable PhonePe", { required: false }),
  paymentMethods: Validation("array", "Payment Methods", { required: false }),
});

export const ShippingSettingSchema = Yup.object({
  zoneName: Validation("string", "Zone Name", { required: true }),
  countries: Validation("array", "Countries", { required: false }),
  rates: Yup.array()
    .of(
      Yup.object({
        name: Validation("string", "Rate Name", { required: true }),
        price: Validation("number", "Price", { required: true, extraRules: (s) => s.min(0, "Price cannot be negative") }),
        minOrderValue: Validation("number", "Min Order Value", { required: false, extraRules: (s) => s.min(0, "Cannot be negative") }),
        maxOrderValue: Validation("number", "Max Order Value", { required: false, extraRules: (s) => s.min(0, "Cannot be negative") }),
      }),
    )
    .min(1, "At least one rate is required"),
  isActive: Validation("boolean", "Status", { required: false }),
});

export const TaxSettingSchema = Yup.object({
  taxEnabled: Validation("boolean", "Enable Tax", { required: false }),
  taxName: Validation("string", "Tax Name", { required: true }),
  taxPercentage: Validation("number", "Tax Percentage", { required: true, extraRules: (s) => s.min(0, "Cannot be less than 0").max(100, "Cannot be more than 100") }),
  isTaxIncluded: Validation("boolean", "Prices Include Tax", { required: false }),
  gstNumber: Validation("string", "GST Number", { required: false }),
});

export const CheckoutSettingSchema = Yup.object({
  customerAccounts: Validation("string", "Customer Accounts", { required: false }),
  contactMethod: Validation("string", "Contact Method", { required: false }),
  allowGuestCheckout: Validation("boolean", "Guest Checkout", { required: false }),
  requirePhoneNumber: Validation("boolean", "Require Phone Number", { required: false }),
  companyNameField: Validation("string", "Company Name Field", { required: false }),
  addressLine2Field: Validation("string", "Address Line 2 Field", { required: false }),
  orderProcessing: Yup.object({
    useShippingAsBillingByDefault: Validation("boolean", "Use Shipping As Billing", { required: false }),
    enableAddressAutocompletion: Validation("boolean", "Address Autocompletion", { required: false }),
  }),
  abandonedCart: Yup.object({
    enabled: Validation("boolean", "Abandoned Cart Emails", { required: false }),
    sendEmailAfterHours: Validation("number", "Send Email After Hours", { required: false }),
  }),
});

export const MailSettingSchema = Yup.object({
  provider: Validation("string", "Provider", { required: true }),
  host: RequiredWhen("provider", ["smtp"], "Host", "string"),
  port: RequiredWhen("provider", ["smtp"], "Port", "number"),
  secure: Validation("boolean", "Secure", { required: false }),
  auth: Yup.object({
    user: Validation("string", "Username", { required: true }),
    pass: Validation("string", "Password", { required: true }),
  }),
  fromEmail: Validation("string", "From Email", { required: true, extraRules: (s) => s.email("Invalid email address") }),
  fromName: Validation("string", "From Name", { required: true }),
});

const togglesSchema = Yup.object({
  orderPlaced: Validation("boolean", "Order Placed", { required: false }),
  orderCancelled: Validation("boolean", "Order Cancelled", { required: false }),
  orderShipped: Validation("boolean", "Order Shipped", { required: false }),
  paymentSuccess: Validation("boolean", "Payment Success", { required: false }),
  lowStockAlert: Validation("boolean", "Low Stock Alert", { required: false }),
});

export const NotificationSettingSchema = Yup.object({
  emailNotifications: togglesSchema,
  smsNotifications: togglesSchema,
  senderEmail: Validation("string", "Sender Email", { required: false, extraRules: (s) => s.email("Invalid email address") }),
  senderName: Validation("string", "Sender Name", { required: false }),
});

export const RegionSettingSchema = Yup.object({
  currency: Validation("string", "Currency", { required: true }),
  currencySymbol: Validation("string", "Currency Symbol", { required: true }),
  timezone: Validation("string", "Timezone", { required: true }),
  unitSystem: Validation("string", "Measurement System", { required: true }),
  weightUnit: Validation("string", "Weight Unit", { required: true }),
  lengthUnit: Validation("string", "Length Unit", { required: true }),
});

export const SEOSettingSchema = Yup.object({
  metaTitle: Validation("string", "Meta Title", { required: false }),
  metaDescription: Validation("string", "Meta Description", { required: false }),
  metaKeywords: Validation("array", "Meta Keywords", { required: false }),
  googleAnalyticsId: Validation("string", "Google Analytics ID", { required: false }),
  facebookPixelId: Validation("string", "Facebook Pixel ID", { required: false }),
});

export const VisualSettingSchema = Yup.object({
  favicon: Validation("string", "Favicon", { required: false }),
  customCSS: Validation("string", "Custom CSS", { required: false }),
  customJS: Validation("string", "Custom JS", { required: false }),
  passwordProtection: Yup.object({
    enabled: Validation("boolean", "Enabled", { required: false }),
    password: Validation("string", "Password", { required: false }),
    message: Validation("string", "Message", { required: false }),
  }),
  checkoutPage: Yup.object({
    banner: Validation("string", "Banner", { required: false }),
    logo: Validation("string", "Logo", { required: false }),
    accentColor: Validation("string", "Accent Color", { required: false }),
  }),
});

export const ThemeSettingSchema = Yup.object({
  themeId: Validation("string", "Theme", { required: true }),
  customStyles: Yup.array()
    .of(
      Yup.object({
        key: Yup.string().required(),
        value: Yup.mixed().required(),
      }),
    )
    .optional(),
  customSettings: Yup.array()
    .of(
      Yup.object({
        key: Yup.string().required(),
        value: Yup.mixed().required(),
      }),
    )
    .optional(),
});
