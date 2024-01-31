import { DrawerModal } from "@/components/Drawer";
import { TrashIcon } from "lucide-react";
import React, { useState } from "react";
import RenameTemplate from "../Templates/TemplateModal/RenameTemplate";
import { TabledataService } from "@/api/tables data/init";
import CartHeader from "@/components/CartHeader";
import { Button } from "@/components/ui/button";

const TableDataCart = ({ setTablesData, table, onDelete, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (name) => {
    if (name.length < 3) return;
    const new_tabledata = {
      ...table,
      ...name,
      updatedAt: Date.now(),
    }
    TabledataService.updateTabledata(new_tabledata);
    setTablesData(prev => ([...prev, new_tabledata]))
  };

  return (
    <>
      <section className="group" onClick={() => setIsModalOpen(true)}>
        <CartHeader table_id={table.id} table_name={table.slug} />
        {content}
        <div className="flex justify-between mt-2">
          <div className="opacity-50 group-hover:opacity-100 transition-all">
            <p className="text-xs">
              <span className="text-neutral-300">created at: </span>
              <span className="text-white font-semibold">
                {new Date(table.createdAt).toDateString()}
              </span>
            </p>
            {table.updatedAt && (
              <p className="text-xs">
                <span className="text-neutral-300">
                  updated at: {new Date(table.updatedAt).toDateString()}
                </span>
              </p>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
            onClick={() => onDelete(table.id)}>
            <TrashIcon className="pr-2" />
            Delete
          </Button>
        </div>
      </section>
      <DrawerModal
        title={"Manage data column"}
        description={"Change data column"}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <div className="grid md:grid-cols-2 grid-cols-1 gap-1">
            {Object.entries(table).map(([objKey, value], i) => {
              if (
                objKey === "table_id" ||
                objKey === "createdAt" ||
                objKey === "updatedAt" ||
                objKey === "project_id" ||
                objKey === "id"
              ) {
                return;
              }
              return (
                <RenameTemplate
                  key={i}
                  placeholder={value}
                  label={objKey}
                  onSubmit={onSubmit}
                />
              );
            })}
          </div>
        }
      />
    </>
  );
};

export default TableDataCart;
