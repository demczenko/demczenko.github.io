import React from "react";
import { Options } from ".";
import { cn } from "@/lib/utils";

const CardDescription = ({ name, title, options, style }) => {
  return (
    <div className="flex mt-4">
      <div className={cn("w-full font-medium text-white overflow-hidden truncate", style)}>
        {name}
      </div>
      <div className="w-1/2 flex justify-end">
        <Options options={options} title={title} style={style} />
      </div>
    </div>
  );
};

export default CardDescription;
