import { KEYS, URL_KEYS } from "@/constants";
import { Params, PlanApiResponse, PlanByIdApiResponse } from "@/type";
import { Get } from "./methods";
import { useQueries } from "./reactQuery";

export const Queries = {
  /* ========================== Plan ========================== */
  useGetPlan: (params?: Params, enabled?: boolean) => useQueries<PlanApiResponse>([KEYS.PLAN.BASE, params], () => Get(URL_KEYS.PLAN.BASE, params), { enabled: enabled }),
  useGetPlanById: (id?: string, enabled?: boolean) => useQueries<PlanByIdApiResponse>([KEYS.PLAN.BASE, id], () => Get(`${URL_KEYS.PLAN.BASE}/${id}`), { enabled: enabled }),
};
