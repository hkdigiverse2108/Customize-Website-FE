"use client";

import Store from "@/store/Store";
import { ChildrenLayout } from "@/type";
import { FC } from "react";
import { Provider } from "react-redux";

const MainProvider: FC<ChildrenLayout> = ({ children }) => {
  return <Provider store={Store}>{children}</Provider>;
};

export default MainProvider;
