import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CardDescription, PreviewTemplate } from "@/components";
import { DrawerModal } from "@/components/Drawer";
import { AddProjectDrawer } from "../Projects/ProjectsModal/AddProjectDrawer";
import ProjectForm from "../Projects/ProjectsModal/ProjectForm";
import RenameTemplate from "./TemplateModal/RenameTemplate";
import { TemplatesService } from "@/api/templates/init";
import { ProjectService } from "@/api/projects/init";
import { TabledataService } from "@/api/tables data/init";
import { TableService } from "@/api/tables/init";
import { ColumnService } from "@/api/columns/init";

const Template = ({ template }) => {
  const navigator = useNavigate();
  const [projects, setProjects] = useState([]);
  const [tableData, setTablesData] = useState(null);
  const [columns, setColumns] = useState(null);
  const [tables, setTables] = useState([]);

  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);
  const [isRenameModalOpen, setRenameModalOpen] = useState(false);

  // Fetch all projects
  // TODO
  useEffect(() => {
    async function getProjectList() {
      try {
        const response = await ProjectService.getProjects();
        if (response.ok) {
          const data = await response.json();
          const filtered = data.filter(
            (project) => project.template_id === template.id
          );
          setProjects(filtered);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getProjectList();
  }, []);

  // Fetch all tables
  // TODO
  useEffect(() => {
    async function getTableList() {
      try {
        const response = await TableService.getTables();
        if (response.ok) {
          const data = await response.json();
          setTables(data);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getTableList();
  }, []);

  // Fetch all columns
  // TODO
  useEffect(() => {
    async function getColumnList() {
      try {
        const response = await ColumnService.getColumns();
        if (response.ok) {
          const data = await response.json();
          setColumns(data);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getColumnList();
  }, []);

  // Fetch all tables data
  // TODO
  useEffect(() => {
    async function getTableDataFiltered() {
      try {
        const response = await TabledataService.getTabledata();
        if (response.ok) {
          const data = await response.json();
          setTablesData(data);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getTableDataFiltered();
  }, []);

  const handleArchived = () => {
    TemplatesService.updateTemplate({
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
      TemplatesService.deleteTemplate(id);

      // Delete tables related to that template
      tables
        .filter((project) => project.template_id === template.id)
        .forEach((table) => {
          TableService.deleteTable(table.id);

          // Delete columns related to that template
          columns
            .filter((column) => column.table_id === table.id)
            .forEach((col) => ColumnService.deleteColumn(col.id));
        });

      // Delete projects related to that template
      projects
        .filter((project) => project.template_id === template.id)
        .forEach((project) => {
          ProjectService.deleteProject(project.id);
          // Delete table data related to that template
          tableData
            .filter((table) => table.project_id === project.id)
            .forEach((table) => TabledataService.deleteTabledata(table.id));
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
    TemplatesService.updateTemplate({ ...template, template_name: name });
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
