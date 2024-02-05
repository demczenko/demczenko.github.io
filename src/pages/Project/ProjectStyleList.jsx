import React from "react";
import { Heading, List } from "@/components";
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
      <List>
        {styles.map((item) => {
          for (const key in item.style) {
            const value = item.style[key];
            const name = item.style["name"];
            if (value) {
              return (
                <ProjectStyleCart
                  handleDelete={() => handleDelete(item.id)}
                  key={item.id}
                  name={name ?? "default"}
                  value={value}
                />
              );
            }
          }
        })}
      </List>
    </div>
  );
};

export default ProjectStyleList;
