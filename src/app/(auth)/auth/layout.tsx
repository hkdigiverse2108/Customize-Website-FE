"use client";

import { ChildrenLayout } from "@/type";
import { FC } from "react";

const AdminLayout: FC<ChildrenLayout> = ({ children }) => {
  return <div>{children}</div>;
};

export default AdminLayout;
