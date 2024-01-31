import React, { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Papa from "papaparse";
import ImportConflict from "@/pages/Template/ImportConflict";
import { TabledataService } from "@/api/tables data/init";
import { useDropzone } from "react-dropzone";
import { ImportIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { ContextMenuRow } from "./ContextMenuTableRow";
import { Button } from "@/components/ui/button";

const TableFulfill = ({
  setTablesData,
  setIsModalOpen,
  table_id,
  columns,
  project_id,
}) => {
  const [error, setError] = useState("");
  const [columnsData, setColumnsData] = useState([]);
  const [tableData, setColData] = useState(null);
  const [slugsAlreadyExist, setSlugsAlreadyExist] = useState([]);

  const onDrop = useCallback((htmlFile) => {
    const html = htmlFile[0];
    handleImportCSV(html);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
    },
  });

  const handle_complete = ({ data }) => {
    // 1. Filter imported data by accepted keys in order to get only accepted columns from user CSV
    const acceptedColumns = columns.map((column) =>
      column.header.toLowerCase()
    );
    const sorted_data_items = [];
    // data_item = object from CSV table with keys that are responsible for columns (Slug: "de")
    for (const data_item of data) {
      // check if accepted keys includes column name that user specified
      // and add to accepted_data_items.
      const accepted_data_items = {};
      for (const key in data_item) {
        let lowerKey = key.toLowerCase();

        if (acceptedColumns.includes(lowerKey)) {
          if (data_item[key].length > 0) {
            accepted_data_items[lowerKey] = data_item[key];
          }
        }
      }
      // Filter out if accepted_data_items doesn't have the same length as acceptedColumns length
      if (Object.keys(accepted_data_items).length !== acceptedColumns.length) {
        console.error("Some key is empty for: " + accepted_data_items.slug);
      } else {
        let sorted = {};
        // 2. Sort data items according to acceptedColumns
        for (const accepted_column_name of acceptedColumns) {
          sorted = {
            ...sorted,
            [accepted_column_name]: accepted_data_items[accepted_column_name],
            table_id: table_id,
            createdAt: Date.now(),
            id: uuidv4(),
          };
        }

        sorted_data_items.push(sorted);
      }
    }
    setColumnsData(sorted_data_items);
    setTablesData((prev) => [...prev, ...sorted_data_items]);
  };

  const handleImportCSV = (file) => {
    Papa.parse(file, {
      header: true,
      error: function (err, file, inputElem, reason) {
        setError(err.toString());
        // executed if an error occurs while loading the file,
      },
      complete: handle_complete,
    });
  };

  // Fetch all tables data
  // TODO
  useEffect(() => {
    async function getTableDataFiltered() {
      try {
        const response = await TabledataService.getTabledata();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((table) => table.table_id === table_id);
          setColData(filtered);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (columnsData) {
      getTableDataFiltered();
    }
  }, [columnsData]);

  useEffect(() => {
    for (const { name, isSkip, isUpdate } of slugsAlreadyExist) {
      for (const data_item of columnsData) {
        if (data_item.Slug.toLowerCase() === name.toLowerCase()) {
          if (isSkip) {
            handleDeleteRow(data_item.id);
            handleDeleteConflict(name);
          }

          if (isUpdate) {
            TabledataService.updateTabledata(data_item);
            handleDeleteConflict(name);
            handleDeleteRow(data_item.id);
          }
        } else {
        }
      }
    }
  }, [slugsAlreadyExist, columnsData]);

  const handleDeleteRow = (id) => {
    setColumnsData((prev) => prev.filter((column) => column.id !== id));
  };

  const handleDeleteConflict = (name) => {
    setSlugsAlreadyExist((prev) => prev.filter((slug) => slug.name !== name));
  };

  const handlePopulateTable = () => {
    const alreadyExistsSlugs = [];
    for (const table_data_item of tableData) {
      for (const new_table_data_item of columnsData) {
        if (table_data_item.Slug === new_table_data_item.Slug) {
          alreadyExistsSlugs.push({
            name: table_data_item.Slug,
            isSkip: false,
            isUpdate: false,
          });
        }
      }
    }

    if (alreadyExistsSlugs.length > 0) {
      setSlugsAlreadyExist(alreadyExistsSlugs);
    } else {
      for (const data_item of columnsData) {
        TabledataService.setTabledata({ ...data_item, project_id: project_id });
      }
      setIsModalOpen(false);
    }
  };

  const handleRemoveRow = ({ slug }) => {
    setColumnsData((prev) => prev.filter((column) => column.slug !== slug));
  };

  const createRows = () => {
    return columnsData.map((colData, i) => {
      return (
        <TableRow className="hover:bg-blue-50 cursor-pointer" key={colData.id}>
          {...createColumns(colData, i)}
        </TableRow>
      );
    });
  };

  const createColumns = (colData, i) => {
    const columns = [];
    for (const objKey in colData) {
      const value = colData[objKey];
      if (
        objKey === "table_id" ||
        objKey === "createdAt" ||
        objKey === "updatedAt" ||
        objKey === "project_id" ||
        objKey === "id"
      )
        continue;
      columns.push(
        <TableCell
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
      <Table>
        <TableHeader>
          <TableRow className="flex items-center">
            {columns.map((column) => (
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
      {columnsData.length === 0 && (
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p className="group h-[400px] flex items-center justify-center font-semibold w-full bg-blue-100 border-2 border-blue-600 rounded-md border-dashed">
              <span className="text-xl text-center text-slate-50 flex gap-2 group-hover:text-blue-400 transition-colors group-hover:bg-slate-50 rounded-lg p-4 items-center cursor-pointer">
                Drag and drop only CSV file here, or click to select CSV file
                <ImportIcon />
              </span>
            </p>
          )}
        </div>
      )}
      {columnsData.length > 0 && (
        <Button onClick={handlePopulateTable} className="w-full mt-2">
          Save
        </Button>
      )}
      {slugsAlreadyExist.length > 0 && (
        <div className="mt-6">
          {slugsAlreadyExist.map((slug, i) => {
            return (
              <ImportConflict
                key={i}
                slug={slug.name}
                onSkip={() =>
                  setSlugsAlreadyExist((prev) =>
                    prev.map((item) => {
                      if (item.name === slug.name) {
                        return {
                          ...item,
                          isSkip: true,
                        };
                      }
                      return item;
                    })
                  )
                }
                onUpdate={() =>
                  setSlugsAlreadyExist((prev) =>
                    prev.map((item) => {
                      if (item.name === slug.name) {
                        return {
                          ...item,
                          isUpdate: true,
                        };
                      }
                      return item;
                    })
                  )
                }
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default TableFulfill;
