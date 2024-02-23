import { useParams } from "react-router-dom";
import { PageContainer } from "..";
import TemplatePreview from "../../components/TemplatePreview";
import { useToast } from "@/components/ui/use-toast";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { useComponent } from "@/hooks/components/useComponent";
import { useQueryClient } from "react-query";
import { useComponentUpdate } from "@/hooks/components/useComponentUpdate";
import NotFound from "@/NotFound";
import RenderTableList from "@/components/RenderTableList";

const Component = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const client = useQueryClient();

  const { data: component, error, isError, isLoading } = useComponent(id);

  const {
    mutate: updateComponent,
    isLoading: isComponentUpdateLoading,
    isError: isComponentUpdateError,
  } = useComponentUpdate(component?.id);

  const onChangeTemplateSubmit = ({ html }) => {
    updateComponent(
      { component_html: html },
      {
        onError: () => {
          toast({
            variant: "destructive",
            title: "Failed to update component",
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
            description: "Component successfully updated",
          });
        },
      }
    );
  };

  if (isLoading) {
    return <SkeletonCard isContainer={true} />;
  }

  if (isError) {
    return (
      <ErrorPage title={`Something went wrong while component loading...`} />
    );
  }

  if (!component) {
    return (
      <NotFound
        title={"Component you are trying to access not found."}
        action={{ to: "/components", title: "Go to components" }}
      />
    );
  }

  return (
    <PageContainer title={"Component " + component.component_name}>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        <TemplatePreview
          isLoading={isComponentUpdateLoading}
          onUpdate={onChangeTemplateSubmit}
          template_id={component.id}
          html={component?.component_html}
        />
        <div className="flex gap-4 flex-col w-full items-start">
          <RenderTableList
            isCreate={true}
            table_key_id={"component_id"}
            table_id={component.id}
            id={component.id}
            key_id={"component_id"}
            isFulFill={true}
            query={`?component_id=${component.id}`}
          />
        </div>
      </div>
    </PageContainer>
  );
};

export default Component;
