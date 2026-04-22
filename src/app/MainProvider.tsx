"use client";

import store from "@/store/store";
import { ChildrenLayout } from "@/type";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import { FC } from "react";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NoSsr from "@/utils/noSsr";
import { App as AntdApp } from "antd";
import { NotificationProvider } from "@/attribute";

const queryClient = new QueryClient();

const MainProvider: FC<ChildrenLayout> = ({ children }) => {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";
  return (
    <NoSsr>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#101828",
              colorLink: "#475467",
              colorLinkHover: "#1d2939",
            },
          }}
        >
          <AntdApp>
            <NotificationProvider>
              <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId={googleClientId}>{children}</GoogleOAuthProvider>
              </QueryClientProvider>
            </NotificationProvider>
          </AntdApp>
        </ConfigProvider>
      </Provider>
    </NoSsr>
  );
};

export default MainProvider;
