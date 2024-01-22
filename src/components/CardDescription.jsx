import React from "react";
import { Options } from ".";
import { cn } from "@/lib/utils";

const CardDescription = ({ name, title, options, style }) => {
  return (
    <div className="flex flex-1 mt-2 gap-2 items-center justify-between">
      <div
        className={cn(
          "w-full font-medium text-white overflow-hidden truncate",
          style
        )}>
        {name}
      </div>
      {title && options && (
        <div className="w-1/2 flex justify-end">
          <Options options={options} title={title} style={style} />
        </div>
      )}
    </div>
  );
};

export default CardDescription;
