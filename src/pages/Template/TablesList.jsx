import { TableService } from "@/api/tables/init";
import TableCart from "./TableCart";
import { ColumnService } from "@/api/columns/init";
import { useEffect, useState } from "react";
import { TabledataService } from "@/api/tables data/init";

const TablesList = ({ tables }) => {
  const [tableId, setTableId] = useState(null);
  const [columns, setColumns] = useState(null);
  const [tableData, setTablesData] = useState(null);

  // Fetch all columns
  // TODO
  useEffect(() => {
    async function getColumnList() {
      try {
        const response = await ColumnService.getColumns();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((column) => column.table_id === tableId);
          setColumns(filtered);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (tableId) {
      getColumnList();
    }
  }, [tableId]);

  // Fetch all tables data
  // TODO
  useEffect(() => {
    async function getTableData() {
      try {
        const response = await TabledataService.getTabledata();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((table) => table.table_id === table_id);
          setTablesData(filtered);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (tableId) {
      getTableData();
    }
  }, [tableId]);

  if (columns && tableData && tableId) {
    TableService.deleteTable(tableId);
    columns.forEach((element) => ColumnService.deleteColumn(element.id));
    tableData.forEach((element) =>
      TabledataService.deleteTabledata(element.id)
    );
  }

  return (
    <div>
      <h2 className="text-2xl text-neutral-200 row-span-full mb-2">Tables</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {tables.map((item) => (
          <TableCart key={item.id} onDelete={setTableId} table={item} />
        ))}
      </div>
    </div>
  );
};

export default TablesList;
