import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CardDescription } from "@/components";
import { TableService } from "@/api/tables/init";
import { ColumnService } from "@/api/columns/init";

const TablesToFulFill = ({ columnsData, setColumnsData }) => {
  const [tables, setTables] = useState([]);
  const [selectedTab, setTab] = useState();
  const [columns, setColumns] = useState([]);

  if (tables.length > 0 && !selectedTab) {
    setTab(tables[0].id);
  }

  const selectedColumns = columns.filter(
    (column) => column.table_id === selectedTab
  );
  const selectedColumnsData = columnsData.find(
    (col) => col.table_id === selectedTab
  );

  const handleNewItem = () => {
    alert("New item selected");
  };

  const createRows = () => {
    return selectedColumnsData?.columns_data?.map((colData, i) => {
      return <TableRow key={i}>{...createColumns(colData, i)}</TableRow>;
    });
  };

  const createColumns = (colData, i) => {
    const columns = [];
    for (const objKey in colData) {
      const value = colData[objKey];
      columns.push(
        <TableCell key={value + i} className={"h-10 text-nowrap"}>
          {value}
        </TableCell>
      );
    }
    return columns;
  };

  // Fetch all tables
  // TODO
  useEffect(() => {
    async function getTableList() {
      try {
        const response = await TableService.getTables();
        if (response.ok) {
          const data = await response.json();
          setTables(data);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getTableList();
  }, []);

  // Fetch all columns
  // TODO
  useEffect(() => {
    async function getColumnList() {
      try {
        const response = await ColumnService.getColumns();
        if (response.ok) {
          const data = await response.json();
          setColumns(data);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getColumnList();
  }, []);

  return (
    <Tabs
      value={selectedTab}
      defaultValue={tables.length === 0 ? "" : tables[0]?.id}>
      <TabsList className="grid w-full grid-cols-2">
        {tables?.map((table) => (
          <TabsTrigger
            onClick={() => setTab(table.id)}
            key={table.id}
            value={table.id}>
            {table.table_name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tables.map((table) => (
        <TabsContent key={table.id} value={table.id}>
          <CardDescription
            style="text-black"
            options={[
              {
                id: 1,
                name: "New Item",
                onClick: () => handleNewItem(),
              },
            ]}
            name={table.table_name}
            title={"Manage table data"}
          />
          <Table>
            <TableCaption></TableCaption>
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
      ))}
    </Tabs>
  );
};

export default TablesToFulFill;
