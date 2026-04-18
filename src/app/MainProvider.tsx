"use client";

import Store from "@/store/Store";
import { ChildrenLayout } from "@/type";
import { ConfigProvider } from "antd";
import { FC } from "react";
import { Provider } from "react-redux";

const MainProvider: FC<ChildrenLayout> = ({ children }) => {
  return (
    <Provider store={Store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#101828",
          },
        }}
      >
        {children}
      </ConfigProvider>
    </Provider>
  );
};

export default MainProvider;
