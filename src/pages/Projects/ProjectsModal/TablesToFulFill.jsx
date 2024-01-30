import React, { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableService } from "@/api/tables/init";
import { ColumnService } from "@/api/columns/init";
import Papa from "papaparse";
import TemplateTable from "./TemplateTable";
import { v4 as uuidv4 } from "uuid";


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

  const handle_complete = ({ data }) => {
    // 1. Filter imported data by accepted keys in order to get only accepted columns from user CSV
    const acceptedColumns = selectedColumns.map((column) => column.header.toLowerCase());
    const sorted_data_items = [];

    // data_item = object from CSV table with keys that are responsible for columns (Slug: "de")
    for (const data_item of data) {
      // check if accepted keys includes column name that user specified
      // and add to accepted_data_items.
      const accepted_data_items = {};
      for (const key in data_item) {
        if (acceptedColumns.includes(key.toLowerCase())) {
          if (data_item[key].length > 0) {
            accepted_data_items[key] = data_item[key];
          }
        }
      }

      // Filter out if accepted_data_items doesn't have the same length as acceptedColumns length
      if (Object.keys(accepted_data_items).length !== acceptedColumns.length) {
        console.error("Some key is empty for: " + accepted_data_items.Slug);
      } else {
        let sorted = {};
        // 2. Sort data items according to acceptedColumns
        for (const accepted_column_name of acceptedColumns) {
          sorted = {
            ...sorted,
            [accepted_column_name]: accepted_data_items[accepted_column_name],
            table_id: selectedTab,
            createdAt: Date.now(),
            id: uuidv4()
          };
        }

        sorted_data_items.push(sorted);
      }
    }

    setColumnsData((prev) => [...prev, ...sorted_data_items]);
  };

  const handleImportCSV = (ev) => {
    // TODO: refactor
    if (!ev.target.files[0]) return;
    Papa.parse(ev.target.files[0], {
      header: true,
      error: function (err, file, inputElem, reason) {
        setError(err.toString());
        // executed if an error occurs while loading the file,
      },
      complete: handle_complete,
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
              setTab(table.id);
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
