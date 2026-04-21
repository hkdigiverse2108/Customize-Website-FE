import { MessageStatus } from "./common";
import { UserBase } from "./user";

export type AccountType = "admin" | "vendor";
export interface SignupPayload {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginResponse extends MessageStatus {
  data: {
    token: string;
    user: UserBase;
  };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  password: string;
  confirmPassword?: string;
}
