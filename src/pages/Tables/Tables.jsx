import React, { useEffect, useState } from "react";
import PageContainer from "../PageContainer";
import TablesList from "./TablesList";
import { TableService } from "@/api/tables/init";

const Tables = () => {
  const [tables, setTables] = useState([]);

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

  return (
    <PageContainer>
      <TablesList tables={tables} />
    </PageContainer>
  );
};

export default Tables;
