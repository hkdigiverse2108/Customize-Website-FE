import { THEME_SETTING_GROUP, THEME_SETTING_TYPE } from "@/data/enm";
import { CommonDataType, MessageStatus, PageStatus } from "./common";

export type ThemeSettingType = (typeof THEME_SETTING_TYPE)[keyof typeof THEME_SETTING_TYPE];
export type ThemeSettingGroup = (typeof THEME_SETTING_GROUP)[keyof typeof THEME_SETTING_GROUP];

export interface ThemeSettingItem {
  key: string;
  value: any;
  type?: ThemeSettingType | string;
  label?: string;
  group?: ThemeSettingGroup | string;
}

export interface ThemeSchemaItem {
  key: string;
  type: ThemeSettingType | string;
  label?: string;
  options?: any[];
  group?: ThemeSettingGroup | string;
  placeholder?: string;
  validation?: any;
}

export interface PageLayoutItem {
  componentId: string;
  order: number;
  config: ThemeSettingItem[];
}

export interface PageLayout {
  page: string;
  sections: PageLayoutItem[];
}

export type ThemeLayoutJSON = PageLayout[];

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

  styles?: ThemeSettingItem[];
  layoutJSON?: ThemeLayoutJSON;
  draftLayoutJSON?: ThemeLayoutJSON;
  defaultConfig?: ThemeSettingItem[];
  breakpoints?: ThemeSettingItem[];

  componentSchema?: ThemeSchemaItem[];
  settingsSchema?: ThemeSchemaItem[];

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
