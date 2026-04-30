"use client";

import { Queries } from "@/api";
import { ROUTES } from "@/constants";
import { DashboardLayout } from "@/layout";
import { useAppSelector } from "@/store";
import { ChildrenLayout } from "@/type";
import { Spin } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const StoreLayout: FC<ChildrenLayout> = ({ children }) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  
  // Fetch stores to see if any exist
  const { data: storeData, isLoading } = Queries.useGetStore({}, !!user);

  const hasPlan = !!user?.subscription?.planId;
  const stores = storeData?.data?.stores || [];
  const hasStore = stores.length > 0;

  const pathname = usePathname();
  const isSetupPage = pathname === ROUTES.STORE.SETUP;
  const isPlanPage = pathname === ROUTES.STORE.PLANS;

  useEffect(() => {
    if (!isLoading && user && !isSetupPage && !isPlanPage) {
      if (!hasStore) {
        router.replace(ROUTES.STORE.SETUP);
      } else if (!hasPlan) {
        router.replace(ROUTES.STORE.PLANS);
      }
    }
  }, [user, hasPlan, hasStore, isLoading, router, isSetupPage, isPlanPage]);

  // Handle Redirection State to prevent content flash
  const isRedirecting = user && (!hasPlan || !hasStore) && !isSetupPage && !isPlanPage;

  return (
    <DashboardLayout>
      {(isLoading || isRedirecting) ? (
        <div className="flex h-[calc(100vh-100px)] w-full items-center justify-center">
          <div className="text-center">
            <Spin size="large" />
            <p className="mt-4 text-slate-500 font-medium tracking-wide animate-pulse">
              {isLoading ? "Synchronizing..." : "Redirecting..."}
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </DashboardLayout>
  );
};


export default StoreLayout;
