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

const Table = () => {
  const { id } = useParams();
  const [table, setTable] = useState({});
  const [columns, setColumns] = useState([]);
  const [tablesData, setTablesData] = useState([]);
  const [project, setProject] = useState(null);

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

  const onDeleteTableData = (table_id) => {
    tablesData
      .filter((table) => table.table_id === table_id)
      .forEach((element) => TabledataService.deleteTabledata(element.id));
  };

  // TODO: add edit column (after column edit need to be done:
  //  change column name for every imported slug
  //  remind user to change variable in template or try to change it by yourself)
  return (
    <PageContainer>
      <Heading title={table?.table_name} />
      <div className="space-y-2 mt-6">
        <ColumnsList columns={columns} />
        <TableDataList
          onDeleteTableData={onDeleteTableData}
          tablesData={tablesData}
        />
      </div>
    </PageContainer>
  );
};

export default Table;
