import { CommonDataType, MessageStatus, PageStatus } from "./common";

export interface BlogFormValues {
  storeId?: string;
  title?: string;
  content?: string;
  excerpt?: string;
  author?: string;
  image?: string;
  status?: string;
  tags?: string[];
  blogCategory?: string;
  themeId?: string;
  seo?: Partial<Record<"title" | "description" | "slug", string>>;
  publishedAt?: string;
  isActive?: boolean;
}

export type AddBlogPayload = BlogFormValues;
export type EditBlogPayload = BlogFormValues & { id?: string };

export interface BlogBase extends BlogFormValues, CommonDataType {}

export interface BlogDataResponse extends PageStatus {
  blogs: BlogBase[];
}

export interface BlogApiResponse extends MessageStatus {
  data: BlogDataResponse;
}

export interface BlogByIdApiResponse extends MessageStatus {
  data: BlogBase;
}
