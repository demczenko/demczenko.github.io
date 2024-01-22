import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const SlugCart = ({ slug, project_id }) => {
  return (
    <section className="cursor-pointer group">
      <Link to={`/projects/${project_id}/${slug}`}>
        <h3 className="p-2 rounded bg-slate-200 hover:bg-slate-50 transition-colors text-sm font-medium flex justify-between items-center">
          {slug}
          <div className="overflow-hidden flex">
            <ArrowRightIcon className="h-4 w-4 -translate-x-1 group-hover:translate-x-0 transition-transform" />
          </div>
        </h3>
      </Link>
    </section>
  );
};

export default SlugCart;
