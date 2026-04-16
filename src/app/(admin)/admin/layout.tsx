"use client";

import Header from "@/layout/header";
import Sidebar from "@/layout/sidebar";
import { ChildrenLayout } from "@/type";
import { FC } from "react";

const AdminLayout: FC<ChildrenLayout> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
