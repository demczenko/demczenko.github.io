import React from "react";
import { HeadingActions } from ".";

const Heading = ({ title, paragraph, actions }) => {
  return (
    <div className="flex items-center justify-between col-span-full">
      <div className="flex flex-col">
        <h2 className="text-2xl font-semibold text-white">{title}</h2>
        {paragraph && (
          <h2 className="font-semibold  text-neutral-400 text-sm">
            {paragraph}
          </h2>
        )}
      </div>
      {actions && <HeadingActions actions={actions}/>}
    </div>
  );
};

export default Heading;
