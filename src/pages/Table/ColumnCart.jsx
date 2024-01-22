import { ColumnService } from "@/api/columns/init";
import { DrawerModal } from "@/components/Drawer";
import { ArrowRightIcon } from "lucide-react";
import React, { useState } from "react";
import RenameTemplate from "../Templates/TemplateModal/RenameTemplate";
import { useNavigate } from "react-router-dom";

const ColumnCart = ({ column }) => {
  const navigator = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const onSubmit = (name) => {
    if (name.length < 3) return;
    ColumnService.updateColumn({ ...column, accessorKey: name, header: name });
    navigator("/templates/");
  };

  return (
    <>
      <section
        className="cursor-pointer group"
        onClick={() => setIsModalOpen(true)}>
        {/* table header */}
        <h3 className="p-2 rounded bg-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium flex justify-between items-center">
          {column.header}
          <div className="overflow-hidden flex">
            <ArrowRightIcon className="h-4 w-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </div>
        </h3>
        {/* table body */}
        {/* table footer */}
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all">
          <p className="text-xs font-semibold text-neutral-300">
            created at: {day}/{month}/{year}
          </p>
          <p className="text-xs font-semibold text-neutral-300">updated at: </p>
        </div>
      </section>
      <DrawerModal
        title={"Manage column"}
        description={"Change column name"}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <RenameTemplate placeholder={column?.header} onSubmit={onSubmit} />
        }
      />
    </>
  );
};

export default ColumnCart;
