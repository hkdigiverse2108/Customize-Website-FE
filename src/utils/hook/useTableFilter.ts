import { useCallback, useMemo, useState } from "react";
import type { TablePaginationConfig, SorterResult } from "antd/es/table/interface";
import type { FilterValue } from "antd/es/table/interface";
import { CleanParams } from "..";
import { useDebounce } from "./useDebounce";

interface UseAntdTableOptions {
  page?: number;
  pageSize?: number;
  initialSortField?: string;
  initialSortOrder?: "ascend" | "descend";
  active?: boolean;
  debounceDelay?: number;
  pagination?: boolean;
  defaultFilterKey?: Record<string, string[]>;
}

export const useTableFilter = ({ page = 1, pageSize = 10, initialSortField, initialSortOrder, active = true, debounceDelay = 300, pagination = true, defaultFilterKey = {} }: UseAntdTableOptions = {}) => {
  /* ---------------- Pagination ---------------- */
  const [paginationModel, setPaginationModel] = useState<TablePaginationConfig>({ current: page, pageSize });

  /* ---------------- Sorting ---------------- */
  const [sorter, setSorter] = useState<SorterResult<any>>({ field: initialSortField, order: initialSortOrder });

  /* ---------------- Active ---------------- */
  const [isActive, setActive] = useState<boolean>(true);

  /* ---------------- Search ---------------- */
  const [search, setSearch] = useState<string>("");

  const debouncedSearch = useDebounce(search, debounceDelay);

  /* ---------------- Filters ---------------- */
  const [filters, setFilters] = useState<Record<string, FilterValue>>({});

  /* ---------------- Advanced Filters ---------------- */
  const [advancedFilter, setAdvancedFilter] = useState<Record<string, string[]>>(defaultFilterKey);

  const normalizeFilterValue = (value?: string[]) => {
    if (!value || value.length === 0) return undefined;
    return value.length === 1 ? value[0] : value;
  };

  const normalizedAdvancedFilter = Object.fromEntries(Object.entries(advancedFilter).map(([key, value]) => [key, normalizeFilterValue(value)]));

  const updateAdvancedFilter = (key: string, value: string[]) => {
    setAdvancedFilter((prev) => ({ ...prev, [key]: value }));
  };

  /* ---------------- Delete ---------------- */
  const [rowToDelete, setRowToDelete] = useState<{ _id?: string; title?: string } | null>(null);

  /* ---------------- Table Change Handler ---------------- */
  const handleTableChange = useCallback((pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>, sorter: SorterResult<any> | SorterResult<any>[]) => {
    setPaginationModel(pagination);
    const cleanedFilters: Record<string, FilterValue> = Object.fromEntries(Object.entries(filters).filter(([_, value]) => value !== null)) as Record<string, FilterValue>;

    setFilters(cleanedFilters);

    if (!Array.isArray(sorter)) {
      setSorter(sorter);
    }
  }, []);

  /* ---------------- API Params ---------------- */
  const params = useMemo(() => {
    return CleanParams({
      ...(pagination && {
        page: paginationModel.current,
        limit: paginationModel.pageSize,
      }),
      ...(active && { activeFilter: isActive }),
      ...normalizedAdvancedFilter,

      // Sorting
      sortField: sorter.field,
      sortOrder: sorter.order === "ascend" ? 1 : sorter.order === "descend" ? -1 : undefined,

      // Filters
      ...filters,

      // Search
      search: debouncedSearch,
    });
  }, [paginationModel, sorter, filters, debouncedSearch, isActive, normalizedAdvancedFilter, active, pagination]);

  /* ---------------- Reset ---------------- */
  const resetModels = useCallback(() => {
    setPaginationModel({ current: page, pageSize });
    setSorter({ field: initialSortField, order: initialSortOrder });
    setFilters({});
    setSearch("");
  }, [page, pageSize, initialSortField, initialSortOrder]);

  return {
    paginationModel,
    setPaginationModel,

    sorter,
    setSorter,

    filters,
    setFilters,

    search,
    setSearch,

    rowToDelete,
    setRowToDelete,

    isActive,
    setActive,

    advancedFilter,
    updateAdvancedFilter,

    handleTableChange,

    params,
    resetModels,
  };
};
