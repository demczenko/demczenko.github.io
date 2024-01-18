import { ColumnService } from "@/api/columns/init";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

const TableContent = ({ table }) => {
  const [columns, setColumns] = useState([]);
  // Fetch all columns
  // TODO
  useEffect(() => {
    async function getColumnList() {
      try {
        const response = await ColumnService.getColumns();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter(
            (column) => column.table_id === table.id
          );
          setColumns(filtered);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getColumnList();
  }, []);

  console.log(columns);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {
            columns.map(item => <TableHead key={item.id} className="w-[100px]">{item.header}</TableHead>)
          }
        </TableRow>
      </TableHeader>
    </Table>
  );
};

export default TableContent;
