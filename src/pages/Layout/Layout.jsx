import { useParams } from "react-router-dom";
import { PageContainer } from "..";
import { useToast } from "@/components/ui/use-toast";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { useQueryClient } from "react-query";
import NotFound from "@/NotFound";
import { useLayout } from "@/hooks/layouts/useLayout";
import { useLayoutUpdate } from "@/hooks/layouts/useLayoutUpdate";

const Layout = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const client = useQueryClient();

  const { data: layout, error, isError, isLoading } = useLayout(id);

  const {
    mutate: updateLayout,
    isLoading: isComponentUpdateLoading,
    isError: isComponentUpdateError,
  } = useLayoutUpdate(layout?.id);

  const onChangeTemplateSubmit = ({ html }) => {
    if (html.length < 10) return;
    const new_component = {
      component_html: html,
    };

    updateLayout(new_component, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to update layout",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        client.invalidateQueries("columns");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Layout successfully updated",
        });
      },
    });
  };

  if (isLoading) {
    return <SkeletonCard isContainer={true} />;
  }

  if (isError) {
    return <ErrorPage title={`Something went wrong while layout loading...`} />;
  }

  if (!layout) {
    return (
      <NotFound
        title={"Component you are trying to access not found."}
        action={{ to: "/layouts", title: "Go to layouts" }}
      />
    );
  }

  return (
    <PageContainer title={"Layout " + layout.layout_name}>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        template
        <div className="flex gap-4 flex-col w-full items-start">tables</div>
      </div>
    </PageContainer>
  );
};

export default Layout;
