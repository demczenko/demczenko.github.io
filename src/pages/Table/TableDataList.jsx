import React from "react";
import TableDataCart from "./TableDataCart";
import { Heading, List } from "@/components";

const TableDataList = ({ tablesData, onDeleteTableData }) => {
  return (
    <div>
      <Heading title={"Table data"} />
      <List>
        {tablesData.map((table, i) => (
          <TableDataCart onDelete={onDeleteTableData} key={i} table={table} />
        ))}
      </List>
    </div>
  );
};

export default TableDataList;
