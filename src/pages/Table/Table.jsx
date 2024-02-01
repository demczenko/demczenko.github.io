import React, { useEffect, useState } from "react";
import PageContainer from "../PageContainer";
import { Heading } from "@/components";
import { TableService } from "@/api/tables/init";
import { useParams } from "react-router-dom";
import ColumnsList from "./ColumnsList";
import { ColumnService } from "@/api/columns/init";
import TableDataList from "./TableDataList";
import { TabledataService } from "@/api/tables data/init";
import { ProjectService } from "@/api/projects/init";
import { DrawerModal } from "@/components/Drawer";
import RenameTemplate from "../Templates/TemplateModal/RenameTemplate";

const Table = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id } = useParams();
  const [table, setTable] = useState({});
  const [columns, setColumns] = useState([]);
  const [tablesData, setTablesData] = useState([]);
  const [project, setProject] = useState(null);

  const onSubmit = ({ table_name }) => {
    if (table_name.length < 3) return;
    const new_table = {
      ...table,
      table_name: table_name,
    };

    TableService.update(new_table);
    setTable(new_table);
    setIsModalOpen(false);
  };

  // Fetch all projects
  useEffect(() => {
    async function getProject() {
      try {
        const response = await ProjectService.getProjects();
        if (response.ok) {
          const data = await response.json();
          const project = data.find(
            (project) => project.template_id === table.template_id
          );
          setProject(project);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (table) {
      getProject();
    }
  }, [table]);

  // Fetch all tables
  // TODO
  useEffect(() => {
    async function getTableList() {
      try {
        const response = await TableService.getTables();
        if (response.ok) {
          const data = await response.json();
          const filteredTable = data.find((table) => table.id === id);
          setTable(filteredTable);
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
          const filteredColumns = data.filter((col) => col.table_id === id);
          setColumns(filteredColumns);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (table) {
      getColumnList();
    }
  }, [table]);

  // Fetch all tables data
  // TODO
  useEffect(() => {
    async function getTableData() {
      try {
        const response = await TabledataService.getTabledata();
        if (response.ok) {
          const data = await response.json();
          const project_tables = data.filter(
            (table) => table.project_id === project.id
          );
          const filtered = project_tables.filter(
            (table) => table.table_id === id
          );
          setTablesData(filtered);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    if (project) {
      getTableData();
    }
  }, [project]);

  const onDeleteTableData = (id) => {
    tablesData.forEach((table_data) => {
      if (table_data.id === id) {
        TabledataService.deleteTabledata(table_data.id);
      }
    });

    setTablesData(tablesData.filter((table_data) => table_data.id !== id));
  };

  // TODO: add edit column (after column edit need to be done:
  //  change column name for every imported slug
  //  remind user to change variable in template or try to change it by yourself)

  if (!table) {
    return (
      <div className="fixed top-1/2 -translate-y-1/2 w-3/4 text-center z-10">
        <p className="text-6xl text-neutral-100 font-medium tracking-tight">
          Whooops!
        </p>
        <p className="text-sm text-neutral-400 font-medium mt-4">
          Looks like table you are looking for not exists.
        </p>
      </div>
    );
  }

  return (
    <PageContainer>
      <Heading
        title={table?.table_name}
        actions={[
          {
            id: 1,
            name: "Manage column",
            onClick: () => setIsModalOpen(true),
          },
        ]}
      />
      <div className="space-y-2 mt-6">
        <ColumnsList setColumns={setColumns} columns={columns} />
        <TableDataList
          onDeleteTableData={onDeleteTableData}
          tablesData={tablesData}
          setTablesData={setTablesData}
        />
      </div>
      <DrawerModal
        title={"Manage column"}
        description={"Change column name"}
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        content={
          <RenameTemplate
            placeholder={table?.table_name}
            label={"table_name"}
            onSubmit={onSubmit}
          />
        }
      />
    </PageContainer>
  );
};

export default Table;
