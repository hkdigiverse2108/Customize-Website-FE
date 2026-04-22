import { Params, PlanApiResponse } from "@/type";
import { useQueries } from "./reactQuery";
import { KEYS, URL_KEYS } from "@/constants";
import { Get } from "./methods";

export const Queries = {
  /* ========================== Plan ========================== */
  useGetPlan: (params?: Params, enabled?: boolean) => useQueries<PlanApiResponse>([KEYS.PLAN.BASE, params], () => Get(URL_KEYS.PLAN.BASE, params), { enabled: enabled }),
};
