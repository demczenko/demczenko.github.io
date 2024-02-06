import React from "react";
import { Link } from "react-router-dom";

const BreadCrumbs = ({ items }) => {
  return (
    <>
      {items.map((item, i) => {
        return (
          <Link key={i} className="text-sm font-normal text-slate-900" to={item.to}>
            {item.name} {" / "}
          </Link>
        );
      })}
    </>
  );
};

export default BreadCrumbs;
