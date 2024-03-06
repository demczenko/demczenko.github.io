import LayoutRenderItemComponent from "./LayoutRenderItemComponent";
import LayoutRenderItemBody from "./LayoutRenderItemBody";
import { useRef } from "react";

const HydratedTemplateView = ({ layout, project_id, selectedSlug }) => {
  const ref = useRef();

  return (
    <div className="relative w-full h-full">
      <div
        className="absolute inset-0 z-40 w-full overflow-y-auto rounded-md block"
        ref={ref}>
        {layout.layout.map((item) => {
          if (item.type === "template") {
            return (
              <LayoutRenderItemBody
                selectedSlug={selectedSlug}
                project_id={project_id}
                key={item.id}
                item={item}
              />
            );
          } else {
            return (
              <LayoutRenderItemComponent
                selectedSlug={selectedSlug}
                project_id={project_id}
                key={item.id}
                item={item}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default HydratedTemplateView;
