import { PAGE_TITLE, ROUTES } from "@/constants";
import { NavItem } from "@/type";
import { FaWindowRestore } from "react-icons/fa";
import { GrPlan } from "react-icons/gr";
import { HiOutlineColorSwatch } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";

export const AdminNavItems: NavItem[] = [
  { icon: <RxDashboard />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.ADMIN.DASHBOARD },
  { icon: <GrPlan />, name: PAGE_TITLE.PLAN.BASE, path: ROUTES.ADMIN.PLAN.BASE },
  { icon: <FaWindowRestore />, name: PAGE_TITLE.STORES.BASE, path: ROUTES.ADMIN.STORES.BASE },
  { icon: <HiOutlineColorSwatch />, name: PAGE_TITLE.THEME.BASE, path: ROUTES.ADMIN.THEME.BASE },
  // {
  //   name: PAGE_TITLE.PLAN.BASE,
  //   icon: <FaWindowRestore />,
  //   children: [
  //     { name: PAGE_TITLE.PLAN.BASE, path: ROUTES.ADMIN.PLAN.BASE, pro: false },
  //     { name: PAGE_TITLE.PLAN.BASE, path: ROUTES.ADMIN.PLAN.BASE, pro: false },
  //   ],
  // },
];

export const StoreNavItems: NavItem[] = [
  { icon: <RxDashboard />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.STORE.DASHBOARD },
  // {
  //   name: PAGE_TITLE.INVENTORY.BASE,
  //   icon: <HomeOutlined />,
  //   children: [
  //     { name: PAGE_TITLE.INVENTORY.PRODUCT.BASE, path: ROUTES.PRODUCT.BASE, pro: false },
  //     { name: PAGE_TITLE.INVENTORY.STOCK.BASE, path: ROUTES.STOCK.BASE, pro: false },
  //   ],
  // },
];
