import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ items }) => {
  return (
    <>
      {items.map((item, i) => {
        return (
          <Link key={i} className="text-xl font-normal text-neutral-400" to={item.to}>
            {item.name} {" / "}
          </Link>
        );
      })}
    </>
  );
};

export default BreadCrumbs;
