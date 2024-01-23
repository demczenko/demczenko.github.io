import { DrawerModal } from "@/components/Drawer";
import { ArrowRightIcon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RenameTemplate from "../Templates/TemplateModal/RenameTemplate";
import { TabledataService } from "@/api/tables data/init";

const TableDataCart = ({ table, onDelete, content }) => {
  const navigator = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = (name) => {
    if (name.length < 3) return;
    TabledataService.updateTabledata({ ...table, ...name });
    navigator("/projects/");
  };

  return (
    <>
      <section className="group" onClick={() => setIsModalOpen(true)}>
        <Link to={`/table/${table.id}`}>
          {/* table header */}
          <h3 className="p-2 rounded bg-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer text-sm font-medium flex justify-between items-center">
            {table.Slug}
            <div className="overflow-hidden flex">
              <ArrowRightIcon className="h-4 w-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
            </div>
          </h3>
          {/* table body */}
          {/* table footer */}
        </Link>
        {content}
        <div className="flex justify-between mt-2">
          <div className="opacity-50 group-hover:opacity-100 transition-all">
            <p className="text-xs">
              <span className="text-neutral-300">created at: </span>
              <span className="text-white font-semibold">
                {new Date(table.createdAt).toDateString()}
              </span>
            </p>
            <p className="text-xs">
              <span className="text-neutral-300">updated at: </span>
            </p>
          </div>
          <TrashIcon
            onClick={() => onDelete(table.id)}
            className="h-4 w-4 cursor-pointer"
          />
        </div>
      </section>
      <DrawerModal
        title={"Manage data column"}
        description={"Change data column"}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={Object.entries(table).map(([objKey, value], i) => {
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
      />
    </>
  );
};

export default TableDataCart;
