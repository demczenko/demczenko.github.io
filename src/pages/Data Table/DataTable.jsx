import React, { useState } from "react";
import { PageContainer } from "..";
import { useParams } from "react-router-dom";
import { useDataTables } from "@/hooks/useDataTables";
import RenderList from "@/components/RenderList";
import { useProjects } from "@/hooks/useProjects";
import { useToast } from "@/components/ui/use-toast";
import DataTableContentCart from "./DataTableContentCart";
import { CreateForm } from "@/components/CreateForm";

const DataTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectgedSlug, setSelectedSlug] = useState();
  const { toast } = useToast();
  const { id } = useParams();
  const {
    data: dataTable,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
    update: updateDataTable,
  } = useDataTables();
  const {
    data: projects,
    isError: IsProjectsError,
    isLoading: IsProjectsLoading,
    update: updateProject,
  } = useProjects();

  const project = projects.find((p) => p.id === id);
  const dataTables = dataTable.filter((table) => table.project_id === id);

  const handleUpdate = async (data) => {
    const updated_slug = {
      ...selectgedSlug,
      data: data,
    };
    const candidate = await updateDataTable(updated_slug);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Data item successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update data item",
        description: "Something went wrong",
      });
    }
  };

  return (
    <PageContainer
      title={`Data table for ${project?.project_name} project`}
      isError={IsDataTableError}
      isLoading={IsDataTableLoading}>
      <RenderList
        handleUpdate={(item) => {
          setSelectedSlug(item);
          setIsModalOpen(true);
        }}
        list={dataTables}
        component={DataTableContentCart}
      />
      {selectgedSlug && (
        <CreateForm
          isOpen={isModalOpen}
          setIsOpen={() => {
            setIsModalOpen(false);
            setSelectedSlug();
          }}
          fields={Object.entries(selectgedSlug?.data).map(([key, value], i) => {
            return {
              id: i,
              name: key,
              label: key,
              value: value,
              placeholder: "enter " + key,
            };
          })}
          onSubmit={(data) => handleUpdate(data)}
          description={"Enter values, click done when you are ready."}
          title={selectgedSlug.data.slug + " content"}
        />
      )}
    </PageContainer>
  );
};

export default DataTable;
