import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CardDescription } from "@/components";

const TablesToFulFill = ({ columnsData, setColumnsData }) => {
  const [tables, setTables] = useState([
    {
      id: 1,
      table_name: "Translations",
      template_id: "aa2a9bb1-73e7-4478-8302-3c3612ad61ea",
    },
    {
      id: 2,
      table_name: "Images",
      template_id: "aa2a9bb1-73e7-4478-8302-3c3612ad61ea",
    },
  ]);
  const [selectedTab, setTab] = useState();
  const [columns, setColumns] = useState([
    {
      table_id: 1,
      id: "67f3b825-7a4a-461b-aef9-111b807d612c",
      accessorKey: "Slug",
      header: "Slug",
      type: "text",
    },
    {
      table_id: 1,
      id: "a886df7e-16c6-48e2-be6a-bd4171cb915a",
      type: "text",
      header: "Offer part 1",
      accessorKey: "Offer part 1",
    },
    {
      table_id: 1,
      id: "20d087cd-729b-489b-9d7c-8df7804af273",
      type: "text",
      header: "Offer part 2",
      accessorKey: "Offer part 2",
    },
    {
      table_id: 1,
      id: "2489a38d-15e7-461f-b6bb-6de30064dfc1",
      type: "text",
      header: "Offer part 3",
      accessorKey: "Offer part 3",
    },
    {
      table_id: 1,
      id: "2489a38d-15e7-461f-b6bb-6de30064dfc2",
      type: "text",
      header: "Get code",
      accessorKey: "Get code",
    },
    {
      table_id: 1,
      id: "2489a38d-15e7-461f-b6bb-6de30064dfc3",
      type: "text",
      header: "Choose from",
      accessorKey: "Choose from",
    },
    {
      table_id: 1,
      id: "2489a38d-15e7-461f-b6bb-6de30064dfc4",
      type: "text",
      header: "Intro title",
      accessorKey: "Intro title",
    },
    {
      table_id: 1,
      id: "2489a38d-15e7-461f-b6bb-6de30064dfc5",
      type: "text",
      header: "Intro",
      accessorKey: "Intro",
    },
    {
      table_id: 1,
      id: "2489a38d-15e7-461f-b6bb-6de30064dfc6",
      type: "text",
      header: "Title 1",
      accessorKey: "Title 1",
    },
    {
      table_id: 1,
      id: "2489a38d-15e7-461f-b6bb-6de30064dfc7",
      type: "text",
      header: "Title 2",
      accessorKey: "Title 2",
    },
    {
      table_id: 1,
      id: "2489a38d-15e7-461f-b6bb-6de30064dfc8",
      type: "text",
      header: "Title 3",
      accessorKey: "Title 3",
    },
    {
      table_id: 1,
      id: "2489a38d-15e7-461f-b6bb-6de30064dfc9",
      type: "text",
      header: "Title 4",
      accessorKey: "Title 4",
    },
    {
      table_id: 1,
      id: "2489a38d-15e7-461f-b6bb-6de30064dfc10",
      type: "text",
      header: "CTA",
      accessorKey: "CTA",
    },
    {
      table_id: 1,
      id: "2489a38d-15e7-461f-b6bb-6de30064dfc11",
      type: "text",
      header: "Soon ending",
      accessorKey: "Soon ending",
    },
    {
      table_id: 2,
      id: "67f3b825-7a4a-461b-aef9-111b807d612c",
      accessorKey: "Slug",
      header: "Slug",
      type: "src",
    },
    {
      table_id: 2,
      id: "a886df7e-16c6-48e2-be6a-bd4171cb915a",
      type: "src",
      header: "Top image title",
      accessorKey: "Top image title",
    },
    {
      table_id: 2,
      id: "20d087cd-729b-489b-9d7c-8df7804af273",
      type: "src",
      header: "Top image",
      accessorKey: "Top image",
    },
  ]);

  if (tables.length > 0 && !selectedTab) {
    setTab(tables[0].id)
  }

  const selectedColumns = columns.filter(
    (column) => column.table_id === selectedTab
  );
  const selectedColumnsData = columnsData.find(
    (col) => col.table_id === selectedTab
  );

  const handleNewItem = () => {
    alert("New item selected");
  };

  const createRows = () => {
    return selectedColumnsData?.columns_data?.map((colData, i) => {
      return <TableRow key={i}>{...createColumns(colData, i)}</TableRow>;
    });
  };

  const createColumns = (colData, i) => {
    const columns = [];
    for (const objKey in colData) {
      const value = colData[objKey];
      columns.push(
        <TableCell
          key={value + i}
          className={"h-10 text-nowrap"}>
          {value}
        </TableCell>
      );
    }
    return columns;
  };

  return (
    <Tabs
      value={selectedTab}
      defaultValue={tables[0].id}>
      <TabsList className="grid w-full grid-cols-2">
        {tables?.map((table) => (
          <TabsTrigger
            onClick={() => setTab(table.id)}
            key={table.id}
            value={table.id}>
            {table.table_name}
          </TabsTrigger>
        ))}
      </TabsList>
      {tables.map((table) => (
        <TabsContent key={table.id} value={table.id}>
          <CardDescription
            style="text-black"
            options={[
              {
                id: 1,
                name: "New Item",
                onClick: () => handleNewItem(),
              },
            ]}
            name={table.table_name}
            title={"Manage table data"}
          />
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                {selectedColumns?.map((column) => (
                  <TableHead key={column.id}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>{createRows()}</TableBody>
          </Table>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TablesToFulFill;
