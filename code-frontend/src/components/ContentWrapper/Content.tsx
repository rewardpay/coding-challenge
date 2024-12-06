import React from "react";

import { Wrapper } from "./Content.style";
interface MyComponentProps {
  children: React.ReactNode;
}
export const ContentWrapper: React.FC<MyComponentProps> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};
