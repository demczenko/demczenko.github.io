import React from "react";
import ColumnCart from "./ColumnCart";
import { Heading, List } from "@/components";

const ColumnsList = ({ setColumns, columns }) => {
  return (
    <div>
      <Heading title={"Columns"} />
      <List>
        {columns.map((column) => (
          <ColumnCart setColumns={setColumns} key={column.id} column={column} />
        ))}
      </List>
    </div>
  );
};

export default ColumnsList;
