import { CommonDataType, MessageStatus, PageStatus } from "./common";

export interface LayoutFieldArrayProps {
  name: string;
  title: string;
}

type SectionItem = {
  componentId: string;
  order: number;
  config: Record<string, any>;
};

export type LayoutSections = "header" | "footer" | "home" | "product" | "category" | "cart" | "checkout" | "custom" | "collection" | "blog";

export interface ThemeStyles {
  colors?: Record<"primary" | "secondary" | "background" | "text", string>;
  fonts?: Record<"heading" | "body", string>;
  layout?: Record<"containerWidth" | "spacing", string>;
}

export type ThemeLayoutJSON = Record<LayoutSections, SectionItem[]>;

export interface ThemeFormValues {
  name?: string;
  slug?: string;
  description?: string;
  previewImage?: string;
  demoUrl?: string;
  category?: string;
  tags?: string[];
  type?: string;
  storeId?: string;

  isGlobal?: boolean;
  isPremium?: boolean;
  isActive?: boolean;
  isResponsive?: boolean;
  seoFriendly?: boolean;
  lazyLoadEnabled?: boolean;

  price?: number;
  performanceScore?: number;

  styles?: ThemeStyles;
  layoutJSON?: ThemeLayoutJSON;
  draftLayoutJSON?: ThemeLayoutJSON;
  defaultConfig?: Partial<Record<"colors" | "fonts" | "spacing" | "buttons", string>>;
  breakpoints?: Partial<Record<"mobile" | "tablet" | "desktop", number>>;

  supportedComponents?: string[];
  supportedPages?: string[];

  version?: string;
  changelog?: Partial<Record<"version" | "changes" | "date", string>>[];
  authorName?: string;
}

export type AddThemePayload = ThemeFormValues;
export type EditThemePayload = ThemeFormValues & { id?: string };

export interface ThemeBase extends ThemeFormValues, CommonDataType {}

export interface ThemeDataResponse extends PageStatus {
  themes: ThemeBase[];
}

export interface ThemeApiResponse extends MessageStatus {
  data: ThemeDataResponse;
}

export interface ThemeByIdApiResponse extends MessageStatus {
  data: ThemeBase;
}
