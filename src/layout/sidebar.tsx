import { ACCOUNT_TYPE, AdminNavItems, StoreNavItems } from "@/data";
import { setIsHovered, setToggleMobileSidebar, setToggleSidebar, useAppDispatch, useAppSelector } from "@/store";
import { NavItem } from "@/type";
import { useWindowWidth } from "@/utils/hook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Sidebar = () => {
  const { isExpanded, isMobileOpen, isHovered } = useAppSelector((state) => state.layout);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const width = useWindowWidth();

  const location = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isActive = useCallback((path: string) => location === path || location.startsWith(path + "/"), [location]);

  const NavItems = user?.role === ACCOUNT_TYPE.ADMIN ? AdminNavItems : StoreNavItems;

  useEffect(() => {
    NavItems.forEach((menu, index) => {
      if (menu.children?.some((sub) => location === sub.path || location.startsWith(sub.path + "/"))) {
        setOpenSubmenu({ type: "main", index });
      }
    });
  }, [location, NavItems]);

  const handleToggle = () => {
    if (window.innerWidth >= 1024) {
      dispatch(setToggleSidebar());
    } else {
      dispatch(setToggleMobileSidebar());
    }
  };

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (prevOpenSubmenu && prevOpenSubmenu.type === menuType && prevOpenSubmenu.index === index) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  const isShowFull = isExpanded || isHovered || isMobileOpen;

  const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-1">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.children ? (
            <button onClick={() => handleSubmenuToggle(index, menuType)} className={`menu-item w-full group ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-active" : "menu-item-inactive"} cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}>
              <span className={`menu-item-icon-size ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>{nav.icon}</span>
              {isShowFull && <span className="menu-item-text">{nav.name}</span>}
              {isShowFull && <MdOutlineKeyboardArrowDown className={`ml-auto w-5 h-5 transition-transform duration-200 ${openSubmenu?.type === menuType && openSubmenu?.index === index ? "menu-item-arrow-active" : ""}`} />}
            </button>
          ) : (
            nav.path && (
              <Link href={nav.path} className={`menu-item group ${isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"} ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`} onClick={() => handleSubmenuToggle(index, menuType)}>
                <span className={`menu-item-icon-size ${isActive(nav.path) ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>{nav.icon}</span>
                {isShowFull && <span className="menu-item-text">{nav.name}</span>}
              </Link>
            )
          )}
          {nav.children && isShowFull && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                height: openSubmenu?.type === menuType && openSubmenu?.index === index ? `${subMenuHeight[`${menuType}-${index}`]}px` : "0px",
              }}
            >
              <ul className="mt-1 space-y-0.5 ml-8 border-l-2 border-brand-200 dark:border-brand-800 pl-2">
                {nav.children.map((children) => (
                  <li key={children.name}>
                    <Link href={children.path} className={`menu-dropdown-item ${isActive(children.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}>
                      {children.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {children.new && <span className={`ml-auto ${isActive(children.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"} menu-dropdown-badge`}>new</span>}
                        {children.pro && <span className={`ml-auto ${isActive(children.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"} menu-dropdown-badge`}>pro</span>}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
  if (!width) return null;
  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
          onClick={() => dispatch(setToggleMobileSidebar())}
        />
      )}

      <aside
        className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-3 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
          ${isExpanded || isMobileOpen ? "w-[260px]" : isHovered ? "w-[260px]" : "w-[72px]"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
        onMouseEnter={() => !isExpanded && dispatch(setIsHovered(true))}
        onMouseLeave={() => dispatch(setIsHovered(false))}
      >
        {/* Logo area */}
        <div className={`lg:h-[73px] py-4 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-between"} items-center border-b border-gray-200/60 dark:border-gray-800/60`}>
          <Link href="/" className="flex items-center gap-2">
            {isShowFull ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">CW</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Customize</span>
              </div>
            ) : (
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">CW</span>
              </div>
            )}
          </Link>
          {width >= 1024 && (isMobileOpen || isExpanded) && (
            <button className="items-center justify-center w-8 h-8 text-gray-400 rounded-lg z-99999 lg:flex hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-300 transition-colors duration-150" onClick={handleToggle} aria-label="Toggle Sidebar">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z" fill="currentColor" />
              </svg>
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar flex-1 mt-4">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2 className={`mb-3 text-[11px] uppercase tracking-widest font-semibold flex text-gray-400 dark:text-gray-600 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start pl-3"}`}>{isShowFull ? "Menu" : <BiDotsHorizontalRounded className="size-5" />}</h2>
                {renderMenuItems(NavItems, "main")}
              </div>
            </div>
          </nav>
        </div>

        {/* Bottom branding */}
        {isShowFull && (
          <div className="py-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2 px-3">
              <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
              <span className="text-xs text-gray-400 dark:text-gray-600">v1.0 • Online</span>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
