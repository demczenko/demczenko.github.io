import { useParams } from "react-router-dom";
import { PageContainer } from "..";
import TemplatePreview from "../../components/TemplatePreview";
import { useToast } from "@/components/ui/use-toast";
import ErrorPage from "@/ErrorPage";
import { useComponent } from "@/hooks/components/useComponent";
import { useQueryClient } from "react-query";
import { useComponentUpdate } from "@/hooks/components/useComponentUpdate";
import NotFound from "@/NotFound";
import RenderTableList from "@/components/RenderTableList";
import { useRef, useState } from "react";
import ComponentCardLoading from "./ComponentCardLoading";

const Component = () => {
  const ref = useRef();
  const { toast } = useToast();
  const { id } = useParams();
  const client = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNode, setSelectedNode] = useState("");
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
    return <ComponentCardLoading />;
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
          refHTML={ref}
          setIsModalOpen={setIsModalOpen}
          setSelectedNode={setSelectedNode}
          isLoading={isLoading || isComponentUpdateLoading}
          onUpdate={onChangeTemplateSubmit}
          template_id={component.id}
          html={component?.component_html ?? ""}
        />
        <div className="flex gap-4 flex-col w-full items-start">
          <RenderTableList
            onUpdate={({ column_id }) => {
              selectedNode.setAttribute("data-column-id", column_id);
              onChangeTemplateSubmit({ html: ref.current.innerHTML });
              setIsModalOpen(false);
            }}
            setIsAttachModalOpen={setIsModalOpen}
            isAttachModalOpen={isModalOpen}
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
