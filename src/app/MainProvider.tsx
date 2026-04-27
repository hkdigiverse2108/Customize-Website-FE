"use client";

import { NotificationProvider } from "@/attribute";
import { CommonUpload } from "@/components/common";
import store from "@/store/store";
import { ChildrenLayout } from "@/type";
import NoSsr from "@/utils/noSsr";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp, ConfigProvider, Spin } from "antd";
import { FC } from "react";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

const MainProvider: FC<ChildrenLayout> = ({ children }) => {
  const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "";

  Spin.setDefaultIndicator(<div className="animate-spin rounded-full h-8! w-8! border-b-2 border-brand-600" />);

  return (
    <NoSsr>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#10a856",
              colorLink: "#0a8745",
              colorLinkHover: "#0b6b38",
              borderRadius: 8,
            },
          }}
        >
          <AntdApp>
            <NotificationProvider>
              <QueryClientProvider client={queryClient}>
                <GoogleOAuthProvider clientId={googleClientId}>
                  {children}
                  <CommonUpload />
                </GoogleOAuthProvider>
              </QueryClientProvider>
            </NotificationProvider>
          </AntdApp>
        </ConfigProvider>
      </Provider>
    </NoSsr>
  );
};

export default MainProvider;
