import { PAGE_TITLE, ROUTES } from "@/constants";
import { NavItem } from "@/type";
import { AppstoreOutlined } from "@ant-design/icons";
import { FaWindowRestore } from "react-icons/fa";
import { GrPlan } from "react-icons/gr";

export const AdminNavItems: NavItem[] = [
  { icon: <AppstoreOutlined />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.ADMIN.DASHBOARD },
  { icon: <GrPlan />, name: PAGE_TITLE.PLAN.BASE, path: ROUTES.ADMIN.PLAN.BASE },
  { icon: <FaWindowRestore />, name: PAGE_TITLE.STORE.BASE, path: ROUTES.ADMIN.STORE.BASE },
  // {
  //   name: PAGE_TITLE.PLAN.BASE,
  //   icon: <HomeOutlined />,
  //   children: [
  //     { name: PAGE_TITLE.PLAN.BASE, path: ROUTES.ADMIN.PLAN.BASE, pro: false },
  //     { name: PAGE_TITLE.PLAN.BASE, path: ROUTES.ADMIN.PLAN.BASE, pro: false },
  //   ],
  // },
];

export const StoreNavItems: NavItem[] = [
  { icon: <AppstoreOutlined />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.STORE.DASHBOARD },
  // {
  //   name: PAGE_TITLE.INVENTORY.BASE,
  //   icon: <HomeOutlined />,
  //   children: [
  //     { name: PAGE_TITLE.INVENTORY.PRODUCT.BASE, path: ROUTES.PRODUCT.BASE, pro: false },
  //     { name: PAGE_TITLE.INVENTORY.STOCK.BASE, path: ROUTES.STOCK.BASE, pro: false },
  //   ],
  // },
];
