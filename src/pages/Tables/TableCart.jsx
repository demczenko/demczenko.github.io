import React, { useState } from "react";
import TableFulfill from "../Projects/ProjectsModal/TableFulfill";
import { AddProjectDrawer } from "../Projects/ProjectsModal/AddProjectDrawer";
import { DrawerModal } from "@/components/Drawer";
import CartActions from "./CartActions";
import CartHeader from "@/components/CartHeader";
import { useColumns } from "@/hooks/useColumns";

const TableCart = ({
  table,
  onDeleteTable,
  onDuplicate,
  project_id,
  isProject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    data: columns,
    isError: IsColumnsError,
    isLoading: isColumnsLoading,
    update: updateColumn,
    set: setColumn,
    remove: removeColumn,
  } = useColumns();

  const isColumnsExists = columns.filter(
    (column) => column.table_id === table.id
  );

  return (
    <>
      <section className="group mt-2">
        <CartHeader table_id={table.id} table_name={table.table_name} />
        {isProject && (
          <>
            {isColumnsExists.length > 0 && (
              <CartActions
                isProject={isProject}
                onDuplicate={() => onDuplicate(table.id)}
                onModalOpen={() => setIsModalOpen(true)}
                onDelete={() => onDeleteTable(table.id)}
              />
            )}
          </>
        )}
        {!isProject && (
          <CartActions
            isProject={isProject}
            onDuplicate={() => onDuplicate(table.id)}
            onModalOpen={() => setIsModalOpen(true)}
            onDelete={() => onDeleteTable(table.id)}
          />
        )}
      </section>
      <DrawerModal
        title={`Populate ${table.table_name} table`}
        description={"Import CSV file or fulfill data manually"}
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
        }}
        content={
          <TableFulfill
            setIsModalOpen={setIsModalOpen}
            project_id={project_id}
            table_id={table.id}
            columns={columns.filter((column) => column.table_id === table.id)}
          />
        }
      />
    </>
  );
};

export default TableCart;
