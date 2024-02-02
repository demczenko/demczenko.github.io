import { TableService } from "@/api/tables/init";
import TableCart from "./TableCart";
import { Heading, List } from "@/components";
import { ColumnService } from "@/api/columns/init";
import { v4 as uuidv4 } from "uuid";
import { useDataTables } from "@/hooks/useDataTables";
import { useColumns } from "@/hooks/useColumns";

// Handle columns, onDuplicate, onDeleteTable fetch inside component in order to reuse component through application.

const TablesList = ({ setTables, tables, project_id, isProject }) => {
  const {
    data: columns,
    isError: IsColumnsError,
    isLoading: isColumnsLoading,
    update: updateColumn,
  } = useColumns();

  const {
    data: tablesData,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
    update: updateDataTable,
    remove,
  } = useDataTables();

  const onDeleteTable = (table_id) => {
    TableService.delete(table_id);
    columns
      .filter((column) => column.table_id === table_id)
      .forEach((element) => ColumnService.delete(element.id));
    tablesData
      .filter((table) => table.table_id === table_id)
      .forEach((element) => remove(element.id));
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

    TableService.set(new_table);
    change_columns_id.forEach((column) => ColumnService.set(column));
    setTables((prev) => [...prev, new_table]);
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
