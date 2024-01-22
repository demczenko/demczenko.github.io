import React from "react";
import SlugCart from "./SlugCart";

const SlugList = ({ slugs, project_id }) => {
  return (
    <>
      {slugs.map((slug) => (
        <SlugCart key={slug} project_id={project_id} slug={slug} />
      ))}
    </>
  );
};

export default SlugList;
