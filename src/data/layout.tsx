import { PAGE_TITLE, ROUTES } from "@/constants";
import { NavItem } from "@/type";
import { FaWindowRestore } from "react-icons/fa";
import { GrPlan } from "react-icons/gr";
import { RxDashboard } from "react-icons/rx";
import { IoSettingsOutline, IoStorefrontOutline, IoColorPaletteOutline } from "react-icons/io5";
import { MdOutlineLanguage, MdOutlinePayment, MdOutlineLocalShipping, MdOutlineEmail, MdOutlineManageSearch, MdOutlineRemoveRedEye } from "react-icons/md";
import { HiOutlineReceiptTax } from "react-icons/hi";
import { FiBell, FiMapPin } from "react-icons/fi";
import { BsCartCheck } from "react-icons/bs";

export const AdminNavItems: NavItem[] = [
  { icon: <RxDashboard />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.ADMIN.DASHBOARD },
  { icon: <GrPlan />, name: PAGE_TITLE.PLAN.BASE, path: ROUTES.ADMIN.PLAN.BASE },
  { icon: <FaWindowRestore />, name: PAGE_TITLE.STORES.BASE, path: ROUTES.ADMIN.STORES.BASE },
  { icon: <FaWindowRestore />, name: PAGE_TITLE.THEME.BASE, path: ROUTES.ADMIN.THEME.BASE },
];

export const StoreNavItems: NavItem[] = [
  { icon: <RxDashboard />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.STORE.DASHBOARD },
  {
    name: PAGE_TITLE.STORE.SETTINGS.BASE,
    icon: <IoSettingsOutline />,
    children: [
      { name: PAGE_TITLE.STORE.SETTINGS.STORE, path: ROUTES.STORE.SETTINGS.STORE, icon: <IoStorefrontOutline />, pro: false },
      { name: PAGE_TITLE.STORE.SETTINGS.DOMAIN, path: ROUTES.STORE.SETTINGS.DOMAIN, icon: <MdOutlineLanguage />, pro: false },
      { name: PAGE_TITLE.STORE.SETTINGS.PAYMENT, path: ROUTES.STORE.SETTINGS.PAYMENT, icon: <MdOutlinePayment />, pro: false },
      { name: PAGE_TITLE.STORE.SETTINGS.SHIPPING, path: ROUTES.STORE.SETTINGS.SHIPPING, icon: <MdOutlineLocalShipping />, pro: false },
      { name: PAGE_TITLE.STORE.SETTINGS.TAX, path: ROUTES.STORE.SETTINGS.TAX, icon: <HiOutlineReceiptTax />, pro: false },
      { name: PAGE_TITLE.STORE.SETTINGS.CHECKOUT, path: ROUTES.STORE.SETTINGS.CHECKOUT, icon: <BsCartCheck />, pro: false },
      { name: PAGE_TITLE.STORE.SETTINGS.MAIL, path: ROUTES.STORE.SETTINGS.MAIL, icon: <MdOutlineEmail />, pro: false },
      { name: PAGE_TITLE.STORE.SETTINGS.NOTIFICATION, path: ROUTES.STORE.SETTINGS.NOTIFICATION, icon: <FiBell />, pro: false },
      { name: PAGE_TITLE.STORE.SETTINGS.REGION, path: ROUTES.STORE.SETTINGS.REGION, icon: <FiMapPin />, pro: false },
      { name: PAGE_TITLE.STORE.SETTINGS.SEO, path: ROUTES.STORE.SETTINGS.SEO, icon: <MdOutlineManageSearch />, pro: false },
      { name: PAGE_TITLE.STORE.SETTINGS.THEME, path: ROUTES.STORE.SETTINGS.THEME, icon: <IoColorPaletteOutline />, pro: false },
      { name: PAGE_TITLE.STORE.SETTINGS.VISUAL, path: ROUTES.STORE.SETTINGS.VISUAL, icon: <MdOutlineRemoveRedEye />, pro: false },
    ],
  },
  // {
  //   name: PAGE_TITLE.INVENTORY.BASE,
  //   icon: <HomeOutlined />,
  //   children: [
  //     { name: PAGE_TITLE.INVENTORY.PRODUCT.BASE, path: ROUTES.PRODUCT.BASE, pro: false },
  //     { name: PAGE_TITLE.INVENTORY.STOCK.BASE, path: ROUTES.STOCK.BASE, pro: false },
  //   ],
  // },
];
