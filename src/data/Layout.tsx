import { PAGE_TITLE, ROUTES } from "@/constants";
import { AppstoreOutlined } from "@ant-design/icons";

export type NavItem = {
  name: string;
  icon: React.ReactNode;
  path?: string;
  number?: number;
  children?: { name: string; path: string; pro?: boolean; new?: boolean; number?: number }[];
};

export const NavItems: NavItem[] = [
  { icon: <AppstoreOutlined />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.VENDOR.DASHBOARD },
  // {
  //   name: PAGE_TITLE.INVENTORY.BASE,
  //   icon: <HomeOutlined />,
  //   children: [
  //     { name: PAGE_TITLE.INVENTORY.PRODUCT.BASE, path: ROUTES.PRODUCT.BASE, pro: false },
  //     { name: PAGE_TITLE.INVENTORY.STOCK.BASE, path: ROUTES.STOCK.BASE, pro: false },
  //   ],
  // },
];
