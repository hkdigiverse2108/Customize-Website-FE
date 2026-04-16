import { PAGE_TITLE, ROUTES } from "@/constants";
import { AppstoreOutlined, FileTextOutlined, HomeOutlined } from "@ant-design/icons";

export type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  number?: number;
  pro?: boolean;
  new?: boolean;
  children?: NavItem[];
};

export const NavItems: NavItem[] = [
  { icon: <AppstoreOutlined />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.DASHBOARD },
  {
    name: PAGE_TITLE.INVENTORY.BASE,
    icon: <HomeOutlined />,
    children: [
      { name: PAGE_TITLE.INVENTORY.PRODUCT.BASE, path: ROUTES.PRODUCT.BASE, pro: false },
      { name: PAGE_TITLE.INVENTORY.STOCK.BASE, path: ROUTES.STOCK.BASE, pro: false },
      {
        name: PAGE_TITLE.INVENTORY.BASE,
        icon: <FileTextOutlined />,
        children: [
          { name: PAGE_TITLE.INVENTORY.PRODUCT.BASE, path: ROUTES.PRODUCT.BASE, pro: false },
          { name: PAGE_TITLE.INVENTORY.STOCK.BASE, path: ROUTES.STOCK.BASE, pro: false },
          { name: PAGE_TITLE.INVENTORY.RECIPE.BASE, path: ROUTES.RECIPE.BASE, pro: false },
          { name: PAGE_TITLE.INVENTORY.STOCK_VERIFICATION.BASE, path: ROUTES.STOCK_VERIFICATION.BASE },
          { name: PAGE_TITLE.INVENTORY.BILL_OF_LIVE_PRODUCT.BASE, path: ROUTES.BILL_OF_LIVE_PRODUCT.BASE },
          { name: PAGE_TITLE.INVENTORY.MATERIAL_CONSUMPTION.BASE, path: ROUTES.MATERIAL_CONSUMPTION.BASE },
        ],
      },
    ],
  },
];
