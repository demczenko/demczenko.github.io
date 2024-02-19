import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { useProject } from "@/hooks/projects/useProject";
import HeaderBreadCrumbs from "./HeaderBreadCrumbs";
import NotFound from "@/NotFound";
import HydratedTemplateView from "./HydratedTemplate";

const RenderSlug = () => {
  const navigator = useNavigate();
  const { id, slug } = useParams();
  const [selectedSlug, setSelectedSlug] = useState(slug);
  const { data: project, isError, isLoading } = useProject(id);

  // const availableSlugs = useMemo(() => {
  //   const slugsData = {};
  //   for (const Slug of slugs) {
  //     if (Slug in slugsData) {
  //       slugsData[Slug] += 1;
  //     } else {
  //       slugsData[Slug] = 1;
  //     }
  //   }

  //   const slugsDataArr = [];
  //   for (const key in slugsData) {
  //     const slugCount = slugsData[key];
  //     if (slugCount === tables.length) {
  //       slugsDataArr.push(key);
  //     }
  //   }

  //   return slugsDataArr;
  // }, [slugs, tables]);

  // useEffect(() => {
  //   if (selectedSlug) {
  //     navigator(`/projects/${project?.id}/${selectedSlug}`);
  //   }
  // }, [project, selectedSlug]);

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
      <div className="absolute top-4 left-4 z-10 right-8">
        <HeaderBreadCrumbs
          selectedSlug={selectedSlug}
          setSelectedSlug={setSelectedSlug}
          project={project}
        />
      </div>
      <HydratedTemplateView selectedSlug={selectedSlug} project={project} />
    </div>
  );
};

export default RenderSlug;
