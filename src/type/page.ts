import { CommonDataType, MessageStatus, PageStatus } from "./common";

export interface PageFormValues {
  storeId?: string;
  title?: string;
  slug?: string;
  description?: string;
  type?: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string[];
  isPublished?: boolean;
  isHomePage?: boolean;
  version?: string;
  isDraft?: boolean;
  visibility?: string;
  password?: string;
  isActive?: boolean;
}

export type AddPagePayload = PageFormValues;
export type EditPagePayload = PageFormValues & { id?: string };

export interface PageBase extends PageFormValues, CommonDataType {}

export interface PageDataResponse extends PageStatus {
  pages: PageBase[];
}

export interface PageApiResponse extends MessageStatus {
  data: PageDataResponse;
}

export interface PageByIdApiResponse extends MessageStatus {
  data: PageBase;
}
