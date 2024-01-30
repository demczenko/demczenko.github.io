import { TableService } from "@/api/tables/init";
import TableCart from "./TableCart";
import { ColumnService } from "@/api/columns/init";
import { useEffect, useState } from "react";
import { TabledataService } from "@/api/tables data/init";
import { Button } from "@/components/ui/button";
import { DrawerModal } from "@/components/Drawer";
import { AddProjectDrawer } from "../Projects/ProjectsModal/AddProjectDrawer";
import TablesToFulFill from "../Projects/ProjectsModal/TablesToFulFill";
import { Copy, ImportIcon } from "lucide-react";
import ImportConflict from "../Template/ImportConflict";
import { Heading, List } from "@/components";
import { v4 as uuidv4 } from "uuid";

const TablesList = ({ tables, project_id }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnsData, setColumnsData] = useState([]);
  const [isConflict, setConflict] = useState("");
  const [slugsAlreadyExist, setSlugsAlreadyExist] = useState([]);

  const [tableId, setTableId] = useState(null);
  const [columns, setColumns] = useState(null);
  const [tableData, setTablesData] = useState(null);

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

  // Fetch all tables data
  // TODO
  useEffect(() => {
    async function getTableDataFiltered() {
      try {
        const response = await TabledataService.getTabledata();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter((table) => table.table_id === tableId);
          setTablesData(filtered);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (tableId || columnsData) {
      getTableDataFiltered();
    }
  }, [tableId, columnsData]);

  if (columns && tableData && tableId) {
    TableService.deleteTable(tableId);
    columns
      .filter((column) => column.table_id === tableId)
      .forEach((element) => ColumnService.deleteColumn(element.id));
    tableData.forEach((element) =>
      TabledataService.deleteTabledata(element.id)
    );
  }

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
      setColumnsData([]);
    }
  };

  const handleDeleteRow = (id) => {
    setColumnsData((prev) => prev.filter((column) => column.id !== id));
  };

  const handleDeleteConflict = (name) => {
    setSlugsAlreadyExist((prev) => prev.filter((slug) => slug.name !== name));
  };

  const handleDuplicate = (id) => {
    const duplicateTable = tables.find((table) => table.id == id);
    const new_template_id = uuidv4();
    const new_table = {
      ...duplicateTable,
      id: new_template_id,
      table_name: duplicateTable.table_name + " Copy",
    };

    // Get columns for selected id
    const new_columns = columns.filter((column) => column.table_id === id);
    // Change columns id
    const change_columns_id = new_columns.map((col) => ({
      ...col,
      id: uuidv4(),
      table_id: new_template_id,
    }));

    TableService.setTables(new_table)
    change_columns_id.forEach((column) => ColumnService.setColumns(column));
  };

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

  return (
    <>
      <div>
        <Heading title={"Tables"} />
        <List>
          {tables.map((table) => (
            <TableCart
              key={table.id}
              onDelete={setTableId}
              table={table}
              content={
                <div className="flex">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
                    onClick={() => setIsModalOpen(true)}>
                    <ImportIcon className="pr-2" /> Populate
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
                    onClick={() => {
                      handleDuplicate(table.id);
                    }}>
                    <Copy className="pr-2" /> Duplicate
                  </Button>
                </div>
              }
            />
          ))}
        </List>
      </div>
      <DrawerModal
        title={"Populate table"}
        description={"Import tables from CSV file or fulfill data manually"}
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
          setColumnsData([]);
        }}
        content={
          <AddProjectDrawer
            form={
              <>
                <TablesToFulFill
                  template_id={tables[0]?.template_id}
                  columnsData={columnsData}
                  setColumnsData={setColumnsData}
                />
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
            }
          />
        }
      />
    </>
  );
};

export default TablesList;
