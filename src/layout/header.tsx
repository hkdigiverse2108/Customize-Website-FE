"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setToggleMobileSidebar, setToggleTheme } from "@/store/slices/LayoutSlice";
import { 
  BellOutlined, 
  FullscreenOutlined, 
  MessageOutlined, 
  SearchOutlined, 
  SunOutlined, 
  MoonOutlined,
  MenuOutlined
} from "@ant-design/icons";
import React from "react";

const Header = () => {
  const dispatch = useAppDispatch();
  const { isToggleTheme } = useAppSelector((state) => state.layout);

  const toggleSidebar = () => {
    dispatch(setToggleMobileSidebar());
  };

  const toggleTheme = () => {
    dispatch(setToggleTheme(isToggleTheme === "dark" ? "light" : "dark"));
  };

  return (
    <header className="fixed top-0 right-0 left-0 bg-white border-b border-white/10 h-[64px] lg:h-[78px] z-[50] transition-all duration-300 flex items-center px-4 lg:px-8 shadow-sm">
      <div className="flex items-center justify-between w-full">
        {/* Left Side: Search & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-500"
          >
            <MenuOutlined className="text-xl" />
          </button>
          
          <div className="hidden md:flex items-center bg-gray-50 border border-gray-100 rounded-full px-4 py-1.5 focus-within:border-primary-color transition-all group">
            <SearchOutlined className="text-gray-400 group-focus-within:text-primary-color" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent border-none outline-none pl-2 text-sm w-48 lg:w-64 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Right Side: Actions & Profile */}
        <div className="flex items-center gap-1 lg:gap-3">
          {/* Action Icons */}
          <div className="flex items-center gap-1 border-r border-gray-100 pr-2 mr-2">
            <button 
              onClick={toggleTheme}
              className="p-2.5 hover:bg-gray-50 rounded-full transition-colors text-gray-500 group"
              title="Toggle Theme"
            >
              {isToggleTheme === "dark" ? (
                <SunOutlined className="text-lg group-hover:text-amber-500" />
              ) : (
                <MoonOutlined className="text-lg group-hover:text-primary-color" />
              )}
            </button>
            <button className="p-2.5 hover:bg-gray-50 rounded-full transition-colors text-gray-500 relative group">
              <BellOutlined className="text-lg group-hover:text-primary-color" />
              <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-secondary-color rounded-full border-2 border-white" />
            </button>
            <button className="hidden sm:block p-2.5 hover:bg-gray-50 rounded-full transition-colors text-gray-500 group">
              <MessageOutlined className="text-lg group-hover:text-primary-color" />
            </button>
            <button className="hidden sm:block p-2.5 hover:bg-gray-50 rounded-full transition-colors text-gray-500 group">
              <FullscreenOutlined className="text-lg group-hover:text-primary-color" />
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3 pl-2 cursor-pointer group">
            <div className="flex flex-col items-end hidden sm:flex">
              <span className="text-sm font-bold text-gray-700 leading-none group-hover:text-primary-color transition-colors">Admin Admin</span>
              <span className="text-[11px] text-gray-400 font-medium">Administrator</span>
            </div>
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary-color to-secondary-color flex items-center justify-center font-bold text-white shadow-lg shadow-primary-color/20 rotate-0 group-hover:rotate-6 transition-transform">
              AA
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
