import { Button } from "@/components/ui/button";
import { Copy, ImportIcon, Rows, TrashIcon } from "lucide-react";
import React from "react";

const CartActions = ({
  columns,
  onModalOpen,
  onDuplicate,
  isProject,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-start">
      {isProject && (
        <>
          <Button
            size="sm"
            variant="ghost"
            className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
            onClick={onModalOpen}>
            <ImportIcon className="pr-2" /> Populate
          </Button>
          <Button
            className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
            size="sm"
            variant="ghost">
            <Rows className="pr-2" />
            Rows: {columns}
          </Button>
        </>
      )}
      {!isProject && (
        <>
          <Button
            size="sm"
            variant="ghost"
            className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
            onClick={onDuplicate}>
            <Copy className="pr-2" /> Duplicate
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
            onClick={onDelete}>
            <TrashIcon className="pr-2" />
            Delete
          </Button>
        </>
      )}
    </div>
  );
};

export default CartActions;
