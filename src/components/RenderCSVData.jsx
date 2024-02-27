import { Loader } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { v4 as uuidv4 } from "uuid";
import { ContextMenuRow } from "@/pages/Projects/ProjectsModal/ContextMenuTableRow";

const RenderCSVData = ({
  columns,
  columnsData,
  handleRemoveRow,
  isDataTableLoading,
  handlePopulateTable,
}) => {
  const createRows = () => {
    return columnsData.map((colData, i) => {
      return (
        <TableRow key={colData.id}>{...createColumns(colData, i)}</TableRow>
      );
    });
  };

  const createColumns = (colData, i) => {
    const columns = [];
    for (const objKey in colData.data) {
      const value = colData.data[objKey];
      columns.push(
        <TableCell className="truncate" key={colData.id + uuidv4()}>
          <ContextMenuRow
            actions={[
              {
                id: 2,
                name: "Remove",
                onClick: () => handleRemoveRow(colData),
              },
            ]}>
            {value}
          </ContextMenuRow>
        </TableCell>
      );
    }
    return columns;
  };
  return (
    <>
      {columnsData.length !== 0 && (
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead className="w-[200px]" key={column.id}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{createRows()}</TableBody>
        </Table>
      )}
      {columnsData.length > 0 && (
        <Button
          disabled={isDataTableLoading}
          onClick={handlePopulateTable}
          className="w-full mt-2">
          {isDataTableLoading ? (
            <Loader className="w-4 h-4 animate-spin" />
          ) : (
            "Save"
          )}
        </Button>
      )}
    </>
  );
};

export default RenderCSVData;
