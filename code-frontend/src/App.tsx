import React, { useEffect, useState } from "react";
import { ContentWrapper } from "./components/ContentWrapper/Content";
import { ContentHeader } from "./components/ContentHeader/ContentHeader";
import { ContentTable } from "./components/ContentTable/ContentTable";
import { ContentDisplay } from "./components/ContentDisplay/ContentDisplay";
import { getData } from "./api/getData";
export type DataElementType = {
  account_category: string;
  account_code: string;
  account_currency: string;
  account_identifier: string;
  account_status: string;
  value_type: string;
  account_name: string;
  account_type: string;
  account_type_bank: string;
  system_account: string;
  total_value: number;
};
export type DataType = DataElementType[] | null;
function App() {
  const [data, setData] = useState<DataType | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getData();
        setData(result.data);
      } catch (err) {
        console.log("Failed to fetch data");
      }
    };
    fetchData();
  }, []);
  return (
    <ContentWrapper>
      <ContentHeader title="Jiazhen's Code Tesing" />
      <ContentTable data={data}></ContentTable>
      <ContentDisplay data={data} />
    </ContentWrapper>
  );
}

export default App;
