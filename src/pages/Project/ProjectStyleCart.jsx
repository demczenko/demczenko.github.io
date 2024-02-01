import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import React from "react";

const ProjectStyleCart = ({ handleDelete, name, value }) => {
  return (
    <section className="cursor-pointer group">
      <div className="p-2 rounded bg-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors text-sm font-medium flex justify-between items-center">
        <span>{name}</span>
        <span>{value}</span>
      </div>
      <div className="flex">
        <Button
          size="sm"
          variant="ghost"
          className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
          onClick={handleDelete}>
          <TrashIcon className="pr-2" />
          Delete
        </Button>
      </div>
    </section>
  );
};

export default ProjectStyleCart;
