import { CardDescription } from "@/components";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ContextMenuRow } from "./ContextMenuTableRow";

const TemplateTable = ({
  error,
  handleImportCSV,
  selectedColumnsData,
  selectedColumns,
  removeRowItem,
  table,
}) => {
  const [open, setIsOpen] = useState(false);
  const handleNewItem = () => {
    alert("New item selected");
  };

  const handleMenu = (ev) => {
    ev.preventDefault();
    setIsOpen(true);
  };

  const handleSelect = ({ Slug }) => {
    // TODO
    console.log(Slug);
  };

  const createRows = () => {
    return selectedColumnsData?.map((colData, i) => {
      return (
        <TableRow
          className="hover:bg-blue-50 cursor-pointer"
          onClick={() => handleSelect(colData)}
          key={i}>
          {...createColumns(colData, i)}
        </TableRow>
      );
    });
  };

  const handleRemoveRow = ({ Slug }) => {
    // remove selected item from columns data table
    removeRowItem(Slug);
  };

  const createColumns = (colData, i) => {
    const columns = [];
    for (const objKey in colData) {
      const value = colData[objKey];
      if (
        objKey === "table_id" ||
        objKey === "createdat" ||
        objKey === "updatedAt" ||
        objKey === "project_id" ||
        objKey === "id"
      )
        continue;
      columns.push(
        <TableCell
          key={value + i}
          className={"p-2 text-nowrap truncate w-[200px] inline-block"}>
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
      <TabsContent value={table.id}>
        <CardDescription
          style="text-black"
          options={[
            {
              id: 1,
              name: "New Item",
              onClick: () => handleNewItem(),
            },
            {
              id: 2,
              name: <Label htmlFor="csv_file">Import CSV</Label>,
            },
          ]}
          name={table.table_name}
          title={"Manage table data"}
        />
        <Table>
          <TableHeader>
            <TableRow className="flex items-center">
              {selectedColumns?.map((column) => (
                <TableHead
                  className="md:w-[200px] w-[100px] text-nowrap flex justify-start items-center text-sm"
                  key={column.id}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>{createRows()}</TableBody>
        </Table>
      </TabsContent>
      <Input
        id="csv_file"
        className="hidden"
        type="file"
        onChange={(ev) => handleImportCSV(ev)}
      />
    </>
  );
};

export default TemplateTable;
