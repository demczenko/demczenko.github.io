import React from "react";
import ColumnCart from "./ColumnCart";

const ColumnsList = ({ columns }) => {
  return (
    <div>
      <h2 className="text-2xl text-neutral-200 row-span-full my-2">Columns</h2>
      <div className="grid grid-cols-4 gap-2">
        {columns.map((column) => (
          <ColumnCart key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};

export default ColumnsList;
