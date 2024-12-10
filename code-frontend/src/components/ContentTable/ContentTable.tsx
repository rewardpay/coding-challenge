import React from "react";
import _ from "lodash";
import DataTable from "react-data-table-component";
import { DataElementType } from "../../App";

export const ContentTable = ({ data }: any) => {
  const columns: any = [
    {
      name: "account_category",
      selector: (row: any) => row.account_category,
      sortable: true,
    },
    {
      name: "account_code",
      selector: (row: DataElementType) => row.account_code,
      sortable: true,
    },
    {
      name: "account_currency",
      selector: (row: DataElementType) => row.account_currency,
    },
    {
      name: "account_identifier",
      selector: (row: DataElementType) => row.account_identifier,
    },
    {
      name: "account_name",
      selector: (row: DataElementType) => row.account_name,
      sortable: true,
    },
    {
      name: "account_status",
      selector: (row: DataElementType) => row.account_status,
    },
    {
      name: "account_type",
      selector: (row: DataElementType) => row.account_type,
      sortable: true,
    },
    {
      name: "account_type_bank",
      selector: (row: DataElementType) => row.account_type_bank,
    },
    {
      name: "system_account",
      selector: (row: DataElementType) => row.system_account,
    },
    {
      name: "total_value",
      selector: (row: DataElementType) => row.total_value,
      sortable: true,
    },
    {
      name: "value_type",
      selector: (row: DataElementType) => row.value_type,
      sortable: true,
    },
  ];
  if (_.isEmpty(data)) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DataTable title="User Data" columns={columns} data={data} pagination />
    </div>
  );
};
