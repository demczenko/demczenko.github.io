import React from "react";
import SlugCart from "./SlugCart";

const SlugList = ({ slugs, project_id }) => {

  if (!slugs.length) {
    return (
      <div className="fixed top-1/2 -translate-y-1/2 w-3/4 text-center z-10">
        <p className="text-6xl text-neutral-100 font-medium tracking-tight">
          Whooops!
        </p>
        <p className="text-sm text-neutral-400 font-medium mt-4">
          Looks like you don't have any available slug to render.
        </p>
        <p className="text-neutral-200 font-medium mt-12">
          Try to fulfill all tables with the same slugs
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl text-neutral-200 row-span-full my-2">Slugs</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {slugs.map((slug) => (
          <SlugCart key={slug} project_id={project_id} slug={slug} />
        ))}
      </div>
    </div>
  );
};

export default SlugList;
