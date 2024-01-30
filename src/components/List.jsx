import React from "react";

const List = ({ children }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-4">{children}</div>
  );
};

export default List;
