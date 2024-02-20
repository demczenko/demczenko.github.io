import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "..";
import TemplatePreview from "../../components/TemplatePreview";
import { useToast } from "@/components/ui/use-toast";
import RenderList from "@/components/RenderList";
import { PlusCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { useComponent } from "@/hooks/components/useComponent";
import { useQueryClient } from "react-query";
import { useComponentUpdate } from "@/hooks/components/useComponentUpdate";
import { useTableCreate } from "@/hooks/tables/useTableCreate";
import { CreateForm } from "@/components/CreateForm";
import NotFound from "@/NotFound";
import { TableCartFulFill } from "../Tables/TableCartFulFill";

const Component = () => {
  const { toast } = useToast();
  const { id } = useParams();
  const client = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: component, error, isError, isLoading } = useComponent(id);

  const {
    mutate: createTable,
    isLoading: isTableCreateLoading,
    isError: isTableCreateError,
  } = useTableCreate();

  const {
    mutate: updateComponent,
    isLoading: isComponentUpdateLoading,
    isError: isComponentUpdateError,
  } = useComponentUpdate();

  const onChangeTemplateSubmit = ({ html }) => {
    if (html.length < 10) return;
    const new_component = {
      id: component.id,
      component_html: html,
    };

    updateComponent(new_component, {
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
    });
  };

  const handleCreateTable = (data) => {
    const new_table = {
      id: uuidv4(),
      table_name: data.table_name,
      component_id: component.id,
      createdat: Date.now(),
    };

    createTable(new_table, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create table",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        setIsModalOpen(false);
        client.invalidateQueries("tables");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Table created successfully",
        });
      },
    });
  };

  if (isLoading) {
    return <SkeletonCard />;
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
          isLoading={isLoading}
          html={component?.component_html}
          onChangeTemplateSubmit={onChangeTemplateSubmit}
        />
        <div className="flex gap-4 flex-col w-full items-start">
          <RenderList
            service={"tables"}
            query={`?component_id=${component.id}`}
            title={"Tables"}
            id={component.id}
            key_id={"component_id"}
            component={TableCartFulFill}
            action={{
              id: 1,
              name: "Create table",
              icon: <PlusCircle className="h-4 w-4 mr-2" />,
              onClick: () => setIsModalOpen(true),
            }}
          />
        </div>
      </div>
      <CreateForm
        isLoading={isTableCreateLoading}
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onSubmit={handleCreateTable}
        fields={[
          {
            id: 1,
            name: "table_name",
            label: "Table name",
            placeholder: "name",
          },
        ]}
        title={"Create table"}
        description={"Enter table name. Click save when you're done."}
      />
    </PageContainer>
  );
};

export default Component;
