import { useAppSelector } from "@/store";
import { ChildrenLayout } from "@/type";
import dynamic from "next/dynamic";
import { FC, memo } from "react";
import { shallowEqual } from "react-redux";

const Header = dynamic(() => import("@/layout/header"), { ssr: false });
const Sidebar = dynamic(() => import("@/layout/sidebar"), { ssr: false });


const DashboardLayout: FC<ChildrenLayout> = ({ children }) => {
  const { isExpanded, isMobileOpen, isApplicationMenuOpen } = useAppSelector(
    (state) => ({
      isExpanded: state.layout.isExpanded,
      isMobileOpen: state.layout.isMobileOpen,
      isApplicationMenuOpen: state.layout.isApplicationMenuOpen,
    }),
    shallowEqual,
  );

  return (
    <div className="min-h-screen xl:flex overflow-hidden bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ease-linear ${isApplicationMenuOpen ? "pt-29 xsm:pt-30" : "pt-16"} lg:pt-14 ${isExpanded ? "lg:ml-[260px]" : "lg:ml-[72px]"} ${isMobileOpen ? "ml-0" : ""}`}>
        <Header />
        <main className="mx-auto">
          <div className="p-3 sm:p-5">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default memo(DashboardLayout);
