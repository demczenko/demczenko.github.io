import React from "react";
import ColumnCart from "./ColumnCart";
import { Heading, List } from "@/components";

const ColumnsList = ({ onDelete, onRename, columns, actions }) => {
  return (
    <div>
      <Heading title={"Columns"} actions={actions} />
      <List>
        {columns.map((column) => (
          <ColumnCart
            onDelete={() => onDelete(column.id)}
            onRename={onRename}
            key={column.id}
            column={column}
          />
        ))}
      </List>
    </div>
  );
};

export default ColumnsList;
