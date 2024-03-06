import { useState } from "react";
import { useParams } from "react-router-dom";
import HydratedTemplateView from "./HydratedTemplateView";
import Toolbar from "./Toolbar";
import { useLayout } from "@/hooks/layouts/useLayout";
import ErrorPage from "@/ErrorPage";
import NotFound from "@/NotFound";
import LayoutLoading from "./LayoutLoading";

const RenderSlug = () => {
  const { project_id, layout_id, slug } = useParams();
  const [selectedSlug, setSelectedSlug] = useState(slug);
  const {
    data: layout,
    isError: isLayoutError,
    isLoading: isLayoutLoading,
  } = useLayout(layout_id);

  if (isLayoutLoading) {
    return (
      <div style={{ backgroundColor: "#ececec" }} className="relative h-full">
        <LayoutLoading />
      </div>
    );
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
    <div style={{ backgroundColor: "#ececec" }} className="relative h-full">
      <Toolbar
        layout={layout}
        isLoading={isLayoutLoading}
        project_id={project_id}
        selectedSlug={selectedSlug}
        setSelectedSlug={setSelectedSlug}
      />
      <HydratedTemplateView
        layout={layout}
        selectedSlug={selectedSlug}
        layout_id={layout_id}
        project_id={project_id}
      />
    </div>
  );
};

export default RenderSlug;
