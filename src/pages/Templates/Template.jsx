import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardDescription, PreviewTemplate } from "@/components";
import { DrawerModal } from "@/components/Drawer";
import { AddProjectDrawer } from "../Projects/ProjectsModal/AddProjectDrawer";
import ProjectForm from "../Projects/ProjectsModal/ProjectForm";
import RenameTemplate from "./TemplateModal/RenameTemplate";
import { TemplatesService } from "@/api/templates/init";
import { useTemplates } from "@/hooks/useTemplates";
import { useProjects } from "@/hooks/useProjects";
import { useTables } from "@/hooks/useTables";
import { useColumns } from "@/hooks/useColumns";
import { useDataTables } from "@/hooks/useDataTables";

const Template = ({ template }) => {
  const navigator = useNavigate();
  const {
    data,
    isError: IsProjectsError,
    isLoading: IsProjectsLoading,
    update: updateProjects,
    remove: removeProject,
  } = useProjects();
  const { data: templates, isError, isLoading, update } = useTemplates();
  const {
    data: tables,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTable,
    remove: removeTable,
  } = useTables();
  const {
    data: columns,
    isError: IsColumnsError,
    isLoading: isColumnsLoading,
    update: updateColumn,
    remove: removeColumn,
  } = useColumns();

  const {
    data: tableData,
    isError: IsDataTableError,
    isLoading: IsDataTableLoading,
    update: updateDataTable,
    remove: removeDataTable,
  } = useDataTables();

  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

  const projects = data.filter(
    (project) => project.template_id === template.id
  );

  const handleArchived = () => {
    TemplatesService.update({
      ...template,
      isArchived: template.isArchived ? false : true,
    });
    navigator(template.isArchived ? "/templates/" : "/templates/archived");
  };

  const handleDelete = (id) => {
    if (
      confirm(
        "All projects, tables and data related to that template will be deleted."
      )
    ) {
      // Delete template
      TemplatesService.delete(id);

      // Delete tables related to that template
      tables
        .filter((project) => project.template_id === template.id)
        .forEach((table) => {
          removeTable(table.id);

          // Delete columns related to that template
          columns
            .filter((column) => column.table_id === table.id)
            .forEach((col) => removeColumn(col.id));
        });

      // Delete projects related to that template
      projects
        .filter((project) => project.template_id === template.id)
        .forEach((project) => {
          removeProject(project.id);
          // Delete table data related to that template
          tableData
            .filter((table) => table.project_id === project.id)
            .forEach((table) => removeDataTable(table.id));
        });
    }
  };

  const options = useMemo(() => {
    if (template.isArchived) {
      return [
        {
          id: 1,
          name: "Rename",
          onClick: () => setRenameModalOpen(true),
        },
        {
          id: 3,
          name: "Select",
          onClick: () => setIsCreateProjectModalOpen(true),
        },
        {
          id: 2,
          name: template.isArchived ? "Un Archive" : "Archive",
          onClick: () => handleArchived(template.id),
        },
        {
          id: 4,
          name: "Delete",
          onClick: () => handleDelete(template.id),
        },
      ];
    } else {
      return [
        {
          id: 1,
          name: "Rename",
          onClick: () => setRenameModalOpen(true),
        },
        {
          id: 3,
          name: "Select",
          onClick: () => setIsCreateProjectModalOpen(true),
        },
        {
          id: 2,
          name: template.isArchived ? "Un Archive" : "Archive",
          onClick: () => handleArchived(template.id),
        },
      ];
    }
  }, []);

  const onSubmit = (name) => {
    if (name.length < 4) return;
    TemplatesService.update({ ...template, template_name: name });
    navigator("/templates/" + template.id);
  };

  return (
    <div>
      <PreviewTemplate
        href={`/templates/${template.id}`}
        template_html={template.template_html}
      />
      <CardDescription
        name={template.template_name}
        options={options}
        title={"Manage template"}
        createdAt={template.createdAt}
      />
      <DrawerModal
        title={"Create project"}
        description={"Enter project name and fulfill tables."}
        open={isCreateProjectModalOpen}
        onOpenChange={setIsCreateProjectModalOpen}
        content={
          <AddProjectDrawer
            form={
              <ProjectForm
                onSubmitForm={() => setIsCreateProjectModalOpen(false)}
                template_id={template.id}
              />
            }
          />
        }
      />
      <DrawerModal
        title={"Rename template"}
        description={"Enter new template name."}
        open={isRenameModalOpen}
        onOpenChange={setRenameModalOpen}
        content={
          <RenameTemplate placeholder={template?.name} onSubmit={onSubmit} />
        }
      />
    </div>
  );
};

export default Template;
