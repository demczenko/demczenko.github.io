import React from "react";
import { Heading } from "./components";
import { LoaderIcon } from "lucide-react";

const LoadingPage = ({ title }) => {
  return (
    <div className="flex items-center gap-2 text-white">
      <LoaderIcon className="animate-spin" />
      <Heading title={title ?? "Loading"} />
    </div>
  );
};

export default LoadingPage;
