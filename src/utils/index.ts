export * from "./validationSchemas";
export * from "./cookies";
export * from "./noSsr";
export * from "./hook";

import { GridType, Params, SelectOptionType } from "@/type";
import { Cookie } from "./cookies";
import { STORAGE_KEYS } from "@/constants";

export const Stringify = (value: object): string => {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
};

export const getToken = () => Cookie.get(STORAGE_KEYS.TOKEN);

export const CleanParams = (params?: Params): Params | undefined => {
  if (!params) return undefined;

  return Object.fromEntries(Object.entries(params).filter(([, value]) => value !== undefined && value !== null && value !== ""));
};

export const GenerateOptions = (data?: { _id: string; name?: string; firstName?: string; lastName?: string; title?: string; fullName?: string; orderNo?: string | null; estimateNo?: string | null }[]) => {
  if (!data || !Array.isArray(data)) return [];

  return data.map((item) => {
    const label = item.name?.trim() || [item.firstName, item.lastName].filter(Boolean).join(" ") || item.title?.trim() || item.fullName?.trim() || item.orderNo?.trim() || item.estimateNo?.trim() || "Unnamed";

    return {
      value: item._id,
      label:
        label
          ?.toLowerCase()
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ") || "",
    };
  });
};

export const CreateFilter = (label: string, filterKey: string, advancedFilter: Record<string, string[]>, updateAdvancedFilter: (key: string, value: string[]) => void, options: SelectOptionType[], isLoading?: boolean, grid?: GridType, multiple?: boolean, limitTags?: number) => ({
  label,
  options,
  value: advancedFilter[filterKey] || [],
  multiple,
  limitTags,
  onChange: (val: string[]) => updateAdvancedFilter(filterKey, val),
  grid,
  isLoading,
});

export const FormatPayment = (text?: string) =>
  text
    ? text
        .toLowerCase()
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "-";

export const FormatCountryCode = (code?: string) => {
  if (!code) return "";
  return code.startsWith("+") ? code : `+${code}`;
};
