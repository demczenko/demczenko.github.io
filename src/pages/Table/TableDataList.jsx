import React from "react";
import TableDataCart from "./TableDataCart";

const TableDataList = ({ tablesData }) => {
  return (
    <div>
      <h2 className="text-2xl text-neutral-200 row-span-full mb-2">
        Table data
      </h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {tablesData.map((table, i) => (
          <TableDataCart key={i} table={table} />
        ))}
      </div>
    </div>
  );
};

export default TableDataList;
