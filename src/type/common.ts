import { ColProps } from "antd";
import { FocusEvent, ReactNode } from "react";
import * as Yup from "yup";

export type ChildrenLayout = {
  children: ReactNode;
};

export type NoSsrProps = ChildrenLayout;

export interface Params {
  [key: string]: any;
}

export type SelectOptionType = {
  label: string;
  value: string;
  [key: string]: any;
};

export type GridType = number | object | "auto" | "grow";

export interface CommonProfileAvatarProps {
  fullName?: string;
  profileImage?: string;
  className?: string;
}

export interface CommonValidationTextFieldProps {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  clearable?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  showPasswordToggle?: boolean;
  disabled?: boolean;
  helperText?: string;
  multiline?: boolean;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  maxDigits?: number;
  className?: string;
  col?: ColProps;
  isOtp?: boolean;
}

export interface PageState {
  page: number;
  limit: number;
  totalPages: number;
}

export interface PageStatus {
  totalData: number;
  state: PageState;
}

export interface MessageStatus {
  status: number;
  message: string;
  error: Record<string, unknown>;
}

export interface CommonDataType {
  _id: string;
  isDeleted: boolean;
  createdBy: null;
  updatedBy: null;
  createdAt: string;
  updatedAt: string;
  isActive?: boolean;
}

/* ========================== Auth ========================== */

export type Primitive = string | number;
export type DepValue = Primitive | Primitive[] | undefined;

export type FieldSchemaArgs<K extends keyof FieldTypeMap> = [type: K, options?: FieldOptions<FieldTypeMap[K]>] | [type: K, label: string, options?: FieldOptions<FieldTypeMap[K]>];

export type FieldTypeMap = {
  string: Yup.StringSchema<string | null | undefined>;
  number: Yup.NumberSchema<number | null | undefined>;
  boolean: Yup.BooleanSchema<boolean | null | undefined>;
  array: Yup.ArraySchema<any[], Yup.AnyObject>;
};

export interface FieldOptions<T> {
  required?: boolean;
  extraRules?: (schema: T) => T;
  minItems?: number;
}
