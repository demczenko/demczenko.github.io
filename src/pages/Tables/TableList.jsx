import TableCart from "./TableCart";
import { Heading, List } from "@/components";

const TablesList = ({
  onDeleteTable,
  onDuplicate,
  tables,
  project_id,
  isProject,
  actions,
}) => {
  return (
    <>
      <div>
        <Heading title={"Tables"} actions={actions} />
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
