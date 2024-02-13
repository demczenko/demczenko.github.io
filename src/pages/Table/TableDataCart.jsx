import { DrawerModal } from "@/components/Drawer";
import { Edit2, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import RenameTemplate from "../Templates/TemplateModal/RenameTemplate";
import CartHeader from "@/components/CartHeader";
import { Button } from "@/components/ui/button";

const TableDataCart = ({ onUpdate, table, onDelete, content }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (name) => {
    if (name.length < 3) return;
    const new_tabledata = {
      id: table.id,
      ...name,
      updatedAt: Date.now(),
    };
    onUpdate(new_tabledata);
  };

  return (
    <>
      <section className="group">
        <CartHeader
          onClick={() => setIsModalOpen(true)}
          table_name={table.slug}
        />
        {content}
        <div className="flex justify-between mt-2">
          <div className="opacity-50 group-hover:opacity-100 transition-all">
            <p className="text-xs">
              <span className="text-neutral-300">created at: </span>
              <span className="text-white font-semibold">
                {new Date(table.createdat).toDateString()}
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
          <div className="flex items-center justify-center gap-2">
            <Button
              size="sm"
              variant="ghost"
              className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
              onClick={() => setIsModalOpen(true)}>
              <Edit2 className="pr-2" />
              Edit
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
              onClick={onDelete}>
              <TrashIcon className="pr-2" />
              Delete
            </Button>
          </div>
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
                objKey === "createdat" ||
                objKey === "createdat" ||
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
