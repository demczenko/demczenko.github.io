import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import { v4 as uuidv4 } from "uuid";
import ImportConflict from "@/pages/Template/ImportConflict";
import HandleImportCSV from "./HandleImportCSV";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import { List } from "@/components";
import { useColumns } from "@/hooks/columns/useColumns";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { useDataTableCreate } from "@/hooks/dataTables/useDataTableCreate";
import { useDataTableUpdate } from "@/hooks/dataTables/useDataTableUpdate";
import { useQueryClient } from "react-query";
import ManualTableFulFill from "./ManualTableFulFill";
import { useImportCSV } from "@/hooks/useImportCSV";
import RenderCSVData from "./RenderCSVData";

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

  const handleImportCSV = (file) => {
    Papa.parse(file, {
      header: true,
      error: (err, file, inputElem, reason) => setError(err.toString()),
      complete: ({ data }) => {
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
        const acceptedColumns = columns.map((column) =>
          column.header.toLowerCase()
        );

        const sorted_data_items = useImportCSV(data, acceptedColumns);

        const items_with_ids = [];
        for (const slug_data of sorted_data_items) {
          items_with_ids.push({
            data: slug_data,
            slug: slug_data.slug.toLowerCase(),
            table_id: table_id,
            [key_id]: id,
            id: uuidv4(),
          });
        }
        setData(items_with_ids);
      },
    });
  };

  const handleUpdate = (data) => {
    dataTableUpdate(data, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to update data table",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        handleDeleteConflict(data.slug);
        handleDeleteRow(data.id);
        client.invalidateQueries(`data-tables-?${key_id}=${id}`);
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Created",
          description: "Table data has been successfully updated",
        });
      },
    });
  };

  const handleImport = async (data) => {
    createDataTable(data, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create data table",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        setIsModalOpen(false);
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
            handleUpdate({
              ...data_item,
              id: id,
            });
            handleDeleteRow(data_item.id);
          }
        }
      }
    }
  }, [slugsAlreadyExist, columnsData]);

  const handlePopulateTable = () => {
    const alreadyExistsSlugs = [];
    for (const table_data_item of tableData ?? []) {
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
    }
  };

  const handleRemoveRow = ({ slug }) => {
    setData((prev) => prev.filter((column) => column.slug !== slug));
  };

  if (isColumnsLoading || IsDataTableLoading) {
    return <SkeletonCard isContainer={true} />;
  }

  if (isColumnsError || IsDataTableError) {
    return (
      <ErrorPage title={`Something went wrong while projects loading...`} />
    );
  }

  return (
    <>
      <Tabs className="grow flex flex-col" defaultValue="import">
        {columnsData.length <= 0 && (
          <TabsList className="w-full">
            <TabsTrigger className="w-full" value={"manually"}>
              New item
            </TabsTrigger>
            <TabsTrigger className="w-full" value={"import"}>
              Import CSV
            </TabsTrigger>
          </TabsList>
        )}
        <ManualTableFulFill
          isLoading={isDataTableLoading || IsDataTableUpdateLoading}
          key_id={key_id}
          id={id}
          tableData={tableData}
          columns={columns}
          error={error}
          table_id={table_id}
          columnsData={columnsData}
          handleImport={handleImport}
          handleUpdate={handleUpdate}
        />
        <TabsContent value={"import"}>
          {columnsData.length === 0 ? (
            <>
              <HandleImportCSV onDrop={onDrop} />

              {error && (
                <p className="text-sm font-semibold text-red-300 mt-4">
                  {error}
                </p>
              )}
            </>
          ) : (
            <RenderCSVData
              columns={columns}
              columnsData={columnsData}
              handleRemoveRow={handleRemoveRow}
              isDataTableLoading={isDataTableLoading}
              handlePopulateTable={handlePopulateTable}
            />
          )}
        </TabsContent>
      </Tabs>

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
