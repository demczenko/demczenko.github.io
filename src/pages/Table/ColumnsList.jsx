import React from "react";
import ColumnCart from "./ColumnCart";
import { Heading, List } from "@/components";

const ColumnsList = ({ set, columns }) => {
  return (
    <div>
      <Heading title={"Columns"} />
      <List>
        {columns.map((column) => (
          <ColumnCart set={set} key={column.id} column={column} />
        ))}
      </List>
    </div>
  );
};

export default ColumnsList;
