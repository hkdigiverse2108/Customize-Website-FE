import { AppQueryOptions, CombinedErrorResponse } from "@/type";
import { QueryKey, useQuery } from "@tanstack/react-query";

export function useQueries<T, P = void>(queryKey: QueryKey, callback: (param?: P) => Promise<T>, options?: AppQueryOptions<T>) {
  return useQuery<T, CombinedErrorResponse, T, QueryKey>({
    queryKey,
    queryFn: async () => await callback(),
    refetchOnWindowFocus: false,
    placeholderData: (previousData) => previousData,
    retry: 0,
    staleTime: 1000 * 60,
    ...options,
  });
}
