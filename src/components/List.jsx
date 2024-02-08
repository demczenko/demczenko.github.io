import React from "react";

const List = ({ children }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-4">{children}</div>
  );
};

export default List;
