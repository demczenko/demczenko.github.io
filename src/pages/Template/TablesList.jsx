import { TableService } from "@/api/tables/init";
import TableCart from "./TableCart";
import { ColumnService } from "@/api/columns/init";
import { useEffect, useState } from "react";

const TablesList = ({ tables }) => {
  const [tableId, setTableId] = useState(null);

  // Fetch all columns
  // TODO
  useEffect(() => {
    async function getColumnList() {
      try {
        const response = await ColumnService.getColumns();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((column) => column.table_id === tableId);
          TableService.deleteTable(tableId);
          filtered.forEach((element) => ColumnService.deleteColumn(element.id));
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (tableId) {
      getColumnList();
    }
  }, [tableId]);

  console.log(tableId);

  return (
    <div>
      <h2 className="text-2xl text-neutral-200 row-span-full mb-2">Tables</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {tables.map((item) => (
          <TableCart
            key={item.id}
            onDelete={setTableId}
            table={item}
          />
        ))}
      </div>
    </div>
  );
};

export default TablesList;
