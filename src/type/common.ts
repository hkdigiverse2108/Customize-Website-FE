import { ReactNode } from "react";

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