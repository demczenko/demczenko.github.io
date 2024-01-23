import { ArrowRightIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const TableCart = ({ table, onDelete, content }) => {
  return (
    <section className="group">
      <Link to={`/table/${table.id}`}>
        {/* table header */}
        <h3 className="p-2 rounded bg-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors cursor-pointer text-sm font-medium flex justify-between items-center">
          {table.table_name}
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
  );
};

export default TableCart;
