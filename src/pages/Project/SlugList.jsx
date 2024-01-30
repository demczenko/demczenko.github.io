import React from "react";
import SlugCart from "./SlugCart";
import { Heading } from "@/components";

const SlugList = ({ slugs, project_id }) => {
  if (!slugs.length) {
    return (
      <div className="text-center">
        <p className="text-6xl text-neutral-100 font-medium tracking-tight">
          Whooops!
        </p>
        <p className="text-sm text-neutral-400 font-medium mt-4">
          Looks like you don't have any available slug to render.
        </p>
        <p className="text-neutral-200 font-medium mt-6">
          Try to fulfill all tables with the same slugs
        </p>
      </div>
    );
  }

  return (
    <div>
      <Heading title={"Slugs"} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
        {slugs.map((slug) => (
          <SlugCart key={slug} project_id={project_id} slug={slug} />
        ))}
      </div>
    </div>
  );
};

export default SlugList;
