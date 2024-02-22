import React from "react";
import LayoutComponent from "./LayoutComponent";
import LayoutBody from "./LayoutBody";

const PreviewLayout = ({ layout }) => {
  return (
    <div className="w-full mt-6 xl:h-[1000px] md:h-[600px] h-[400px] overflow-y-auto rounded-md block">
      {layout.map((item) => {
        if (item.type === "template") {
          return <LayoutBody item={item} key={item.id} />;
        } else {
          return <LayoutComponent item={item} key={item.id} />;
        }
      })}
    </div>
  );
};

export default PreviewLayout;
