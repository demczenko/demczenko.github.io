import React, { useState } from "react";
import TableFulfill from "../Projects/ProjectsModal/TableFulfill";
import { DrawerModal } from "@/components/Drawer";
import CartActions from "./CartActions";
import CartHeader from "@/components/CartHeader";
import { useColumns } from "@/hooks/useColumns";
import { useDataTables } from "@/hooks/useDataTables";

const TableCart = ({
  item,
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

  const {
    data: tablesData,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
    update: updateDataTable,
    set: setDataTable,
    remove,
  } = useDataTables();

  const isColumnsExists = columns.filter(
    (column) => column.table_id === item.id
  );

  const talbeData = tablesData.filter((data) => data.table_id === item.id);

  return (
    <>
      <section className="group">
        <CartHeader table_id={item.id} table_name={item.table_name} />
        {isProject && (
          <>
            {isColumnsExists.length > 0 && (
              <CartActions
                columns={talbeData.length}
                isProject={isProject}
                onDuplicate={() => onDuplicate(item.id)}
                onModalOpen={() => setIsModalOpen(true)}
                onDelete={() => onDeleteTable(item.id)}
              />
            )}
          </>
        )}
        {!isProject && (
          <CartActions
            columns={talbeData.length}
            isProject={isProject}
            onDuplicate={() => onDuplicate(item.id)}
            onModalOpen={() => setIsModalOpen(true)}
            onDelete={() => onDeleteTable(item.id)}
          />
        )}
      </section>
      <DrawerModal
        title={`Populate ${item.table_name} table`}
        description={"Import CSV file or fulfill data manually"}
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
        }}
        content={
          <TableFulfill
            setIsModalOpen={setIsModalOpen}
            project_id={project_id}
            table_id={item.id}
            columns={columns.filter((column) => column.table_id === item.id)}
          />
        }
      />
    </>
  );
};

export default TableCart;
