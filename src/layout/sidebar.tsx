import { ACCOUNT_TYPE, AdminNavItems, StoreNavItems } from "@/data";
import { setIsHovered, setToggleMobileSidebar, setToggleSidebar, useAppDispatch, useAppSelector } from "@/store";
import { NavItem } from "@/type";
import { useWindowWidth } from "@/utils/hook";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { shallowEqual } from "react-redux";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const Sidebar = () => {
  const { isExpanded, isMobileOpen, isHovered } = useAppSelector(
    (state) => ({
      isExpanded: state.layout.isExpanded,
      isMobileOpen: state.layout.isMobileOpen,
      isHovered: state.layout.isHovered,
    }),
    shallowEqual,
  );

  // Select role separately — avoids re-renders when unrelated auth fields change
  const role = useAppSelector((state) => state.auth.user?.role);
  const dispatch = useAppDispatch();
  const width = useWindowWidth();
  const location = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{ type: "main" | "others"; index: number } | null>(null);

  // Memoize nav items so they are only recomputed when role changes
  const NavItems = useMemo(() => (role === ACCOUNT_TYPE.ADMIN ? AdminNavItems : StoreNavItems), [role]);

  const isActive = useCallback((path: string) => location === path || location.startsWith(path + "/"), [location]);

  // Auto-open the submenu that contains the current route
  useEffect(() => {
    NavItems.forEach((menu, index) => {
      if (menu.children?.some((sub) => location === sub.path || location.startsWith(sub.path + "/"))) {
        setOpenSubmenu({ type: "main", index });
      }
    });
  }, [location, NavItems]);

  const handleToggle = useCallback(() => {
    if (window.innerWidth >= 1024) dispatch(setToggleSidebar());
    else dispatch(setToggleMobileSidebar());
  }, [dispatch]);

  const handleSubmenuToggle = useCallback((index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prev) => (prev && prev.type === menuType && prev.index === index ? null : { type: menuType, index }));
  }, []);

  const isShowFull = isExpanded || isHovered || isMobileOpen;

  const renderMenuItems = useCallback(
    (items: NavItem[], menuType: "main" | "others") => (
      <ul className="flex flex-col gap-1">
        {items.map((nav, index) => {
          const submenuOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;

          return (
            <li key={nav.name}>
              {nav.children ? (
                <button onClick={() => handleSubmenuToggle(index, menuType)} className={`menu-item w-full group ${submenuOpen ? "menu-item-active" : "menu-item-inactive"} cursor-pointer ${!isExpanded && !isHovered ? "lg:justify-center" : "lg:justify-start"}`}>
                  <span className={`menu-item-icon-size ${submenuOpen ? "menu-item-icon-active" : "menu-item-icon-inactive"}`}>{nav.icon}</span>
                  {isShowFull && <span className="menu-item-text">{nav.name}</span>}
                  {isShowFull && <MdOutlineKeyboardArrowDown className={`ml-auto w-5 h-5 transition-transform duration-200 ${submenuOpen ? "menu-item-arrow-active" : ""}`} />}
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
                <div className="overflow-hidden transition-all duration-300 ease-in-out" style={{ maxHeight: submenuOpen ? "500px" : "0px" }}>
                  <ul className="mt-1 space-y-0.5 ml-8 border-l-2 border-brand-200 dark:border-brand-800 pl-2">
                    {nav.children.map((child) => (
                      <li key={child.name}>
                        <Link href={child.path} className={`menu-dropdown-item ${isActive(child.path) ? "menu-dropdown-item-active" : "menu-dropdown-item-inactive"}`}>
                          {child.name}
                          <span className="flex items-center gap-1 ml-auto">
                            {child.new && <span className={`ml-auto ${isActive(child.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"} menu-dropdown-badge`}>new</span>}
                            {child.pro && <span className={`ml-auto ${isActive(child.path) ? "menu-dropdown-badge-active" : "menu-dropdown-badge-inactive"} menu-dropdown-badge`}>pro</span>}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    ),
    [openSubmenu, isExpanded, isHovered, isShowFull, isActive, handleSubmenuToggle],
  );

  if (!width) return null;

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileOpen && <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300" onClick={() => dispatch(setToggleMobileSidebar())} />}

      <aside
        className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-3 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
          ${isExpanded || isMobileOpen ? "w-[260px]" : isHovered ? "w-[260px]" : "w-[72px]"}
          ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0`}
        onMouseEnter={() => !isExpanded && dispatch(setIsHovered(true))}
        onMouseLeave={() => dispatch(setIsHovered(false))}
      >
        {/* Logo area */}
        <div className={`py-3 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-between"} items-center border-b border-gray-200/60 dark:border-gray-800/60`}>
          <Link href="/" className="flex items-center gap-2">
            {isShowFull ? (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm">CW</span>
                </div>
                <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Customize</span>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
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
                <h2 className={`mb-3 text-[11px] uppercase tracking-widest font-semibold flex text-gray-500 dark:text-gray-400 ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start pl-3"}`}>{isShowFull ? "Menu" : <BiDotsHorizontalRounded className="size-5" />}</h2>
                {renderMenuItems(NavItems, "main")}
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
};

// memo prevents unnecessary re-renders triggered by parent layout changes
export default memo(Sidebar);
