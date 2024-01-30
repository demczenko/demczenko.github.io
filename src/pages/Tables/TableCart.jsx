import React, { useState } from "react";
import TableFulfill from "../Projects/ProjectsModal/TableFulfill";
import { AddProjectDrawer } from "../Projects/ProjectsModal/AddProjectDrawer";
import ImportConflict from "../Template/ImportConflict";
import { DrawerModal } from "@/components/Drawer";
import CartHeader from "./TableCartHeader";
import CartActions from "./CartActions";

const TableCart = ({
  table,
  columns,
  onDeleteTable,
  onDuplicate,
  project_id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="group mt-4">
        <CartHeader table_id={table.id} table_name={table.table_name} />
        <CartActions
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
            form={<TableFulfill table_id={table.id} columns={columns} />}
          />
        }
      />
    </>
  );
};

export default TableCart;
