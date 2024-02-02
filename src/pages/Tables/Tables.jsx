import React, { useEffect, useState } from "react";
import PageContainer from "../PageContainer";
import TablesList from "./TableList";
import { TableService } from "@/api/tables/init";
import { ColumnService } from "@/api/columns/init";

const Tables = () => {
  const [tables, setTables] = useState([]);

  // Fetch all tables
  // TODO
  useEffect(() => {
    async function getTableList() {
      try {
        const response = await TableService.get();
        if (response.ok) {
          const data = await response.json();
          set(data);
        }
      } catch (error) {
        console.warn(error.message);
      }
    }
    getTableList();
  }, []);

  // // Fetch all columns
  // // TODO
  // useEffect(() => {
  //   async function getColumnList() {
  //     try {
  //       const response = await ColumnService.get();
  //       if (response.ok) {
  //         const data = await response.json();
  //         set(data);
  //       }
  //     } catch (error) {
  //       console.warn(error.message);
  //     }
  //   }

  //   getColumnList();
  // }, []);

  return (
    <PageContainer>
      {tables && <TablesList setTables={setTables} isProject={false} tables={tables} />}
    </PageContainer>
  );
};

export default Tables;
