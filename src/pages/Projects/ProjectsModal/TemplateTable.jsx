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

  const handleEditRow = ({ Slug }) => {
    // TODO
    // call sheet modal for selected item
    // do we really need edit item when importing?
    console.log("Under construction.");
  }

  const handleRemoveRow = ({ Slug }) => {
    // remove selected item from columns data table
    removeRowItem(Slug);
  }

  const handleDuplicateRow = ({ Slug }) => {
    console.log("Under construction.");
  }

  const createColumns = (colData, i) => {
    const columns = [];
    for (const objKey in colData) {
      const value = colData[objKey];
      if (objKey === "table_id") continue;
      columns.push(
        <TableCell key={value + i} className={"h-10 text-nowrap"}>
          <ContextMenuRow
            actions={[
              {
                id: 1,
                name: "Edit",
                onClick: () => handleEditRow(colData)
              },
              {
                id: 2,
                name: "Remove",
                onClick: () => handleRemoveRow(colData)
              },
              {
                id: 3,
                name: "Duplicate",
                onClick: () => handleDuplicateRow(colData)
              },
            ]}
          >{value}</ContextMenuRow>
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
            <TableRow>
              {selectedColumns?.map((column) => (
                <TableHead key={column.id}>{column.header}</TableHead>
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
        onChange={handleImportCSV}
      />
      {error && <p className="text-sm text-red-300">{error}</p>}
    </>
  );
};

export default TemplateTable;
