import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const TableCart = ({ table }) => {

  const currentDate = new Date()
  const day = currentDate.getDate()
  const month = currentDate.getMonth() + 1
  const year = currentDate.getFullYear()
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
        <div className="mt-2 opacity-0 group-hover:opacity-100 transition-all">
          <p className="text-xs font-semibold text-neutral-300">created at: {day}/{month}/{year}</p>
          <p className="text-xs font-semibold text-neutral-300">updated at: </p>
        </div>
      </Link>
    </section>
  );
};

export default TableCart;
