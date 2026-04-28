import { ButtonProps, CardProps, ColProps, RowProps, SelectProps, TablePaginationConfig, TableProps } from "antd";
import { CSSProperties, FocusEvent, ReactNode } from "react";
import * as Yup from "yup";

export type ChildrenLayout = {
  children: ReactNode;
};

export type NoSsrProps = ChildrenLayout;

export type Params = Record<string, unknown>;

export type SelectOptionType = {
  label: string;
  value: string;
  [key: string]: unknown;
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

export interface CommonValidationSwitchProps {
  name: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  syncFieldName?: string;
  onChange?: (checked: boolean) => void;
  col?: ColProps;
  loading?: boolean;
}

export interface CommonValidationSelectProps extends SelectProps {
  name: string;
  label?: string;
  options: SelectOptionType[];
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  syncFieldName?: string;
  isLoading?: boolean;
  searchKeys?: string[];
  onChange?: (value: string[]) => void;
  col?: ColProps;
  mode?: SelectProps["mode"];
}

export interface CommonButtonProps extends ButtonProps {
  children?: ReactNode;
  title?: string;
  col?: ColProps;
  style?: CSSProperties;
}

export interface CommonBottomActionBarProps {
  isLoading?: boolean;
  save?: boolean;
  disabled?: boolean;
  onSave?: () => void;
}

/* ========================== Form ========================== */

export interface CommonFormSectionProps {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
  row?:RowProps
}

export interface PageState {
  page: number;
  limit: number;
  page_limit: number;
}

export interface PageStatus {
  total_count: number;
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

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  number?: number;
  children?: { name: string; path: string; pro?: boolean; new?: boolean; number?: number }[];
};

export interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  width?: number;
  closable?: boolean;
}
export interface CommonDeleteModalProps {
  open: boolean;
  title?: string;
  description?: string;
  itemName?: string;
  loading?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
}

/* ========================== Auth ========================== */

export type Primitive = string | number;
export type DepValue = Primitive | Primitive[] | undefined;

export type FieldSchemaArgs<K extends keyof FieldTypeMap> = [type: K, options?: FieldOptions<FieldTypeMap[K]>] | [type: K, label: string, options?: FieldOptions<FieldTypeMap[K]>];

export type FieldTypeMap = {
  string: Yup.StringSchema<string | null | undefined>;
  number: Yup.NumberSchema<number | null | undefined>;
  boolean: Yup.BooleanSchema<boolean | null | undefined>;
  array: Yup.ArraySchema<unknown[], Yup.AnyObject>;
};

export interface FieldOptions<T> {
  required?: boolean;
  extraRules?: (schema: T) => T;
  minItems?: number;
}

/* ========================== Card ========================== */
export interface CommonCardProps {
  children: ReactNode;
  col?: ColProps;
  cardProps?: CardProps;
  handleAdd?: () => void;
}

/* ========================== Table ========================== */

export interface CommonTableProps<T> extends TableProps<T> {
  loading?: boolean;
  dataSource: T[];
  columns: TableProps<T>["columns"];
  pagination?: TablePaginationConfig;
  onSearch?: { value: string; onChange: (value: string) => void };
  onActive?: { value: boolean; onChange: (value: boolean) => void };
}

export type ColumnFormatType = "default" | "phone" | "date" | "datetime" | "format" | "status" | "createdBy";

export interface CommonObjectNameColumnOptions {
  title?: string;
  width?: number;
  ellipsis?: boolean;
  type?: ColumnFormatType;
}

export interface TableFilterOptions {
  page?: number;
  pageSize?: number;
  initialSortField?: string;
  initialSortOrder?: "ascend" | "descend";
  active?: boolean;
  debounceDelay?: number;
  pagination?: boolean;
  defaultFilterKey?: Record<string, string[]>;
}

export interface CommonActionColumnProps<T> {
  onActive?: { onHandle: (row: T) => void; isPermission?: (row: T) => boolean };
  onEdit?: { onHandle: (row: T) => void; isPermission?: (row: T) => boolean };
  onDelete?: { onHandle: (row: T) => void; isPermission?: (row: T) => boolean };
}

/* ========================== Upload ========================== */

export interface UploadResponse extends MessageStatus {
  data: string[];
}

export interface CommonImageBoxProps {
  name: string;
  label: string;
  type: "image" | "pdf";
  col?: ColProps;
  required?: boolean;
  multiple?: boolean;
}
