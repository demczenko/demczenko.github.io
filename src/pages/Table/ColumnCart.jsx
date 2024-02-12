import { useState } from "react";
import { ArrowRightIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreateForm } from "@/components/CreateForm";

const ColumnCart = ({ item, onRename, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="cursor-pointer group">
        {/* table header */}
        <h3
          onClick={() => (item.type === "slug" ? null : setIsModalOpen(true))}
          className="capitalize p-2 rounded bg-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium flex justify-between items-center">
          {item.header}
          <div className="overflow-hidden flex">
            <ArrowRightIcon className="h-4 w-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </div>
        </h3>
        {/* table body */}
        {/* table footer */}
        <div className="mt-2 opacity-50 group-hover:opacity-100 group-hover:font-semibold transition-all">
          <p className="text-xs font-semibold text-neutral-300">
            created at: {new Date(item.createdat).toDateString()}
          </p>
        </div>
        <div className="flex">
          <Button
            size="sm"
            variant="ghost"
            className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
            onClick={onDelete}>
            <TrashIcon className="pr-2" />
            Delete
          </Button>
        </div>
      </section>
      <CreateForm
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        fields={[
          {
            id: 1,
            name: "header",
            title: "Column name",
            placeholder: "name",
          },
        ]}
        onSubmit={(data) => onRename(item, data)}
        title={"Manage column"}
        description={"Change column name"}
      />
    </>
  );
};

export default ColumnCart;
