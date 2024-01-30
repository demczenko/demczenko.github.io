import React, { useState } from "react";
import TableFulfill from "../Projects/ProjectsModal/TableFulfill";
import { AddProjectDrawer } from "../Projects/ProjectsModal/AddProjectDrawer";
import { DrawerModal } from "@/components/Drawer";
import CartActions from "./CartActions";
import CartHeader from "@/components/CartHeader";

const TableCart = ({
  table,
  columns,
  onDeleteTable,
  onDuplicate,
  project_id,
  isProject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="group mt-4">
        <CartHeader table_id={table.id} table_name={table.table_name} />
        <CartActions
          isProject={isProject}
          onDuplicate={() => onDuplicate(table.id)}
          onModalOpen={() => setIsModalOpen(true)}
          onDelete={() => onDeleteTable(table.id)}
        />
      </section>
      <DrawerModal
        title={`Populate ${table.table_name} table`}
        description={"Import CSV file or fulfill data manually"}
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
        }}
        content={
          <AddProjectDrawer
            form={
              <TableFulfill
                setIsModalOpen={setIsModalOpen}
                project_id={project_id}
                table_id={table.id}
                columns={columns}
              />
            }
          />
        }
      />
    </>
  );
};

export default TableCart;
