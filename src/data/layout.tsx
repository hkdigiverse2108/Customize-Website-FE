import { PAGE_TITLE, ROUTES } from "@/constants";
import { NavItem } from "@/type";
import { AiOutlineProduct } from "react-icons/ai";
import { BiCategory, BiCollection } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { FiBell, FiMapPin } from "react-icons/fi";
import { GrPlan } from "react-icons/gr";
import { HiOutlineColorSwatch, HiOutlineReceiptTax } from "react-icons/hi";
import { IoColorPaletteOutline, IoSettingsOutline, IoStorefrontOutline } from "react-icons/io5";
import { LiaStoreSolid } from "react-icons/lia";
import { LuComponent } from "react-icons/lu";
import { MdOutlineEmail, MdOutlineLanguage, MdOutlineLocalShipping, MdOutlineManageSearch, MdOutlinePayment, MdOutlineRemoveRedEye } from "react-icons/md";
import { RiPagesLine } from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";

export const AdminNavItems: NavItem[] = [
  { icon: <RxDashboard />, name: PAGE_TITLE.DASHBOARD, path: ROUTES.ADMIN.DASHBOARD },
  { icon: <GrPlan />, name: PAGE_TITLE.PLAN.BASE, path: ROUTES.ADMIN.PLAN.BASE },
  { icon: <LiaStoreSolid />, name: PAGE_TITLE.STORES.BASE, path: ROUTES.ADMIN.STORES.BASE },
  { icon: <HiOutlineColorSwatch />, name: PAGE_TITLE.THEME.BASE, path: ROUTES.ADMIN.THEME.BASE },
  { icon: <LuComponent />, name: PAGE_TITLE.COMPONENT.BASE, path: ROUTES.ADMIN.COMPONENT.BASE },
  { icon: <BiCategory />, name: PAGE_TITLE.CATEGORY.BASE, path: ROUTES.ADMIN.CATEGORY.BASE },
  { icon: <RiPagesLine />, name: PAGE_TITLE.PAGE.BASE, path: ROUTES.ADMIN.PAGE.BASE },
  { icon: <BiCollection />, name: PAGE_TITLE.COLLECTION.BASE, path: ROUTES.ADMIN.COLLECTION.BASE },
  { icon: <AiOutlineProduct />, name: PAGE_TITLE.PRODUCT.BASE, path: ROUTES.ADMIN.PRODUCT.BASE },
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
