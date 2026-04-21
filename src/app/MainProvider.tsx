"use client";

import Store from "@/store/Store";
import { ChildrenLayout } from "@/type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { FC } from "react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NoSsr from "@/utils/noSsr";

const queryClient = new QueryClient();

const MainProvider: FC<ChildrenLayout> = ({ children }) => {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  return (
    <NoSsr>
      <Provider store={Store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#101828",
            },
          }}
        >
          <QueryClientProvider client={queryClient}>
            <GoogleOAuthProvider clientId={googleClientId}>
              {children}
            </GoogleOAuthProvider>
          </QueryClientProvider>
        </ConfigProvider>
      </Provider>
    </NoSsr>
  );
};

export default MainProvider;
