import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableService } from "@/api/tables/init";
import { ColumnService } from "@/api/columns/init";
import Papa from "papaparse";
import TemplateTable from "./TemplateTable";

const TablesToFulFill = ({ template_id, columnsData, setColumnsData }) => {
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

  const handleImportCSV = (ev) => {
    // TODO: refactor
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
            if (count == header.length) {
              // TODO: handle slug with the same name pl and pl
              setColumnsData((prev) => [
                ...prev,
                ...data.map((item) => ({ ...item, table_id: selectedTab, createdAt: Date.now() })),
              ]);
            }
          } else {
            setError(
              "File include key that is not allowed for this table. Key: " + key
            );
          }
        }
      },
    });
  };

  // Fetch all tables
  // TODO
  useEffect(() => {
    async function getTableList() {
      try {
        const response = await TableService.getTables();
        if (response.ok) {
          const data = await response.json();
          const filterdTables = data.filter(
            (table) => table.template_id === template_id
          );
          setTables(filterdTables);
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
      <TabsList className="w-full">
        {tables?.map((table) => (
          <TabsTrigger
            className="w-full"
            onClick={() => {
              console.log(table);
              setTab(table.id)
            }}
            key={table.id}
            value={table.id}>
            {table.table_name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tables.map((table) => (
        <TemplateTable
          removeRowItem={(slug) =>
            setColumnsData((prev) => prev.filter((item) => item.Slug !== slug))
          }
          error={error}
          handleImportCSV={handleImportCSV}
          key={table.id}
          selectedColumns={selectedColumns}
          selectedColumnsData={selectedColumnsData}
          table={table}
        />
      ))}
    </Tabs>
  );
};

export default TablesToFulFill;
