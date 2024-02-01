import React from "react";
import { Heading } from "@/components";
import ProjectStyleCart from "./ProjectStyleCart";

const ProjectStyleList = ({ handleDelete, styles }) => {
  if (!styles.length) {
    return (
      <div className="text-center">
        <p className="text-6xl text-neutral-100 font-medium tracking-tight">
          Whooops!
        </p>
        <p className="text-sm text-neutral-400 font-medium mt-4">
          Looks like you don't have any available styles to render.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Heading title={"Project style"} />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 mt-4">
        {styles.map((item) => {
          for (const key in item.style) {
            const value = item.style[key];
            if (value) {
              return (
                <ProjectStyleCart
                  handleDelete={() => handleDelete(item.id)}
                  key={item.id}
                  name={key}
                  value={value}
                />
              );
            }
          }
        })}
      </div>
    </div>
  );
};

export default ProjectStyleList;
