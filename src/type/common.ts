import { ColProps } from "antd";
import { FocusEvent, ReactNode } from "react";

export type ChildrenLayout = {
  children: ReactNode;
};

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
}
