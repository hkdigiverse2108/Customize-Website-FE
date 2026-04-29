"use client";
import { ChildrenLayout } from "@/type";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { FC } from "react";

const AuthLayout: FC<ChildrenLayout> = ({ children }) => {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  return <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider>;
};

export default AuthLayout;
