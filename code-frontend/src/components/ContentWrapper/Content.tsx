import React from "react";

import { Wrapper } from "./Content.style";
interface MyComponentProps {
  children: React.ReactNode; // `children` 是 `ReactNode` 类型
}
export const ContentWrapper: React.FC<MyComponentProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
