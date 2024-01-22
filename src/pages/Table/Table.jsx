import React, { useEffect, useState } from "react";
import PageContainer from "../PageContainer";
import { Heading } from "@/components";
import { TableService } from "@/api/tables/init";
import { useParams } from "react-router-dom";
import ColumnsList from "./ColumnsList";
import { ColumnService } from "@/api/columns/init";

const Table = () => {
  const { id } = useParams();
  const [table, setTable] = useState({});
  const [columns, setColumns] = useState([]);

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

  return (
    <PageContainer>
      <Heading title={table?.table_name} />
      <ColumnsList columns={columns} />
    </PageContainer>
  );
};

export default Table;
