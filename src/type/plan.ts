import { CommonDataType, MessageStatus, PageStatus } from "./common";

export interface PlanFormValues {
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  isActive?: boolean;
}

export type AddPlanPayload = PlanFormValues;

export type EditPlanPayload = AddPlanPayload & { planId?: string };

export interface PlanBase extends PlanFormValues, CommonDataType {}

export interface PlanDataResponse extends PageStatus {
  plans: PlanBase[];
}

export interface PlanApiResponse extends MessageStatus {
  data: PlanDataResponse;
}
