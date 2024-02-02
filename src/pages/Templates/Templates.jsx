import React, { useMemo, useState } from "react";
import { PageLayout } from "..";
import { TemplateList } from "./TemplateList";
import { DrawerModal } from "@/components/Drawer";
import { AddTemplateDrawer } from "./TemplateModal/AddTemplateDrawer";
import TemplateFilter from "./TemplateFilter";
import { useTemplates } from "@/hooks/useTemplates";
import LoadingPage from "@/LoadingPage";
import ErrorPage from "@/ErrorPage";

const Templates = () => {
  const {
    data: templates,
    isError,
    isLoading,
    update,
    remove,
  } = useTemplates();
  // const {
  //   data,
  //   isError: IsProjectsError,
  //   isLoading: IsProjectsLoading,
  //   update: updateProjects,
  //   remove: removeProject,
  // } = useProjects();
  // const { data: templates, isError, isLoading, update } = useTemplates();
  // const {
  //   data: tables,
  //   isError: IsTablesError,
  //   isLoading: isTablesLoading,
  //   update: updateTable,
  //   remove: removeTable,
  // } = useTables();
  // const {
  //   data: columns,
  //   isError: IsColumnsError,
  //   isLoading: isColumnsLoading,
  //   update: updateColumn,
  //   remove: removeColumn,
  // } = useColumns();

  // const {
  //   data: tableData,
  //   isError: IsDataTableError,
  //   isLoading: IsDataTableLoading,
  //   update: updateDataTable,
  //   remove: removeDataTable,
  // } = useDataTables();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState("isNotArchived");

  const filteredTemplate = useMemo(() => {
    if (filter === "isArchived") {
      return templates.filter((table) => table.isArchived === true);
    }

    if (filter === "isNotArchived") {
      return templates.filter((table) => table.isArchived !== true);
    }

    if (filter === "all") {
      return templates;
    }
  }, [filter, templates]);

  if (isError) {
    return <ErrorPage title="Something went wrong while templates loading..."/>;
  }

  const handleDelete = (id) => {
    if (
      confirm(
        "All projects, tables and data related to that template will be deleted."
      )
    ) {
      alert("Under development");
      // // Delete template
      // remove(id);

      // // Delete tables related to that template
      // tables
      //   .filter((project) => project.template_id === id)
      //   .forEach((table) => {
      //     removeTable(table.id);

      //     // Delete columns related to that template
      //     columns
      //       .filter((column) => column.table_id === table.id)
      //       .forEach((col) => removeColumn(col.id));
      //   });

      // // Delete projects related to that template
      // projects
      //   .filter((project) => project.template_id === id)
      //   .forEach((project) => {
      //     removeProject(project.id);
      //     // Delete table data related to that template
      //     tableData
      //       .filter((table) => table.project_id === project.id)
      //       .forEach((table) => removeDataTable(table.id));
      //   });
    }
  };

  const handleArchived = (template) => {
    update({
      ...template,
      isArchived: template.isArchived ? false : true,
    });
  };

  const handleRename = (template, name) => {
    if (name.length < 4) return;
    update({ ...template, template_name: name });
  };

  return (
    <div className="w-full">
      <PageLayout
        title="Templates"
        filters={
          <>
            {templates.length > 0 && (
              <TemplateFilter
                filter={filter}
                onSelect={(filter) => setFilter(filter)}
              />
            )}
          </>
        }
        actions={[
          {
            id: 1,
            name: "Create Template",
            onClick: () => setIsModalOpen(true),
          },
        ]}
        content={
          <>
            {isLoading ? (
              <LoadingPage title="Loading your templates..." />
            ) : (
              <TemplateList
                onRename={handleRename}
                onArchive={handleArchived}
                onDelete={handleDelete}
                onCreate={() => setIsModalOpen(true)}
                templates={filteredTemplate}
              />
            )}
          </>
        }
      />
      <DrawerModal
        title={"Create template"}
        description={"Enter template name, html template and create tables."}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <AddTemplateDrawer onSubmitForm={() => setIsModalOpen(false)} />
        }
      />
    </div>
  );
};

export default Templates;
