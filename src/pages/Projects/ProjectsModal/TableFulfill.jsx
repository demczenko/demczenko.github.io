import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ImportConflict from "@/pages/Template/ImportConflict";
import { TabledataService } from "@/api/tables data/init";

const TableFulfill = ({ table_id, columns }) => {
  const [columnsData, setColumnsData] = useState([]);
  const [tableData, setTablesData] = useState(null);
  const [slugsAlreadyExist, setSlugsAlreadyExist] = useState([]);

  // const [error, setError] = useState("");

  // const selectedColumns = columns.filter(
  //   (column) => column.table_id === table_id
  // );

  // const handle_complete = ({ data }) => {
  //   // 1. Filter imported data by accepted keys in order to get only accepted columns from user CSV
  //   const acceptedColumns = selectedColumns.map((column) =>
  //     column.header.toLowerCase()
  //   );
  //   const sorted_data_items = [];

  //   // data_item = object from CSV table with keys that are responsible for columns (Slug: "de")
  //   for (const data_item of data) {
  //     // check if accepted keys includes column name that user specified
  //     // and add to accepted_data_items.
  //     const accepted_data_items = {};
  //     for (const key in data_item) {
  //       if (acceptedColumns.includes(key.toLowerCase())) {
  //         if (data_item[key].length > 0) {
  //           accepted_data_items[key] = data_item[key];
  //         }
  //       }
  //     }

  //     // Filter out if accepted_data_items doesn't have the same length as acceptedColumns length
  //     if (Object.keys(accepted_data_items).length !== acceptedColumns.length) {
  //       console.error("Some key is empty for: " + accepted_data_items.Slug);
  //     } else {
  //       let sorted = {};
  //       // 2. Sort data items according to acceptedColumns
  //       for (const accepted_column_name of acceptedColumns) {
  //         sorted = {
  //           ...sorted,
  //           [accepted_column_name]: accepted_data_items[accepted_column_name],
  //           table_id: table_id,
  //           createdAt: Date.now(),
  //           id: uuidv4(),
  //         };
  //       }

  //       sorted_data_items.push(sorted);
  //     }
  //   }

  //   setColumnsData((prev) => [...prev, ...sorted_data_items]);
  // };

  // const handleImportCSV = (ev) => {
  //   // TODO: refactor
  //   if (!ev.target.files[0]) return;
  //   Papa.parse(ev.target.files[0], {
  //     header: true,
  //     error: function (err, file, inputElem, reason) {
  //       setError(err.toString());
  //       // executed if an error occurs while loading the file,
  //     },
  //     complete: handle_complete,
  //   });
  // };

  // Fetch all tables data
  // TODO
  useEffect(() => {
    async function getTableDataFiltered() {
      try {
        const response = await TabledataService.getTabledata();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((table) => table.table_id === table_id);
          setTablesData(filtered);
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

  const createRows = () => {
    return columnsData.map((colData, i) => {
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
          key={value + i}
          className={"p-2 text-nowrap truncate w-[200px] inline-block"}>
          <ContextMenuRow
            actions={[
              {
                id: 1,
                name: "Edit",
                onClick: () => handleEditRow(colData),
              },
              {
                id: 2,
                name: "Remove",
                onClick: () => handleRemoveRow(colData),
              },
              {
                id: 3,
                name: "Duplicate",
                onClick: () => handleDuplicateRow(colData),
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
