import React from "react";
import { Options } from ".";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Badge } from "./ui/badge";
import { LinkIcon } from "lucide-react";

const CardDescription = ({
  name,
  title,
  options,
  style,
  createdAt,
  template_name,
  id,
}) => {
  return (
    <div>
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
      <div className="flex justify-between mt-2">
        <p className="text-xs">
          <span className="text-neutral-300">created at: </span>
          <span className="text-white font-semibold">
            {new Date(createdAt).toDateString()}
          </span>
        </p>
        {template_name && (
          <div className="flex justify-between">
            <Link to={`/templates/${id}`}>
              <Badge variant={"secondary"}>
                <LinkIcon className="h-4 w-4 pr-2" />
                {template_name}
              </Badge>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDescription;
