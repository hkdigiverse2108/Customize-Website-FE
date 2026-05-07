import { CommonDataType, MessageStatus, PageStatus } from "./common";

export type ProductOptionType = Partial<Record<"name", string>> & Record<"values", string[]>;

export type ProductInventoryType = Partial<Record<"quantity" | "lowStockThreshold", number> & Record<"trackQuantity" | "allowBackorder", boolean>>;

export type ProductVariantsType = Partial<Record<"title" | "sku" | "barcode" | "image", string> & Record<"price" | "comparePrice" | "costPrice", number>> & {
  optionValues: Partial<Record<"name" | "value", string>>[];
  inventory?: ProductInventoryType;
  isActive?: boolean;
};

export type ProductMediaType = Partial<Record<"url" | "type" | "alt", string>> & Record<"position", number>;

export interface ProductFormValues {
  storeId?: string;
  title?: string;
  slug?: string;
  description?: string;
  shortDescription?: string;
  status?: string;
  vendor?: string;
  productType?: string;
  tags?: string[];
  price?: number;
  comparePrice?: number;
  costPrice?: number;
  currency?: string;
  options?: ProductOptionType[];
  variants?: ProductVariantsType[];
  hasVariants?: boolean;
  media?: ProductMediaType[];
  thumbnail?: string;
  categoryIds?: string[];
  collectionIds?: string[];
  seo?: Partial<Record<"title" | "description", string>>;
  rating?: number;
  reviewCount?: number;
  publishedAt?: string;
  isActive?: boolean;
}

export type AddProductPayload = ProductFormValues;
export type EditProductPayload = ProductFormValues & { id?: string };

export interface ProductBase extends ProductFormValues, CommonDataType {}

export interface ProductDataResponse extends PageStatus {
  products: ProductBase[];
}

export interface ProductApiResponse extends MessageStatus {
  data: ProductDataResponse;
}

export interface ProductByIdApiResponse extends MessageStatus {
  data: ProductBase;
}
