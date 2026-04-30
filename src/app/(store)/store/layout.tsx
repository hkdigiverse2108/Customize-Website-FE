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
      if (!hasPlan) {
        router.replace(ROUTES.STORE.PLANS);
      } else if (!hasStore) {
        router.replace(ROUTES.STORE.SETUP);
      }
    }
  }, [user, hasPlan, hasStore, isLoading, router, isSetupPage, isPlanPage]);

  // Handle Redirection State to prevent content flash
  const isRedirecting = user && (!hasPlan || !hasStore) && !isSetupPage && !isPlanPage;

  if (isLoading || isRedirecting) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-50/50 backdrop-blur-sm fixed inset-0 z-[9999]">
        <div className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg mx-auto mb-6 animate-bounce">
            <span className="text-white font-bold text-xl">CW</span></div> <Spin size="large" />
          <p className="mt-4 text-slate-600 font-bold tracking-widest text-xs uppercase animate-pulse">
            {isLoading ? "Synchronizing..." : "Redirecting..."}
          </p>
        </div>
      </div>
    );
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};


export default StoreLayout;
