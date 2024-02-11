import { Button } from "@/components/ui/button";
import { Copy, ImportIcon, Rows, TrashIcon } from "lucide-react";
import React from "react";

const CartActions = ({ onDuplicate, onDelete }) => {
  return (
    <div className="flex items-center justify-start">
      <Button
        size="sm"
        variant="ghost"
        className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
        onClick={onDuplicate}
      >
        <Copy className="pr-2" /> Duplicate
      </Button>
      <Button
        size="sm"
        variant="ghost"
        className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
        onClick={onDelete}
      >
        <TrashIcon className="pr-2" />
        Delete
      </Button>
    </div>
  );
};

export default CartActions;
