import React, { useEffect, useState } from "react";
import { getData } from "./api/getData";
import { ContentWrapper } from "./components/ContentWrapper/Content";
import { ContentHeader } from "./components/ContentHeader/ContentHeader";
import { ContentTable } from "./components/ContentTable/ContentTable";
import { ContentDisplay } from "./components/ContentDisplay/ContentDisplay";

function App() {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true); // 控制加载状态
  const [error, setError] = useState(null); // 存储错误信息

  useEffect(() => {
    fetch("http://localhost:8000/data") // 后端 API 地址
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // 解析为 JSON
      })
      .then((data) => {
        setData(data); // 更新数据
        setLoading(false); // 数据加载完成
      })
      .catch((error) => {
        console.log("error", error);
        setError(error.message); // 捕获并设置错误信息
        setLoading(false); // 错误时也结束加载状态
      });
  }, []); // 空数组表示该 effect 只在组件挂载时执行一次
  console.log("data", data);
  if (loading) {
    return <div>0000</div>;
  }
  return (
    <ContentWrapper>
      <ContentHeader title="1111" />
      <ContentTable></ContentTable>
      <ContentDisplay />
    </ContentWrapper>
  );
}

export default App;
