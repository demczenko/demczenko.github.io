import React from "react";
import { HeadingActions } from ".";
import { Button } from "./ui/button";

const Heading = ({ title, paragraph, action, actions }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-2 grow">
        <h1 className="scroll-m-20 xl:text-4xl text-2xl font-bold tracking-tight text-white">{title}</h1>
        {paragraph && <p className="text-sm text-neutral-300">{paragraph}</p>}
      </div>
      {action && (
        <Button size="sm" className="flex gap-2" variant="outline" onClick={action.onClick}>
          {"icon" in action && action.icon}
          <span className="md:inline-block hidden">{action.name}</span>
        </Button>
      )}
      {actions && <HeadingActions actions={actions} />}
    </div>
  );
};

export default Heading;
