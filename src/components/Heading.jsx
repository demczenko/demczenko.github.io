import React from "react";

const Heading = ({ title, paragraph }) => {
  return (
    <div className="flex col-span-full flex-col">
      <h2 className="text-2xl font-semibold text-white">{title}</h2>
      {paragraph && (
        <h2 className="font-semibold  text-neutral-400 text-sm">{paragraph}</h2>
      )}
    </div>
  );
};

export default Heading;
