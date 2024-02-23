import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SlugCart = ({ item, project_id, layout_id }) => {
  return (
    <section className="cursor-pointer group">
      <Link to={`/projects/${project_id}/${layout_id}/${item}`}>
        <h3 className="capitalize p-2 rounded bg-slate-200 hover:bg-slate-50 hover:text-blue-600 transition-colors text-sm font-medium flex justify-between items-center">
          {item}
          <div className="ml-2 overflow-hidden flex">
            <ArrowRightIcon className="h-4 w-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </div>
        </h3>
      </Link>
    </section>
  );
};

export default SlugCart;
