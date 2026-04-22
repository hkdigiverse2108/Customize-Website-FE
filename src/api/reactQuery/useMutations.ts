import { CommonNotification, ErrorMessage } from "@/attribute";
import { HTTP_STATUS } from "@/constants";
import { useAppDispatch } from "@/store/hooks";
import { setSignOut } from "@/store/slices/AuthSlice";
import { CombinedErrorResponse } from "@/type";
import { useMutation, useQueryClient, type InvalidateQueryFilters, type QueryKey, type UseMutationOptions } from "@tanstack/react-query";

export function useMutations<TInput, TResponse>(mutationKey: QueryKey, callback: (input: TInput) => Promise<TResponse>, options?: UseMutationOptions<TResponse, CombinedErrorResponse, TInput>) {
  const q = useQueryClient();
  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  return useMutation<TResponse, CombinedErrorResponse, TInput>({
    mutationKey,
    mutationFn: callback,
    ...options,
    onSuccess: (data, variables, context, mutationContext) => {
      for (let i = 1; i < mutationKey.length; i++) {
        q.invalidateQueries({ queryKey: [mutationKey[i]] } as InvalidateQueryFilters);
      }
      options?.onSuccess?.(data, variables, context, mutationContext);
    },
    onError: (error: CombinedErrorResponse) => {
      switch (error.status) {
        case HTTP_STATUS.UNAUTHORIZED:
          dispatch(setSignOut());
          // navigate(ROUTES.AUTH.SIGNIN + `?returnUrl=${window.location.pathname}`, {
          //   replace: true,
          // });
          break;
        default:
          CommonNotification("error", ErrorMessage(error));
          break;
      }
    },
  });
}
