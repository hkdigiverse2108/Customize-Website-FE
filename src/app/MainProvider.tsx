"use client";

import { NotificationProvider } from "@/attribute";
import { CommonUpload } from "@/components/common";
import store from "@/store/store";
import { ChildrenLayout } from "@/type";
import NoSsr from "@/utils/noSsr";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { App as AntdApp, ConfigProvider, Spin } from "antd";
import { FC, useState } from "react";
import { Provider } from "react-redux";

// const queryClient = new QueryClient();

Spin.setDefaultIndicator(<div className="animate-spin rounded-full h-8! w-8! border-b-2 border-brand-600" />);

const MainProvider: FC<ChildrenLayout> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient({}));

  return (
    <NoSsr>
      <Provider store={store}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#0b7a3e", // Compliant green for 4.5:1 contrast ratio
              colorLink: "#0b7a3e",
              colorLinkHover: "#085e30",
              borderRadius: 8,
            },
          }}
        >
          <AntdApp>
            <NotificationProvider>
                <QueryClientProvider client={queryClient}>
                  {children}
                  <CommonUpload />
                </QueryClientProvider>
            </NotificationProvider>
          </AntdApp>
        </ConfigProvider>
      </Provider>
    </NoSsr>
  );
};

export default MainProvider;
