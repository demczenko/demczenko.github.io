import React from "react";
import TableDataCart from "./TableDataCart";
import { Heading, List } from "@/components";

const TableDataList = ({ tablesData }) => {
  return (
    <div>
      <Heading title={"Table data"} />
      <List>
        {tablesData.map((table, i) => (
          <TableDataCart key={i} table={table} />
        ))}
      </List>
    </div>
  );
};

export default TableDataList;
