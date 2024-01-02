import React from "react";

const PageLayout = ({ title, content }) => {
  return (
    <div className="grid lg:grid-cols-[repeat(auto-fill,300px);] justify-center gap-6 mt-10">
      <div className="flex col-span-full flex-col">
        <h2 className="text-2xl font-semibold text-white">
          {title}
        </h2>
      </div>
      {content}
    </div>
  );
};

export default PageLayout;
