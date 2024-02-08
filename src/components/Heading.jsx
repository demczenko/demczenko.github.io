import React from "react";
import { HeadingActions } from ".";
import { Button } from "./ui/button";

const Heading = ({ title, paragraph, action, actions }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="space-y-2 grow">
        <h1 className="scroll-m-20 text-4xl font-bold tracking-tight text-white">{title}</h1>
        {paragraph && <p className="text-sm text-neutral-300">{paragraph}</p>}
      </div>
      {action && (
        <Button size="sm" variant="outline" onClick={action.onClick}>
          {"icon" in action && action.icon}
          {action.name}
        </Button>
      )}
      {actions && <HeadingActions actions={actions} />}
    </div>
  );
};

export default Heading;
