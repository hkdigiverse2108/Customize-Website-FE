import { CommonDataType, MessageStatus, PageStatus } from "./common";

export interface StoreThemeConfig {
  colors: string;
  fonts: string;
  spacing: string;
}

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

export interface StoreExternalScript {
  name: string;
  src: string;
  position: string;
  isActive: boolean;
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
  themeConfig?: StoreThemeConfig;
  userId?: string;
  subdomain?: string;
  customDomain?: string;
  domainVerified?: boolean;
  isActive?: boolean;
  isPublished?: boolean;
  isBlocked?: boolean;
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
  externalScripts?: StoreExternalScript;
  socialLinks?: StoreSocialLinks;
}

export type AddStorePayload = StoreFormValues;

export type EditStorePayload = AddStorePayload & { id?: string };

export interface StoreBase extends StoreFormValues, CommonDataType {}

export interface StoreDataResponse extends PageStatus {
  stores: StoreBase[];
}

export interface StoreApiResponse extends MessageStatus {
  data: StoreDataResponse;
}

export interface StoreByIdApiResponse extends MessageStatus {
  data: StoreBase;
}
