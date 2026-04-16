"use client";

import Header from "@/layout/header";
import { ChildrenLayout } from "@/type";

const AdminLayout = ({ children }: ChildrenLayout) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default AdminLayout;
