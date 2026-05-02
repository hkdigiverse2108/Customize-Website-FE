import { CommonDataType, MessageStatus, PageStatus } from "./common";

export interface ComponentFormValues {
  storeId?: string;
  sourceComponentId?: string;
  name?: string;
  type?: string;
  category?: string;
  label?: string;
  icon?: string;
  previewImage?: string;
  configJSON?: string;
  defaultConfig?: string;
  configSchema?: string;
  isReusable?: boolean;
  isGlobal?: boolean;
  supportedPages?: string[];
  supportedThemes?: string[];
  version?: string;
  isDeprecated?: boolean;
  isActive?: boolean;
}

export type AddComponentPayload = ComponentFormValues;
export type EditComponentPayload = ComponentFormValues & { id?: string };

export interface ComponentBase extends ComponentFormValues, CommonDataType {}

export interface ComponentDataResponse extends PageStatus {
  components: ComponentBase[];
}

export interface ComponentApiResponse extends MessageStatus {
  data: ComponentDataResponse;
}

export interface ComponentByIdApiResponse extends MessageStatus {
  data: ComponentBase;
}
