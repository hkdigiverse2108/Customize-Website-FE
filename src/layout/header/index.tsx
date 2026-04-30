import { setApplicationMenuOpen, setToggleMobileSidebar, setToggleSidebar, useAppDispatch, useAppSelector } from "@/store";
import { useWindowWidth } from "@/utils/hook";
import Link from "next/link";
import { memo, useCallback } from "react";
import { shallowEqual } from "react-redux";
import User from "./user";

const Header = () => {
  const { isMobileOpen, isExpanded, isHovered, isApplicationMenuOpen } = useAppSelector(
    (state) => ({
      isMobileOpen: state.layout.isMobileOpen,
      isExpanded: state.layout.isExpanded,
      isHovered: state.layout.isHovered,
      isApplicationMenuOpen: state.layout.isApplicationMenuOpen,
    }),
    shallowEqual,
  );

  const dispatch = useAppDispatch();
  const width = useWindowWidth();

  const handleToggle = useCallback(() => {
    if (width >= 1024) dispatch(setToggleSidebar());
    else dispatch(setToggleMobileSidebar());
  }, [width, dispatch]);

  if (!width) return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 flex bg-white/80 backdrop-blur-xl dark:bg-gray-900/80 lg:border-b border-gray-200/60 dark:border-gray-800/60 transition-all duration-300 ${isExpanded || isHovered ? "lg:ml-[260px] lg:w-[calc(100%-260px)]" : "lg:ml-[72px] lg:w-[calc(100%-72px)]"}`}>
      <div className="w-full flex flex-col items-center justify-between grow lg:flex-row lg:px-6">
        <div className="flex items-center justify-between max-lg:w-full gap-2 px-3 py-3 sm:gap-4 lg:justify-normal border-b border-gray-200/60 dark:border-gray-800/60 lg:border-b-0 lg:px-0 lg:py-2">
          {width <= 1024 && (
            <button className="items-center justify-center w-10 h-10 text-gray-500 rounded-xl z-99999 hover:bg-gray-100 hover:text-gray-700 lg:flex dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors duration-150" onClick={handleToggle} aria-label="Toggle Sidebar">
              {isMobileOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75L1.33325 1.75C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25L14.6666 10.25C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75L1.33325 11.75C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75L7.99992 6.75C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25L1.33325 5.25Z" fill="currentColor" />
                </svg>
              )}
            </button>
          )}

          {width >= 1024 && !isExpanded && (
            <button className="items-center justify-center w-9 h-9 text-gray-400 rounded-xl z-99999 hover:bg-gray-100 hover:text-gray-600 lg:flex dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-gray-300 transition-colors duration-150" onClick={handleToggle} aria-label="Toggle Sidebar">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M3 6.5C3 5.94772 3.44772 5.5 4 5.5H20C20.5523 5.5 21 5.94772 21 6.5C21 7.05228 20.5523 7.5 20 7.5H4C3.44772 7.5 3 7.05228 3 6.5ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM4 16.5C3.44772 16.5 3 16.9477 3 17.5C3 18.0523 3.44772 18.5 4 18.5H20C20.5523 18.5 21 18.0523 21 17.5C21 16.9477 20.5523 16.5 20 16.5H4Z" fill="currentColor" />
              </svg>
            </button>
          )}

          <Link href="/" className="lg:hidden">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">CW</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Customize</span>
            </div>
          </Link>

          <div className="flex">
            {/* <QuickActionMenu /> */}
            <button onClick={() => dispatch(setApplicationMenuOpen())} aria-label="Toggle Application Menu" className="flex items-center justify-center w-10 h-10 text-gray-700 rounded-xl z-99999 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 lg:hidden transition-colors duration-150">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.99902 10.4951C6.82745 10.4951 7.49902 11.1667 7.49902 11.9951V12.0051C7.49902 12.8335 6.82745 13.5051 5.99902 13.5051C5.1706 13.5051 4.49902 12.8335 4.49902 12.0051V11.9951C4.49902 11.1667 5.1706 10.4951 5.99902 10.4951ZM17.999 10.4951C18.8275 10.4951 19.499 11.1667 19.499 11.9951V12.0051C19.499 12.8335 18.8275 13.5051 17.999 13.5051C17.1706 13.5051 16.499 12.8335 16.499 12.0051V11.9951C16.499 11.1667 17.1706 10.4951 17.999 10.4951ZM13.499 11.9951C13.499 11.1667 12.8275 10.4951 11.999 10.4951C11.1706 10.4951 10.499 11.1667 10.499 11.9951V12.0051C10.499 12.8335 11.1706 13.5051 11.999 13.5051C12.8275 13.5051 13.499 12.8335 13.499 12.0051V11.9951Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        </div>

        <div className={`${isApplicationMenuOpen ? "flex" : "hidden"} items-center justify-between max-lg:w-full gap-4 max-xsm:p-2 px-3 py-2 lg:flex max-lg:shadow-theme-md max-lg:dark:shadow-theme-dark-md lg:justify-end lg:px-0`}>
          <div className="flex max-xsm:justify-between items-center gap-1 xsm:gap-3 w-full">
            <User />
          </div>
        </div>
      </div>
    </header>
  );
};

export default memo(Header);
