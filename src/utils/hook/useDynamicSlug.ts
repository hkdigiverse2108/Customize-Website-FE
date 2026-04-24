"use client";

import { useParams } from "next/navigation";

export const useDynamicSlug = <T extends readonly string[]>(keys: T): { all: string[] } & { [K in T[number]]?: string } => {
  const params = useParams();

  const firstKey = Object.keys(params || {})[0];
  const values = (params?.[firstKey] || []) as string[];

  const mapped = {} as { [K in T[number]]?: string };

  keys.forEach((key, index) => {
    mapped[key as T[number]] = values[index];
  });

  return {
    all: values,
    ...mapped,
  };
};
