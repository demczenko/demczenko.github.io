import { ArrowRightIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const TableCart = ({ table, onDelete }) => {
  return (
    <section className="cursor-pointer group">
      <Link to={`/table/${table.id}`}>
        {/* table header */}
        <h3 className="p-2 rounded bg-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium flex justify-between items-center">
          {table.table_name}
          <div className="overflow-hidden flex">
            <ArrowRightIcon className="h-4 w-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </div>
        </h3>
        {/* table body */}
        {/* table footer */}
        <div className="flex justify-between mt-2">
          <div className="opacity-50 group-hover:opacity-100 transition-all">
            <p className="text-xs font-semibold text-neutral-300">
              created at: {new Date(table.createdAt).toDateString()}
            </p>
            <p className="text-xs font-semibold text-neutral-300">
              updated at:{" "}
            </p>
          </div>
          <TrashIcon onClick={onDelete} className="h-4 w-4" />
        </div>
      </Link>
    </section>
  );
};

export default TableCart;
