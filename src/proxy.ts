import { NextRequest, NextResponse } from "next/server";
import { ROUTES, STORAGE_KEYS } from "./constants";
import { ACCOUNT_TYPE } from "./data";
import { AccountType } from "./type";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = req.cookies.get(STORAGE_KEYS.TOKEN)?.value;
  const userCookie = req.cookies.get(STORAGE_KEYS.USER)?.value;

  let role: AccountType | null = null;

  if (userCookie) {
    try {
      const parsedUser = JSON.parse(userCookie);
      role = parsedUser?.role;
    } catch {
      role = null;
    }
  }

  const isAuthPage = pathname.startsWith("/auth");
  const isVerifyOtp = pathname.startsWith(ROUTES.AUTH.VERIFY_OTP);
  const isAdminRoute = pathname.startsWith("/admin");
  const isStoreRoute = pathname.startsWith("/store");

  // ===============================
  // ❌ NOT LOGGED IN
  // ===============================
  if (!token) {
    // allow only auth pages
    if (isAdminRoute || isStoreRoute) {
      return NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, req.url));
    }

    return NextResponse.next();
  }

  // ===============================
  // ⚠️ TOKEN exists but ROLE missing
  // ===============================
  if (!role) {
    const res = NextResponse.redirect(new URL(ROUTES.AUTH.LOGIN, req.url));
    res.cookies.delete(STORAGE_KEYS.TOKEN);
    res.cookies.delete(STORAGE_KEYS.USER);
    return res;
  }

  // ===============================
  // ✅ LOGGED IN → BLOCK AUTH PAGES
  // ===============================
  if (isAuthPage && !isVerifyOtp) {
    if (role === ACCOUNT_TYPE.ADMIN) {
      return NextResponse.redirect(new URL(ROUTES.ADMIN.DASHBOARD, req.url));
    }

    if (role === ACCOUNT_TYPE.VENDOR) {
      // Check if vendor has a plan
      let hasPlan = false;
      try {
        const parsedUser = JSON.parse(userCookie || "{}");
        hasPlan = !!parsedUser?.subscription?.planId;
      } catch {
        hasPlan = false;
      }

      if (!hasPlan && pathname !== ROUTES.STORE.PLANS) {
        return NextResponse.redirect(new URL(ROUTES.STORE.PLANS, req.url));
      }

      return NextResponse.redirect(new URL(ROUTES.STORE.DASHBOARD, req.url));
    }
  }

  // ===============================
  // 🚫 PLAN PROTECTION (Vendor only)
  // ===============================
  if (role === ACCOUNT_TYPE.VENDOR && isStoreRoute && pathname !== ROUTES.STORE.PLANS && pathname !== ROUTES.STORE.DASHBOARD) {
    let hasPlan = false;
    try {
      const parsedUser = JSON.parse(userCookie || "{}");
      hasPlan = !!parsedUser?.subscription?.planId;
    } catch {
      hasPlan = false;
    }

    if (!hasPlan) {
      return NextResponse.redirect(new URL(ROUTES.STORE.PLANS, req.url));
    }
  }

  // ===============================
  // 🚫 ROLE BASED PROTECTION
  // ===============================
  if (role === ACCOUNT_TYPE.ADMIN && isStoreRoute) {
    return NextResponse.redirect(new URL(ROUTES.ADMIN.DASHBOARD, req.url));
  }

  if (role === ACCOUNT_TYPE.VENDOR && isAdminRoute) {
    return NextResponse.redirect(new URL(ROUTES.STORE.DASHBOARD, req.url));
  }

  return NextResponse.next();
}

// ✅ Better matcher (ONLY required routes)
export const config = {
  matcher: ["/admin/:path*", "/store/:path*", "/auth/:path*"],
};
