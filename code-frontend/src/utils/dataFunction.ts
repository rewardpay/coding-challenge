import { DataType } from "../App";
import { DataElementType } from "../App";
export const getRevenueAndExpense = (data: DataType, type: string) => {
  const revenueElements = data?.filter(
    (item: DataElementType) => item.account_category === type
  );
  let revenue = 0;
  revenueElements?.forEach((element: any) => {
    revenue += element.total_value;
  });
  return revenue;
};

export const getGrossProfit = (data: DataType) => {
  const grossArr = data?.filter(
    (item: DataElementType) =>
      item.account_type === "sales" && item.value_type === "debit"
  );
  let gross = 0;
  console.log("grossArr", grossArr);
  grossArr?.forEach((element: any) => {
    gross += element.total_value;
  });
  console.log("gross", gross);
  return gross;
};

export const getAssets = (
  data: DataType,
  valueType: string,
  validAssetsType: string[]
) => {
  let total = 0;
  const debitArr = data?.filter(
    (item: DataElementType) =>
      item.account_category === "assets" &&
      item.value_type === valueType &&
      validAssetsType.includes(item.account_type)
  );
  debitArr?.forEach((element: any) => {
    total += element.total_value;
  });
  return total;
};

export const getLiabilities = (
  data: DataType,
  valueType: string,
  validAssetsType: string[]
) => {
  let total = 0;
  const debitArr = data?.filter(
    (item: DataElementType) =>
      item.account_category === "liability" &&
      item.value_type === valueType &&
      validAssetsType.includes(item.account_type)
  );
  debitArr?.forEach((element: any) => {
    total += element.total_value;
  });
  return total;
};

export const formatMoney = (amount: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
};
