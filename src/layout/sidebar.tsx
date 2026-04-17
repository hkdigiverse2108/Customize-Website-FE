"use client";

import { NavItem, NavItems } from "@/date";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setIsHovered, setToggleMobileSidebar, setToggleSidebar } from "@/store/slices/LayoutSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/* ─────────────────────────── SVG helpers ────────────────────────────────── */

const ChevronDown = ({ open }: { open: boolean }) => (
  <svg className={`w-4 h-4 shrink-0 transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

/* ─────────────────────────── Component ──────────────────────────────────── */

const Sidebar = () => {
  const { isExpanded, isMobileOpen, isHovered } = useAppSelector((s) => s.layout);
  const dispatch = useAppDispatch();
  const location = usePathname();

  const [openSubmenu, setOpenSubmenu] = useState<{ type: string; index: number } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>({});
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const isVisible = isExpanded || isHovered || isMobileOpen;

  const isActive = useCallback((path: string) => location === path || location.startsWith(path + "/"), [location]);

  useEffect(() => {
    NavItems.forEach((menu, index) => {
      if (menu.children?.some((sub) => location === sub.path || location.startsWith(sub.path + "/"))) {
        setOpenSubmenu({ type: "main", index });
      }
    });
  }, [location]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key]?.scrollHeight ?? 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      dispatch(setToggleSidebar());
    } else {
      dispatch(setToggleMobileSidebar());
    }
  };

  const handleSubmenuToggle = (index: number, menuType: string) => {
    setOpenSubmenu((prev) => {
      if (prev && prev.type === menuType && prev.index === index) return null;
      return { type: menuType, index };
    });
  };

  const renderMenuItems = (items: NavItem[], menuType: string) => (
    <ul className="flex flex-col">
      {items.map((nav, index) => {
        const isOpen = openSubmenu?.type === menuType && openSubmenu?.index === index;
        const hasChildren = Boolean(nav.children);
        const active = hasChildren ? isOpen : nav.path ? isActive(nav.path) : false;

        return (
          <li key={nav.name} className="relative group/menu">
            {hasChildren ? (
              <button
                onClick={() => handleSubmenuToggle(index, menuType)}
                className={`flex items-center w-full gap-3 px-6 py-3 transition-colors duration-200
                  ${active ? "bg-primary-color text-white" : "text-white hover:bg-primary-color/20 hover:text-white"}`}
              >
                <span className="shrink-0 text-xl">{nav.icon}</span>
                {isVisible && (
                  <>
                    <span className="flex-1 text-left text-[14px] font-medium tracking-wide">{nav.name}</span>
                    <ChevronDown open={isOpen} />
                  </>
                )}
                {active && isVisible && <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary-color" />}
              </button>
            ) : (
              nav.path && (
                <Link
                  href={nav.path}
                  className={`flex items-center gap-3 px-6 py-3 transition-colors duration-200
                    ${isActive(nav.path) ? "bg-primary-color text-white" : "text-white hover:bg-primary-color/20 hover:text-white"}`}
                >
                  <span className="shrink-0 text-xl">{nav.icon}</span>
                  {isVisible && <span className="flex-1 text-left text-[14px] font-medium tracking-wide">{nav.name}</span>}
                  {isActive(nav.path) && isVisible && <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary-color" />}
                </Link>
              )
            )}

            {hasChildren && isVisible && (
              <div
                ref={(el) => {
                  subMenuRefs.current[`${menuType}-${index}`] = el;
                }}
                className="overflow-hidden transition-all duration-300 ease-in-out bg-body-bg"
                style={{ height: isOpen ? `${subMenuHeight[`${menuType}-${index}`] ?? 0}px` : "0px" }}
              >
                <div className="relative ml-[34px] border-l border-white/10 py-1">
                  {nav.children!.map((child) => {
                    const childActive = isActive(child.path);
                    return (
                      <Link
                        key={child.name}
                        href={child.path}
                        className={`group flex items-center gap-3 px-6 py-2 text-[13px] transition-all duration-200
                          ${childActive ? "text-white" : "text-white/80 hover:text-white"}`}
                      >
                        <div className="absolute left-0 w-3 border-t border-white/10" />
                        <div
                          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200
                          ${childActive ? "bg-white scale-110 shadow-[0_0_8px_white]" : "bg-white/20"}`}
                        />
                        <span className="truncate">{child.name}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );

  return (
    <aside
      className={`fixed flex flex-col top-0 left-0 h-screen z-100 bg-body-bg text-white shadow-2xl transition-all duration-300 ease-in-out
        ${isExpanded || isHovered || isMobileOpen ? "w-[280px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      onMouseEnter={() => !isExpanded && dispatch(setIsHovered(true))}
      onMouseLeave={() => dispatch(setIsHovered(false))}
    >
      <div className="flex items-center justify-between h-[80px] px-6 shrink-0 bg-body-bg">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-8 h-8 fill-white">
              <path d="M20 20 L80 20 L50 80 Z" />
              <path d="M40 30 L60 30 L50 50 Z" opacity="0.5" />
            </svg>
          </div>
          {isVisible && <span className="text-2xl font-bold tracking-tight">Mofi</span>}
        </Link>
        {isVisible && (
          <button onClick={handleToggle} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/60 hover:text-white">
            <MenuIcon />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar py-6">
        <nav>{renderMenuItems(NavItems, "main")}</nav>
      </div>

      {isVisible && (
        <div className="p-6 border-t border-white/5 bg-body-bg/50">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-body-bg/50 border border-white/5">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-primary-color to-secondary-color flex items-center justify-center font-bold text-white shadow-lg">A</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Admin</p>
              <p className="text-xs text-white/40 truncate">admin@mofi.com</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
