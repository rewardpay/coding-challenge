import React from "react";
interface Title {
  title: string;
}
export const ContentHeader = ({ title }: Title) => {
  return <h1>{title}</h1>;
};
