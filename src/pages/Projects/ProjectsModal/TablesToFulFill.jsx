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
import { Button } from "@/components/ui/button";
import Papa from "papaparse";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TablesToFulFill = ({ columnsData, setColumnsData }) => {
  const [tables, setTables] = useState([]);
  const [selectedTab, setTab] = useState();
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState("");

  if (tables.length > 0 && !selectedTab) {
    setTab(tables[0].id);
  }


  const selectedColumns = columns.filter(
    (column) => column.table_id === selectedTab
  );
  const selectedColumnsData = columnsData.filter(
    (col) => col.table_id === selectedTab
  );

  console.log(selectedColumnsData);

  const handleNewItem = () => {
    alert("New item selected");
  };
  const handleImportCSV = (ev) => {
    if (!ev.target.files[0]) return;
    Papa.parse(ev.target.files[0], {
      header: true,
      error: function (err, file, inputElem, reason) {
        // executed if an error occurs while loading the file,
      },
      complete: function ({ data }) {
        setError("");
        // executed after all files are complete
        let count = 0;
        const header = selectedColumns.map((column) => column.header);
        const firstObject = data[0];
        for (const key in firstObject) {
          if (header.includes(key)) {
            count += 1;
            console.log(count, header.length);
            if (count == header.length) {
              setColumnsData(data.map(item => ({ ...item, table_id: selectedTab})));
            }
          } else {
            setError(
              "CSV File include key that is not allowed for this table. Key: " +
                key
            );
          }
        }
        // setColumnsData(data)
      },
    });
  };

  const createRows = () => {
    return selectedColumnsData?.map((colData, i) => {
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
          console.log(data);
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
              {
                id: 2,
                name: <Label htmlFor="csv_file">Import CSV</Label>,
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
      <Input
        id="csv_file"
        className="hidden"
        type="file"
        onChange={handleImportCSV}
      />
      {error && <p className="text-sm text-red-300">{error}</p>}
    </Tabs>
  );
};

export default TablesToFulFill;
