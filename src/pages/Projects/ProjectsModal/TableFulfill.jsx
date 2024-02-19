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
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import { List } from "@/components";
import { Loader } from "lucide-react";
import { useColumns } from "@/hooks/columns/useColumns";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { useDataTableCreate } from "@/hooks/dataTables/useDataTableCreate";
import { useDataTableUpdate } from "@/hooks/dataTables/useDataTableUpdate";
import { useQueryClient } from "react-query";

const TableFulfill = ({ setIsModalOpen, table_id, id, key_id }) => {
  const client = useQueryClient();
  const [error, setError] = useState("");
  const [columnsData, setData] = useState([]);
  const [slugsAlreadyExist, setSlugsAlreadyExist] = useState([]);
  const { toast } = useToast();

  const {
    data: columns,
    isLoading: isColumnsLoading,
    isError: isColumnsError,
  } = useColumns(`?table_id=${table_id}`, {
    refetchOnWindowFocus: false,
  });

  const {
    data: tableData,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
  } = useDataTables(`?table_id=${table_id}&${key_id}=${id}`);

  const {
    mutate: createDataTable,
    isLoading: isDataTableLoading,
    isError: isDataTableError,
  } = useDataTableCreate();

  const { mutate: dataTableUpdate, isLoading: IsDataTableUpdateLoading } =
    useDataTableUpdate();

  const onDrop = (htmlFile) => {
    const html = htmlFile[0];
    handleImportCSV(html);
  };

  const handle_complete = ({ data }) => {
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

        // check if length of content is greater than 0
        // if (acceptedColumns.includes(lowerKey)) {
        //   if (data_item[key].length > 0) {
        //     accepted_data_items[lowerKey] = data_item[key];
        //   }
        // }

        // not check if length of content is greater than 0
        if (acceptedColumns.includes(lowerKey)) {
          accepted_data_items[lowerKey] = data_item[key];
        }
      }

      // Filter out if accepted_data_items doesn't have the same length as acceptedColumns length
      // if (Object.keys(accepted_data_items).length !== acceptedColumns.length) {
      //   console.error("Some key is empty for: " + accepted_data_items.slug);
      // } else {
      //   let sorted = {};
      //   // 2. Sort data items according to acceptedColumns
      //   for (const accepted_column_name of acceptedColumns) {
      //     sorted = {
      //       ...sorted,
      //       [accepted_column_name]: accepted_data_items[accepted_column_name],
      //       table_id: table_id,
      //       createdat: Date.now(),
      //       id: uuidv4(),
      //     };
      //   }
      //   sorted_data_items.push(sorted);
      // }

      // Not Filter out if accepted_data_items doesn't have the same length as acceptedColumns length
      let sorted = {};
      // 2. Sort data items according to acceptedColumns
      for (const accepted_column_name of acceptedColumns) {
        sorted = {
          ...sorted,
          data: {
            ...sorted.data,
            [accepted_column_name]: accepted_data_items[accepted_column_name],
          },
          table_id: table_id,
          createdat: Date.now(),
          id: uuidv4(),
        };
      }
      sorted_data_items.push(sorted);
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

  const handleImport = async (data) => {
    const new_data_table = {
      ...data,
      [key_id]: id,
    };
    createDataTable(new_data_table, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create data table",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        client.invalidateQueries(`data-tables-?${key_id}=${id}`);
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Created",
          description: "Table data has been successfully created",
        });
      },
    });
  };

  const handleDeleteRow = (id) => {
    setData((prev) => prev.filter((column) => column.id !== id));
  };

  const handleDeleteConflict = (name) => {
    setSlugsAlreadyExist((prev) => prev.filter((slug) => slug.name !== name));
  };

  useEffect(() => {
    for (const { id, name, isSkip, isUpdate } of slugsAlreadyExist) {
      for (const data_item of columnsData) {
        for (const key in data_item.data) {
          data_item.data[key.toLowerCase()] = data_item.data[key];
        }
        if (data_item.data.slug.toLowerCase() === name.toLowerCase()) {
          if (isSkip) {
            handleDeleteRow(data_item.id);
            handleDeleteConflict(name);
          }

          if (isUpdate) {
            dataTableUpdate(
              {
                ...data_item,
                id: id,
              },
              {
                onError: () => {
                  toast({
                    variant: "destructive",
                    title: "Failed to create data table",
                    description: "Something went wrong",
                  });
                },
                onSettled: () => {
                  handleDeleteConflict(name);
                  handleDeleteRow(data_item.id);
                  client.invalidateQueries("components");
                },
                onSuccess: () => {
                  toast({
                    variant: "success",
                    title: "Created",
                    description: "Table data has been successfully created",
                  });
                },
              }
            );
          }
        }
      }
    }
  }, [slugsAlreadyExist, columnsData]);

  console.log(tableData);
  const handlePopulateTable = () => {
    const alreadyExistsSlugs = [];
    for (const table_data_item of tableData) {
      for (const new_table_data_item of columnsData) {
        if (table_data_item.data.slug === new_table_data_item.data.slug) {
          const alreadyExists = {
            name: table_data_item.data.slug,
            isSkip: false,
            isUpdate: false,
            id: table_data_item.id,
          };
          alreadyExistsSlugs.push(alreadyExists);
        }
      }
    }

    if (alreadyExistsSlugs.length > 0) {
      setSlugsAlreadyExist(alreadyExistsSlugs);
    } else {
      for (const data_item of columnsData) {
        handleImport(data_item);
      }
      setIsModalOpen(false);
    }
  };

  const handleRemoveRow = ({ slug }) => {
    setData((prev) => prev.filter((column) => column.slug !== slug));
  };

  const handleNewItemAdd = async (data) => {
    let isExist = false;
    let itemId;
    const new_item = {
      ...data,
      id: uuidv4(),
      createdat: Date.now(),
      table_id: table_id,
    };

    for (const data_item of tableData) {
      if (new_item.slug === data_item.slug) {
        isExist = true;
        itemId = data_item.id;
      }
    }

    if (!isExist) {
      handleImport(new_item);
    } else {
      dataTableUpdate(
        { ...new_item, id: itemId },
        {
          onError: () => {
            toast({
              variant: "destructive",
              title: "Failed to create data table",
              description: "Something went wrong",
            });
          },
          onSettled: () => {
            setIsModalOpen(false);
            client.invalidateQueries("components");
          },
          onSuccess: () => {
            toast({
              variant: "success",
              title: "Created",
              description: "Table data has been successfully created",
            });
          },
        }
      );
    }
  };

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

  if (isColumnsLoading || IsDataTableLoading) {
    return <SkeletonCard />;
  }

  if (isColumnsError || IsDataTableError) {
    return (
      <ErrorPage title={`Something went wrong while projects loading...`} />
    );
  }

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
