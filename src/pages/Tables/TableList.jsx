import TableCart from "./TableCart";
import { Heading, List } from "@/components";

// Handle columns, onDuplicate, onDeleteTable fetch inside component in order to reuse component through application.

const TablesList = ({
  onDeleteTable,
  onDuplicate,
  tables,
  project_id,
  isProject,
}) => {
  return (
    <>
      <div>
        <Heading title={"Tables"} />
        <List>
          {tables.map((table) => {
            return (
              <TableCart
                isProject={isProject}
                project_id={project_id}
                onDeleteTable={onDeleteTable}
                onDuplicate={onDuplicate}
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
