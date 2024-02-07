import React from "react";
import { HeadingActions } from ".";
import { Button } from "./ui/button";

const Heading = ({ title, paragraph, action, actions }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {paragraph && (
          <h2 className="font-semibold  text-neutral-400 text-sm">
            {paragraph}
          </h2>
        )}
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
