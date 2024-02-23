import ErrorPage from "@/ErrorPage";
import { SkeletonCard } from "@/components/SkeletonCard";
import { useLayout } from "@/hooks/layouts/useLayout";
import { useEffect } from "react";
import LayoutRenderItemComponent from "./LayoutRenderItemComponent";
import LayoutRenderItemBody from "./LayoutRenderItemBody";
import NotFound from "@/NotFound";

const HydratedTemplateView = ({ layout_id, project, selectedSlug }) => {
  const {
    data: layout,
    isError: isLayoutError,
    isLoading: isLayoutLoading,
  } = useLayout(layout_id);

  useEffect(() => {
    const handleCopy = (e) => {
      console.log(e.ctrlKey);
    };

    document.addEventListener("keypress", handleCopy);

    return document.removeEventListener("keypress", handleCopy);
  }, []);

  if (isLayoutLoading) {
    return <SkeletonCard />;
  }

  if (isLayoutError) {
    return <ErrorPage title={`Something went wrong while layout loading.`} />;
  }

  if (!layout) {
    return (
      <NotFound
        title={"Layout you are trying to access not found."}
        action={{ to: "/layouts", title: "Go to layouts" }}
      />
    );
  }

  return (
    <div className="absolute inset-0 z-100 w-full overflow-y-auto rounded-md block">
      {layout.layout.map((item) => {
        if (item.type === "template") {
          return (
            <LayoutRenderItemBody
              selectedSlug={selectedSlug}
              project_id={project.id}
              key={item.id}
              item={item}
            />
          );
        } else {
          return (
            <LayoutRenderItemComponent
              selectedSlug={selectedSlug}
              project_id={project.id}
              key={item.id}
              item={item}
            />
          );
        }
      })}
    </div>
  );
};

export default HydratedTemplateView;
