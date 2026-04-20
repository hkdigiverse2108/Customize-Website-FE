import { CommonDataType, MessageStatus, PageStatus } from "./common";

export interface SubscriptionType {
  planId?: string;
  type?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  autoRenew?: boolean;
}

export interface UserFormValues {
  firstName?: string;
  lastName?: string;
  role?: string;
  email?: string;
  trialUsed?: boolean;
  subscription?: SubscriptionType;
  isActive?: boolean;
}

export type AddUserPayload = UserFormValues;

export type EditUserPayload = AddUserPayload & { userId: string };

export interface UserBase extends UserFormValues, CommonDataType {}

export interface UserDataResponse extends PageStatus {
  user_data: UserBase[];
}

export interface UserApiResponse extends MessageStatus {
  data: UserDataResponse;
}

export interface SingleUserApiResponse extends MessageStatus {
  data: UserBase[];
}
