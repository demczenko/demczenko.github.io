import React from "react";

const PreviewHeader = ({ template_name }) => {
  return (
    <>
      {template_name ? (
        <h2 className="text-xl font-semibold ">{template_name}</h2>
      ) : (
        <h2 className="text-xl font-semibold text-neutral-400">Name</h2>
      )}
    </>
  );
};

export default PreviewHeader;