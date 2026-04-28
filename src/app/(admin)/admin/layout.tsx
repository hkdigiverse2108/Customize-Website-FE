"use client";

import { DashboardLayout } from "@/layout";
import { ChildrenLayout } from "@/type";
import { FC } from "react";

const AdminLayout: FC<ChildrenLayout> = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default AdminLayout;
