import { CommonDataType, MessageStatus, PageStatus } from "./common";

export interface CollectionFormValues {
  storeId?: string;
  title?: string;
  handle?: string;
  type?: string;
  status?: string;
  isPublished?: boolean;
  publishedAt?: string;
  description?: string;
  productIds?: string[];
  rules?: Partial<Record<"field" | "operator" | "value", string>>[];
  ruleCondition?: string;
  sortOrder?: string;
  image?: Partial<Record<"url" | "alt", string>>;
  seo?: Partial<Record<"title" | "description" | "date", string>>;
  tags?: string[];
  isActive?: boolean;
}

export type AddCollectionPayload = CollectionFormValues;
export type EditCollectionPayload = CollectionFormValues & { id?: string };
export type CollectionBase = CollectionFormValues & CommonDataType;

export interface CollectionDataResponse extends PageStatus {
  collections: CollectionBase[];
}

export interface CollectionApiResponse extends MessageStatus {
  data: CollectionDataResponse;
}

export interface CollectionByIdApiResponse extends MessageStatus {
  data: CollectionBase;
}
