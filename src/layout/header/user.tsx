import { Queries } from "@/api";
import { CommonProfileAvatar } from "@/components/common";
import { ROUTES } from "@/constants";
import { ACCOUNT_TYPE } from "@/data";
import { setSignOut, useAppDispatch, useAppSelector } from "@/store";
import { useClickOutside } from "@/utils";
import Link from "next/link";
import { memo, useCallback } from "react";
import { shallowEqual } from "react-redux";

const User = () => {
  const user = useAppSelector(
    (state) => ({
      firstName: state.auth.user?.firstName,
      lastName: state.auth.user?.lastName,
      email: state.auth.user?.email,
      role: state.auth.user?.role,
    }),
    shallowEqual,
  );

  const { data: storeData } = Queries.useGetStore({});
  const activeStore = storeData?.data?.stores?.[0];
  const storeName = user.role === ACCOUNT_TYPE.ADMIN ? "" : activeStore?.name;
  const storeLogo = user.role === ACCOUNT_TYPE.ADMIN ? "" : activeStore?.logo?.[0];

  const { open, setOpen, wrapperRef } = useClickOutside();
  const dispatch = useAppDispatch();

  const fullName = `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim();

  const handleMouseEnter = useCallback(() => {
    if (window.innerWidth >= 1024) setOpen(true);
  }, [setOpen]);

  const handleMouseLeave = useCallback(() => {
    if (window.innerWidth >= 1024) setOpen(false);
  }, [setOpen]);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (window.innerWidth < 1024) setOpen((prev) => !prev);
    },
    [setOpen],
  );

  const handleSignOut = useCallback(() => {
    dispatch(setSignOut());
  }, [dispatch]);

  return (
    <div className="relative" ref={wrapperRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div onClick={handleClick} className="cursor-pointer ring-2 ring-transparent hover:ring-brand-200 dark:hover:ring-brand-800 rounded-full transition-all duration-200">
        <CommonProfileAvatar fullName={storeName || fullName} profileImage={storeLogo || ""} className="max-xsm:text-sm h-10 w-10 max-xsm:h-9 max-xsm:w-9" />
      </div>

      <div className={`fixed lg:absolute max-lg:left-1 max-lg:right-1 lg:right-0 mt-3 flex min-w-[260px] max-w-[330px] flex-col rounded-2xl border border-gray-100 bg-white backdrop-blur-xl shadow-theme-lg dark:border-gray-800 dark:bg-gray-900/95 z-50 transition-all duration-200 ease-out ${open ? "opacity-100 visible scale-100 translate-y-0" : "opacity-0 invisible scale-95 translate-y-2"}`}>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <CommonProfileAvatar fullName={storeName || fullName} profileImage={storeLogo || ""} className="h-10 w-10" />
            <div className="flex-1 min-w-0">
              <span className="block font-bold text-gray-800 text-theme-sm dark:text-gray-200 truncate capitalize">{storeName || fullName}</span>
              <span className="block text-theme-xs text-gray-500 dark:text-gray-500 truncate" title={user?.email}>
                {user?.email}
              </span>
            </div>
          </div>
        </div>


        <div className="h-px bg-gray-100 dark:bg-gray-800 mx-3" />

        <ul className="flex flex-col p-1.5">
          <li>
            <Link href={user.role === ACCOUNT_TYPE.ADMIN ? ROUTES.ADMIN.DASHBOARD : ROUTES.STORE.DASHBOARD}>
              <div className="flex items-center gap-3 px-3 py-2.5 font-medium text-gray-600 rounded-xl group text-theme-sm hover:bg-brand-50 hover:text-brand-600 dark:text-gray-400 dark:hover:bg-brand-500/10 dark:hover:text-brand-400 transition-all duration-200">
                <svg className="fill-gray-500 text-gray-500 group-hover:fill-brand-600 group-hover:text-brand-600 dark:fill-gray-400 dark:text-gray-400 dark:group-hover:fill-brand-400 dark:group-hover:text-brand-400 transition-colors duration-200" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z" fill="currentColor" />
                </svg>
                My Profile
              </div>
            </Link>
          </li>
        </ul>

        <div className="h-px bg-gray-100 dark:bg-gray-800 mx-3" />

        <div className="p-1.5">
          <Link href={ROUTES.AUTH.LOGIN} onClick={handleSignOut}>
            <div className="flex items-center gap-3 px-3 py-2.5 font-medium text-gray-600 rounded-xl group text-theme-sm hover:bg-error-50 hover:text-error-600 dark:text-gray-400 dark:hover:bg-error-500/10 dark:hover:text-error-400 transition-all duration-200">
              <svg className="fill-gray-500 text-gray-500 group-hover:fill-error-600 group-hover:text-error-600 dark:fill-gray-400 dark:text-gray-400 dark:group-hover:fill-error-400 dark:group-hover:text-error-400 transition-colors duration-200" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.1007 19.247C14.6865 19.247 14.3507 18.9112 14.3507 18.497L14.3507 14.245H12.8507V18.497C12.8507 19.7396 13.8581 20.747 15.1007 20.747H18.5007C19.7434 20.747 20.7507 19.7396 20.7507 18.497L20.7507 5.49609C20.7507 4.25345 19.7433 3.24609 18.5007 3.24609H15.1007C13.8581 3.24609 12.8507 4.25345 12.8507 5.49609V9.74501L14.3507 9.74501V5.49609C14.3507 5.08188 14.6865 4.74609 15.1007 4.74609L18.5007 4.74609C18.9149 4.74609 19.2507 5.08188 19.2507 5.49609L19.2507 18.497C19.2507 18.9112 18.9149 19.247 18.5007 19.247H15.1007ZM3.25073 11.9984C3.25073 12.2144 3.34204 12.4091 3.48817 12.546L8.09483 17.1556C8.38763 17.4485 8.86251 17.4487 9.15549 17.1559C9.44848 16.8631 9.44863 16.3882 9.15583 16.0952L5.81116 12.7484L16.0007 12.7484C16.4149 12.7484 16.7507 12.4127 16.7507 11.9984C16.7507 11.5842 16.4149 11.2484 16.0007 11.2484L5.81528 11.2484L9.15585 7.90554C9.44864 7.61255 9.44847 7.13767 9.15547 6.84488C8.86248 6.55209 8.3876 6.55226 8.09481 6.84525L3.52309 11.4202C3.35673 11.5577 3.25073 11.7657 3.25073 11.9984Z" fill="currentColor" />
              </svg>
              Sign out
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default memo(User);
