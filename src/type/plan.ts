import { CommonDataType, MessageStatus, PageStatus } from "./common";

export interface PlanFormValues {
  name?: string;
  price?: number;
  duration?: string;
  themeLimit?: number;
  productLimit?: number;
  blogLimit?: number;
  orderLimit?: number;
  features?: string[];
  customDomainSupport?: boolean;
  isActive?: boolean;
}

export type AddPlanPayload = PlanFormValues;

export type EditPlanPayload = AddPlanPayload & { id?: string };

export interface PlanBase extends PlanFormValues, CommonDataType {}

export interface PlanDataResponse extends PageStatus {
  plans: PlanBase[];
}

export interface PlanApiResponse extends MessageStatus {
  data: PlanDataResponse;
}

export interface PlanByIdApiResponse extends MessageStatus {
  data: PlanBase;
}
