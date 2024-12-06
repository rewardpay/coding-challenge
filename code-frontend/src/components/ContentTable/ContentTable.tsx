import React from "react";
import _ from "lodash";
import DataTable from "react-data-table-component";

// type DataType = DataElementType[] | null | any[];
type DataType = any;
export const ContentTable = ({ data }: DataType) => {
  const columns: DataType = [
    {
      name: "account_category",
      selector: (row: any) => row.account_category,
      sortable: true,
    },
    {
      name: "account_code",
      selector: (row: any) => row.account_code,
      sortable: true,
    },
    {
      name: "account_currency",
      selector: (row: any) => row.account_currency,
      sortable: true,
    },
    {
      name: "account_identifier",
      selector: (row: any) => row.account_identifier,
      sortable: true,
    },
    {
      name: "account_name",
      selector: (row: any) => row.account_name,
      sortable: true,
    },
    {
      name: "account_status",
      selector: (row: any) => row.account_status,
      sortable: true,
    },
    {
      name: "account_type",
      selector: (row: any) => row.account_type,
      sortable: true,
    },
    {
      name: "account_type_bank",
      selector: (row: any) => row.account_type_bank,
      sortable: true,
    },
    {
      name: "system_account",
      selector: (row: any) => row.system_account,
      sortable: true,
    },
    {
      name: "total_value",
      selector: (row: any) => row.total_value,
      sortable: true,
    },
    {
      name: "value_type",
      selector: (row: any) => row.value_type,
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
