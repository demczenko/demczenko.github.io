import React from "react";
import ColumnCart from "./ColumnCart";
import { Heading, List } from "@/components";

const ColumnsList = ({ onRename, columns }) => {
  return (
    <div>
      <Heading title={"Columns"} />
      <List>
        {columns.map((column) => (
          <ColumnCart onRename={onRename} key={column.id} column={column} />
        ))}
      </List>
    </div>
  );
};

export default ColumnsList;
