import React, { useMemo, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heading } from "@/components";
import { PageContainer } from "..";
import { useTemplates } from "@/hooks/templates/useTemplates";
import { useProjects } from "@/hooks/projects/useProjects";
import { useTables } from "@/hooks/tables/useTables";
import { useDataTables } from "@/hooks/dataTables/useDataTables";
import { useProjectsStyles } from "@/hooks/projectStyle/useProjectsStyles";
import { useToast } from "@/components/ui/use-toast";
import { DrawerModal } from "@/components/Drawer";
import { useColumns } from "@/hooks/columns/useColumns";
import { TableCartProject } from "../Tables/TableCartProject";
import ProjectTemplatePreview from "./ProjectTemplatePreview";
import RenderList from "@/components/RenderList";
import TableFulfill from "../Projects/ProjectsModal/TableFulfill";
import ProjectStyleCart from "./ProjectStyleCart";
import { useComponents } from "@/hooks/components/useComponents";
import ComponentCart from "../Components/ComponentCart";
import { SkeletonCard } from "@/components/SkeletonCard";
import ErrorPage from "@/ErrorPage";
import { useProject } from "@/hooks/projects/useProject";
import { useTableUpdate } from "@/hooks/tables/useTableUpdate";
import { useQueryClient } from "react-query";
import { useTemplate } from "@/hooks/templates/useTemplate";
import SlugList from "./SlugList";

const Project = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const client = useQueryClient();
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState("");
  const ref = useRef();

  const {
    data: project,
    isError: IsProjectError,
    isLoading: IsProjectLoading,
  } = useProject(id);

  const {
    mutate,
    isLoading: tableUpdateLoading,
    isError: tableUpdateError,
  } = useTableUpdate();

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

  if (IsProjectLoading) {
    return <SkeletonCard />;
  }

  if (IsProjectError) {
    return (
      <ErrorPage title={`Something went wrong while projects loading...`} />
    );
  }

  const handleImport = async (data) => {
    const candidate = await setDataTable({ ...data, project_id: project.id });
    if (candidate) {
      toast({
        variant: "success",
        title: "Created",
        description: "Table data has been successfully created",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to create data table",
        description: "Something went wrong",
      });
    }
  };

  const handleProjectStyle = async (new_node) => {
    let isExist = false;
    let itemId;

    for (const item of projectStyle) {
      if (item.id === new_node.id) {
        isExist = true;
        itemId = item.id;
      }
    }

    if (isExist) {
      const candidate = await updateProjectsStyles({ ...new_node, id: itemId });
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Project style successfully updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to update project style",
          description: "Something went wrong",
        });
      }
    } else {
      const candidate = await setProjectsStyles(new_node);
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Project style successfully created",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to create project style",
          description: "Something went wrong",
        });
      }
    }
  };

  const handleUpdateTemplate = async (body_with_data_attribute) => {
    const old_document = new DOMParser().parseFromString(
      template.template_html,
      "text/html"
    );
    old_document.body.innerHTML = body_with_data_attribute;
    const updated_template = {
      id: template.id,
      template_html: old_document.documentElement.outerHTML,
    };
    // TODO: Why i need to clear template from style.
    const candidate = await update(updated_template);
    if (candidate) {
      toast({
        variant: "success",
        title: "Success",
        description: "Template style successfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to update project style",
        description: "Something went wrong",
      });
    }
  };

  const handleChangeProjectName = async (project) => {
    if (name.trim().length > 0) {
      const candidate = await updateProject({
        id: project.id,
        project_name: name,
      });
      if (candidate) {
        toast({
          variant: "success",
          title: "Success",
          description: "Project name successfully updated",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Failed to update project",
          description: "Something went wrong",
        });
      }
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };
  const handleTableUpdate = (data) => {
    mutate(data, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed",
          description: "Failed to update table",
        });
      },
      onSettled: () => {
        setIsModalOpen(false);
        client.invalidateQueries("components");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Table successfully update",
        });
      },
    });
  };

  return (
    <PageContainer>
      <div className="flex lg:gap-12 gap-4 xl:flex-row flex-col">
        <ProjectTemplatePreview
          handleUpdateTemplate={handleUpdateTemplate}
          setStyle={handleProjectStyle}
          project_id={project.id}
          template_id={project.template_id}
        />
        <div className="flex gap-4 flex-col w-full items-start">
          <Heading
            title={
              isOpen ? (
                <input
                  ref={ref}
                  onBlur={() => handleChangeProjectName(project)}
                  onChange={(ev) => setName(ev.target.value)}
                  value={name}
                  className="text-4xl border-none w-full bg-transparent outline-none focus:border-none p-0"
                />
              ) : (
                <p
                  onClick={() => {
                    setIsOpen(true);
                    setName(project.project_name);
                  }}
                  className="font-semibold">
                  {project?.project_name}
                </p>
              )
            }
          />
          <SlugList project_id={project.id} />
          <RenderList
            query={`?template_id=${project.template_id}`}
            service={"components"}
            component={ComponentCart}
            title={"Components"}
          />

          <RenderList
            query={`?project_id=${project.id}`}
            service={"project_styles"}
            title={"Project style"}
            component={ProjectStyleCart}
          />

          <RenderList
            service={"tables"}
            query={`?template_id=${project.template_id}`}
            component={TableCartProject}
            title={"Tables"}
          />
        </div>
      </div>
      <DrawerModal
        title={`Populate ${selectedTable.table_name} table`}
        description={"Import CSV file or fulfill data manually"}
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(false);
        }}
        content={
          <TableFulfill
            isLoading={tableUpdateLoading}
            onUpdate={handleTableUpdate}
            onSubmit={handleImport}
            setIsModalOpen={setIsModalOpen}
            table_id={selectedTable.id}
          />
        }
      />
    </PageContainer>
  );
};

export default Project;
