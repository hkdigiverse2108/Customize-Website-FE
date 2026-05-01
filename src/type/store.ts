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
