import { TableService } from "@/api/tables/init";
import TableCart from "./TableCart";
import { Heading, List } from "@/components";
import { ColumnService } from "@/api/columns/init";
import { useEffect, useState } from "react";
import { TabledataService } from "@/api/tables data/init";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

// Handle columns, onDuplicate, onDeleteTable fetch inside component in order to reuse component through application.

const TablesList = ({ setTables, tables, project_id, isProject }) => {
  const [columns, setColumns] = useState(null);
  const [tablesData, setTablesData] = useState([]);

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
    async function getTableData() {
      try {
        const response = await TabledataService.getTabledata();
        if (response.ok) {
          const data = await response.json();
          setTablesData(data);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getTableData();
  }, []);
  const onDeleteTable = (table_id) => {
    TableService.deleteTable(table_id);
    columns
      .filter((column) => column.table_id === table_id)
      .forEach((element) => ColumnService.deleteColumn(element.id));
    tablesData
      .filter((table) => table.table_id === table_id)
      .forEach((element) => TabledataService.deleteTabledata(element.id));
  };

  const onDuplicate = (table_id) => {
    const duplicateTable = tables.find((table) => table.id == table_id);
    const new_template_id = uuidv4();
    const new_table = {
      ...duplicateTable,
      id: new_template_id,
      table_name: duplicateTable.table_name + " Copy",
    };

    // Get columns for selected id
    const new_columns = columns.filter(
      (column) => column.table_id === table_id
    );
    // Change columns id
    const change_columns_id = new_columns.map((col) => ({
      ...col,
      id: uuidv4(),
      table_id: new_template_id,
    }));

    TableService.setTables(new_table);
    change_columns_id.forEach((column) => ColumnService.setColumns(column));
    setTables(prev => ([...prev, new_table]))
  };

  return (
    <>
      <div>
        <Heading title={"Tables"} />
        <List>
          {tables.map((table) => {
            // console.log(
            //   tablesData?.filter((table) => table.table_id === table.id)
            // );
            return (
              <TableCart
                isProject={isProject}
                project_id={project_id}
                onDeleteTable={onDeleteTable}
                onDuplicate={onDuplicate}
                columns={columns.filter(
                  (column) => column.table_id === table.id
                )}
                key={table.id}
                table={table}
              />
            );
          })}
        </List>
      </div>
    </>
  );
};

export default TablesList;
