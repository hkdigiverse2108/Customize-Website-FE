"use client";

import Header from "@/layout/header";
import Sidebar from "@/layout/sidebar";
import { useAppSelector } from "@/store";
import { ChildrenLayout } from "@/type";
import { FC } from "react";

const AdminLayout: FC<ChildrenLayout> = ({ children }) => {
  const { isExpanded, isMobileOpen, isApplicationMenuOpen } = useAppSelector((state) => state.layout);

  return (
    <div className="min-h-screen xl:flex overflow-hidden">
      <div>
        <Sidebar />
      </div>
      <div className={`flex-1 transition-all duration-300 ease-linear ${isApplicationMenuOpen ? "pt-29 xsm:pt-30" : "pt-16"} lg:pt-14 ${isExpanded ? "lg:ml-[250px]" : "lg:ml-[70px]"} ${isMobileOpen ? "ml-0" : ""}`}>
        <Header />
        <div className="mx-auto">
          <div className="p-2 sm:p-4">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
