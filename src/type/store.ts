import { CommonDataType, MessageStatus, PageStatus } from "./common";

export interface StoreKycDocument {
  type: string;
  documentUrl: string;
  verified: boolean;
}

export interface StoreAddress {
  country: string;
  state: string;
  city: string;
  pincode: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
}

export interface StoreSocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
}

export interface StoreFormValues {
  name?: string;
  slug?: string;
  description?: string;
  logo?: string[];
  banner?: string[];
  themeIds?: string[];
  userId?: string;
  subdomain?: string;
  customDomain?: string;
  domainVerified?: boolean;
  isActive?: boolean;
  isPublished?: boolean;
  businessName?: string;
  businessType?: string;
  gstNumber?: string;
  panNumber?: string;
  kycStatus?: string;
  kycDocuments?: StoreKycDocument;
  address?: StoreAddress;
  email?: string;
  phone?: string;
  totalProducts?: number;
  totalOrders?: number;
  totalRevenue?: number;
  socialLinks?: StoreSocialLinks;
}

export type AddStorePayload = StoreFormValues;

export type EditStorePayload = AddStorePayload & { id?: string };

export interface StoreBase extends StoreFormValues, CommonDataType {}

export interface StoreDataResponse extends PageStatus {
  stores: StoreBase[];
}

export interface StoreSettingFormValues {
  name?: string;
  email?: string;
  phone?: string;
  logo?: string[];
  banner?: string[];
  favicon?: string[];
  address?: {
    line1?: string;
    line2?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  socialLinks?: StoreSocialLinks;
}

export interface StoreApiResponse extends MessageStatus {
  data: StoreDataResponse;
}

export interface StoreByIdApiResponse extends MessageStatus {
  data: StoreBase;
}

export interface DomainSettingFormValues {
  domain: string;
  isPrimary: boolean;
  themeId?: string;
}

export interface DomainSettingPayload extends DomainSettingFormValues {
  storeId: string;
  domainSettingId?: string; // For updates
}

export interface DomainSettingResponse extends CommonDataType, DomainSettingFormValues {
  storeId: string;
  status: string;
  sslEnabled: boolean;
  dnsRecords: any[];
}

export interface PaymentSettingFormValues {
  isGlobal?: boolean;
  razorpayApiKey?: string;
  razorpayApiSecret?: string;
  isRazorpay?: boolean;
  phonePeApiKey?: string;
  phonePeApiSecret?: string;
  phonePeVersion?: string;
  isPhonePe?: boolean;
  paymentMethods?: string[];
}

export interface PaymentSettingResponse extends CommonDataType, PaymentSettingFormValues {
  storeId?: string;
}

export interface ShippingRate {
  name: string;
  price: number;
  minOrderValue?: number;
  maxOrderValue?: number;
}

export interface ShippingSettingFormValues {
  zoneName: string;
  countries: string[];
  rates: ShippingRate[];
  isActive?: boolean;
}

export interface ShippingSettingPayload extends ShippingSettingFormValues {
  storeId: string;
  shippingSettingId?: string;
}

export interface ShippingSettingResponse extends CommonDataType, ShippingSettingFormValues {
  storeId: string;
}

export interface TaxSettingFormValues {
  taxEnabled?: boolean;
  taxName?: string;
  taxPercentage?: number;
  isTaxIncluded?: boolean;
  gstNumber?: string;
}

export interface TaxSettingResponse extends CommonDataType, TaxSettingFormValues {
  storeId?: string;
}

export interface CheckoutSettingFormValues {
  customerAccounts?: string;
  contactMethod?: string;
  allowGuestCheckout?: boolean;
  requirePhoneNumber?: boolean;
  companyNameField?: string;
  addressLine2Field?: string;
  orderProcessing?: {
    useShippingAsBillingByDefault?: boolean;
    enableAddressAutocompletion?: boolean;
  };
  abandonedCart?: {
    enabled?: boolean;
    sendEmailAfterHours?: number;
  };
}

export interface CheckoutSettingResponse extends CommonDataType, CheckoutSettingFormValues {
  storeId?: string;
}

export interface MailSettingFormValues {
  provider?: string;
  host?: string;
  port?: number;
  secure?: boolean;
  auth?: {
    user?: string;
    pass?: string;
  };
  fromEmail?: string;
  fromName?: string;
}

export interface MailSettingResponse extends CommonDataType, MailSettingFormValues {
  storeId?: string;
}

export interface NotificationToggles {
  orderPlaced?: boolean;
  orderCancelled?: boolean;
  orderShipped?: boolean;
  paymentSuccess?: boolean;
  lowStockAlert?: boolean;
}

export interface NotificationSettingFormValues {
  emailNotifications?: NotificationToggles;
  smsNotifications?: NotificationToggles;
  senderEmail?: string;
  senderName?: string;
}

export interface NotificationSettingResponse extends CommonDataType, NotificationSettingFormValues {
  storeId?: string;
}

export interface RegionSettingFormValues {
  currency?: string;
  currencySymbol?: string;
  timezone?: string;
  unitSystem?: string;
  weightUnit?: string;
  lengthUnit?: string;
}

export interface RegionSettingResponse extends CommonDataType, RegionSettingFormValues {
  storeId?: string;
}

export interface SEOSettingFormValues {
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  googleAnalyticsId?: string;
  facebookPixelId?: string;
}

export interface SEOSettingResponse extends CommonDataType, SEOSettingFormValues {
  storeId?: string;
}

export interface VisualSettingFormValues {
  favicon?: string;
  customCSS?: string;
  customJS?: string;
  passwordProtection?: {
    enabled?: boolean;
    password?: string;
    message?: string;
  };
  checkoutPage?: {
    banner?: string;
    logo?: string;
    accentColor?: string;
  };
}

export interface VisualSettingResponse extends CommonDataType, VisualSettingFormValues {
  storeId?: string;
}

import { PageLayout, ThemeLayoutJSON, ThemeSettingItem } from "./theme";

export interface ThemeSettingFormValues {
  themeId: string;
  customLayoutJSON?: ThemeLayoutJSON;
  draftLayoutJSON?: ThemeLayoutJSON;
  customStyles?: ThemeSettingItem[];
  customSettings?: ThemeSettingItem[];
  baseVersion?: string;
}

export interface ThemeSettingResponse extends CommonDataType, ThemeSettingFormValues {
  storeId: string;
}
