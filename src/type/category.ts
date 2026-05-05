import { CommonDataType, MessageStatus, PageStatus } from "./common";

export interface CategoryFormValues {
  storeId?: string;
  name?: string;
  slug?: string;
  description?: string;
  image?: string;
  parentCategoryId?: string;
  isActive?: boolean;
}

export type AddCategoryPayload = CategoryFormValues;
export type EditCategoryPayload = CategoryFormValues & { id?: string };

export interface CategoryBase extends CategoryFormValues, CommonDataType {}

export interface CategoryDataResponse extends PageStatus {
  categories: CategoryBase[];
}

export interface CategoryApiResponse extends MessageStatus {
  data: CategoryDataResponse;
}

export interface CategoryByIdApiResponse extends MessageStatus {
  data: CategoryBase;
}
