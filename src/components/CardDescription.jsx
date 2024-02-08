import React from "react";
import { Options } from ".";
import { cn } from "@/lib/utils";

const CardDescription = ({
  name,
  title,
  options,
  style,
  createdat,
  isProjectPage,
  isTemplatePage,
}) => {
  return (
    <div>
      <div className="flex flex-1 my-2 gap-2 items-center justify-between">
        <div
          className={cn(
            "w-full font-medium text-white overflow-hidden truncate max-w-48",
            style
          )}>
          {name}
        </div>
        {title && options && isTemplatePage && (
          <div className="w-1/2 flex justify-end">
            <Options options={options} title={title} style={style} />
          </div>
        )}
        {title && options && isProjectPage && (
          <div className="w-1/2 flex justify-end">
            <Options options={options} title={title} style={style} />
          </div>
        )}
      </div>
      {isProjectPage && (
        <div className="flex justify-between mt-2">
          {createdat && (
            <p className="text-xs">
              <span className="text-neutral-300">created at: </span>
              <span className="text-white font-semibold">
                {new Date(createdat).toDateString()}
              </span>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CardDescription;
