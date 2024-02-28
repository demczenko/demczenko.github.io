import { useState } from "react";
import { useParams } from "react-router-dom";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { useProject } from "@/hooks/projects/useProject";
import HeaderBreadCrumbs from "./HeaderBreadCrumbs";
import NotFound from "@/NotFound";
import HydratedTemplateView from "./HydratedTemplateView";

const RenderSlug = () => {
  const { project_id, layout_id, slug } = useParams();
  const [selectedSlug, setSelectedSlug] = useState(slug);
  const { data: project, isError, isLoading } = useProject(project_id);

  if (isLoading) {
    return <SkeletonCard style="w-full xl:h-[1000px] md:h-[600px] h-[400px]" />;
  }

  if (isError) {
    return (
      <ErrorPage
        title={`Something went wrong while fetching data. Try reload page.`}
      />
    );
  }

  if (!project) {
    return (
      <NotFound
        title={"Project you are trying to access not found."}
        action={{ to: "/projects", title: "Go to projects" }}
      />
    );
  }

  return (
    <div style={{ backgroundColor: "#ececec" }} className="relative h-full">
      <div className="absolute top-4 left-4 z-10 md:opacity-100 hover:opacity-100 opacity-30">
        <HeaderBreadCrumbs
          selectedSlug={selectedSlug}
          setSelectedSlug={setSelectedSlug}
          project={project}
        />
      </div>
      <HydratedTemplateView
        selectedSlug={selectedSlug}
        layout_id={layout_id}
        project={project}
      />
    </div>
  );
};

export default RenderSlug;
