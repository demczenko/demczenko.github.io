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
import { v4 as uuidv4 } from "uuid";
import { ContextMenuRow } from "./ContextMenuTableRow";
import { Button } from "@/components/ui/button";
import HandleImportCSV from "../../../components/HandleImportCSV";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HandleNewItem from "./HandleNewItem";
import { useToast } from "@/components/ui/use-toast";
import { useDataTables } from "@/hooks/useDataTables";
import { List } from "@/components";

const TableFulfill = ({ setIsModalOpen, table_id, columns, project_id }) => {
  const {
    data: tablesData,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
    update: updateDataTable,
    set,
  } = useDataTables();
  const [error, setError] = useState("");
  const [columnsData, setData] = useState([]);
  const [slugsAlreadyExist, setSlugsAlreadyExist] = useState([]);
  const { toast } = useToast();

  const tableData = tablesData.filter((table) => table.table_id === table_id);

  const onDrop = useCallback((htmlFile) => {
    const html = htmlFile[0];
    handleImportCSV(html);
  }, []);

  const handle_complete = ({ data }) => {
    setError("");
    if (data.length < 0) {
      setError("Data is too short");
      return;
    }

    const isSlug = Object.keys(data[0])
      .map((k) => k.toLocaleLowerCase())
      .includes("slug");

    if (!isSlug) {
      setError("Slug is required");
      return;
    }

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
    setData(sorted_data_items);
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

  useEffect(() => {
    for (const { id, name, isSkip, isUpdate } of slugsAlreadyExist) {
      for (const data_item of columnsData) {
        for (const key in data_item) {
          data_item[key.toLowerCase()] = data_item[key];
        }
        if (data_item.slug.toLowerCase() === name.toLowerCase()) {
          if (isSkip) {
            handleDeleteRow(data_item.id);
            handleDeleteConflict(name);
          }

          if (isUpdate) {
            updateDataTable({
              ...data_item,
              id: id,
            });
            handleDeleteConflict(name);
            handleDeleteRow(data_item.id);
          }
        } else {
        }
      }
    }
  }, [slugsAlreadyExist, columnsData]);

  const handleDeleteRow = (id) => {
    setData((prev) => prev.filter((column) => column.id !== id));
  };

  const handleDeleteConflict = (name) => {
    setSlugsAlreadyExist((prev) => prev.filter((slug) => slug.name !== name));
  };

  const handlePopulateTable = () => {
    const alreadyExistsSlugs = [];
    for (const table_data_item of tableData) {
      for (const new_table_data_item of columnsData) {
        if (table_data_item.slug === new_table_data_item.slug) {
          alreadyExistsSlugs.push({
            name: table_data_item.slug,
            isSkip: false,
            isUpdate: false,
            id: table_data_item.id,
          });
        }
      }
    }

    if (alreadyExistsSlugs.length > 0) {
      setSlugsAlreadyExist(alreadyExistsSlugs);
    } else {
      for (const data_item of columnsData) {
        set({ ...data_item, project_id: project_id });
      }
      setIsModalOpen(false);
    }
  };

  const handleRemoveRow = ({ slug }) => {
    setData((prev) => prev.filter((column) => column.slug !== slug));
  };

  const handleNewItemAdd = (data) => {
    let isExist = false;
    const new_item = {
      ...data,
      id: uuidv4(),
      createdAt: Date.now(),
      project_id: project_id,
      table_id: table_id,
    };

    for (const data_item of tableData) {
      if (new_item.slug === data_item.slug) {
        isExist = true;
      }
    }

    if (!isExist) {
      set(new_item);
      toast({
        variant: "success",
        title: "Created",
        description: "Table data has been successfully created",
      });
    } else {
      updateDataTable(new_item);
      toast({
        variant: "success",
        title: "Updated",
        description: "Table data has been successfully updated",
      });
    }

    setIsModalOpen(false);
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
        objKey === "createdat" ||
        objKey === "updatedAt" ||
        objKey === "project_id" ||
        objKey === "id"
      )
        continue;
      columns.push(
        <TableCell
          key={i + value}
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
      <Tabs className="mt-6" defaultValue="import">
        <TabsList>
          <TabsTrigger value={"manually"}>New item</TabsTrigger>
          <TabsTrigger value={"import"}>Import CSV</TabsTrigger>
        </TabsList>
        <TabsContent value={"manually"}>
          {columnsData.length === 0 && (
            <>
              <HandleNewItem fields={columns} onSubmit={handleNewItemAdd} />
              {error && (
                <p className="text-sm font-semibold text-red-300 mt-4">
                  {error}
                </p>
              )}
            </>
          )}
        </TabsContent>
        <TabsContent value={"import"}>
          {columnsData.length === 0 && (
            <>
              <HandleImportCSV onDrop={onDrop} />
              {error && (
                <p className="text-sm font-semibold text-red-300 mt-4">
                  {error}
                </p>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>

      {columnsData.length !== 0 && (
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
      )}
      {columnsData.length > 0 && (
        <Button onClick={handlePopulateTable} className="w-full mt-2">
          Save
        </Button>
      )}

      {slugsAlreadyExist.length > 0 && (
        <List>
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
        </List>
      )}
    </>
  );
};

export default TableFulfill;
