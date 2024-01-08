import React, { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";
import { Input } from "@/components/ui/input";
import { CardDescription } from "@/components";

const HandleEmptyTables = () => {
  return (
    <p className="text-neutral-400 font-semibold text-sm">
      Looks like there is no table
    </p>
  );
};

const HandleInputError = () => {
  return alert("Table name must be at least 4 characters");
  // return (
  //   <p className="text-red-400 font-semibold text-sm absolute top-8 left-0">
  //     Min 4 characters
  //   </p>
  // );
};

const HandleTableInput = ({ isOpenNewTable, setIsOpenNewTable }) => {
  return (
    <>
      {isOpenNewTable ? (
        <Button onClick={() => setIsOpenNewTable(false)} variant="ghost">
          <MinusCircle className="w-4 h-4" />
        </Button>
      ) : (
        <Button onClick={() => setIsOpenNewTable(true)} variant="ghost">
          <PlusCircle className="w-4 h-4" />
        </Button>
      )}
    </>
  );
};

const TemplateTables = ({ templateId }) => {
  const [renamedTableId, setRenamedTableId] = useState();
  const [error, setError] = useState(false);
  const [isOpenNewTable, setIsOpenNewTable] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tables, setTables] = useState([
    {
      id: 1,
      table_name: "Translations",
      template_id: "aa2a9bb1-73e7-4478-8302-3c3612ad61ea",
      columns: [
        {
          id: "67f3b825-7a4a-461b-aef9-111b807d612c",
          accessorKey: "Slug",
          header: "Slug",
          type: "text",
        },
        {
          id: "a886df7e-16c6-48e2-be6a-bd4171cb915a",
          type: "text",
          header: "Offer part 1",
          accessorKey: "Offer part 1",
        },
        {
          id: "20d087cd-729b-489b-9d7c-8df7804af273",
          type: "text",
          header: "Offer part 2",
          accessorKey: "Offer part 2",
        },
        {
          id: "2489a38d-15e7-461f-b6bb-6de30064dfc1",
          type: "text",
          header: "Offer part 3",
          accessorKey: "Offer part 3",
        },
        {
          id: "2489a38d-15e7-461f-b6bb-6de30064dfc2",
          type: "text",
          header: "Get code",
          accessorKey: "Get code",
        },
        {
          id: "2489a38d-15e7-461f-b6bb-6de30064dfc3",
          type: "text",
          header: "Choose from",
          accessorKey: "Choose from",
        },
        {
          id: "2489a38d-15e7-461f-b6bb-6de30064dfc4",
          type: "text",
          header: "Intro title",
          accessorKey: "Intro title",
        },
        {
          id: "2489a38d-15e7-461f-b6bb-6de30064dfc5",
          type: "text",
          header: "Intro",
          accessorKey: "Intro",
        },
        {
          id: "2489a38d-15e7-461f-b6bb-6de30064dfc6",
          type: "text",
          header: "Title 1",
          accessorKey: "Title 1",
        },
        {
          id: "2489a38d-15e7-461f-b6bb-6de30064dfc7",
          type: "text",
          header: "Title 2",
          accessorKey: "Title 2",
        },
        {
          id: "2489a38d-15e7-461f-b6bb-6de30064dfc8",
          type: "text",
          header: "Title 3",
          accessorKey: "Title 3",
        },
        {
          id: "2489a38d-15e7-461f-b6bb-6de30064dfc9",
          type: "text",
          header: "Title 4",
          accessorKey: "Title 4",
        },
        {
          id: "2489a38d-15e7-461f-b6bb-6de30064dfc10",
          type: "text",
          header: "CTA",
          accessorKey: "CTA",
        },
        {
          id: "2489a38d-15e7-461f-b6bb-6de30064dfc11",
          type: "text",
          header: "Soon ending",
          accessorKey: "Soon ending",
        },
      ],
    },
  ]);

  const createTable = () => {
    const new_table = {
      id: uuid(),
      table_name: tableName,
      template_id: templateId,
      columns: [],
    };
    setTables((prev) => [...prev, new_table]);
  };

  const renameTable = () => {
    setTables((prev) => {
      return prev.map((table) => {
        if (table.id == renamedTableId) {
          return {
            ...table,
            table_name: tableName,
          };
        }
        return prev;
      });
    });
    setRenamedTableId();
  };

  const duplicate = () => {}

  const handleCreateTable = () => {
    if (tableName.length < 4) {
      setError(true);
      return;
    }
    if (renamedTableId) {
      renameTable();
    } else {
      createTable();
    }
    setTableName("");
    setIsOpenNewTable(false);
  };

  const onTablesSave = () => {
    console.log(tables);
  };

  const handleDelete = (id) => {
    setTables((prev) => prev.filter((table) => table.id !== id));
  };

  const handleRename = (table) => {
    setIsOpenNewTable(true);
    setTableName(table.table_name);
    setRenamedTableId(table.id);
  };

  if (!tables) {
    return <HandleEmptyTables />;
  }

  return (
    <div className="mt-4 space-y-4">
      <Tabs defaultValue={tables[0]?.id}>
        <div className="flex justify-between gap-2">
          <TabsList className="gap-1 max-w-[500px] h-fit overflow-hidden overflow-x-auto justify-start">
            {tables.map((table) => (
              <TabsTrigger key={table.id} value={table.id}>
                {table.table_name}
              </TabsTrigger>
            ))}
            {isOpenNewTable && (
              <>
                <Input
                  onBlur={handleCreateTable}
                  onKeyDown={(ev) => ev.keyCode === 13 && handleCreateTable()}
                  className="h-8 w-[120px] rounded-sm"
                  value={tableName}
                  onChange={(e) => {
                    setError(false);
                    setTableName(e.target.value);
                  }}
                />
                {error && <HandleInputError />}
              </>
            )}
          </TabsList>
          <HandleTableInput
            isOpenNewTable={isOpenNewTable}
            setIsOpenNewTable={setIsOpenNewTable}
          />
        </div>
        {tables.map((table) => (
          <TabsContent key={table.id} value={table.id}>
            <CardDescription
              style="text-black"
              name={table.table_name}
              title={"Manage table"}
              options={[
                {
                  id: 3,
                  name: "Rename",
                  onClick: () => handleRename(table),
                },
                {
                  id: 1,
                  name: "Delete",
                  onClick: () => handleDelete(table.id),
                },
                {
                  id: 2,
                  name: "Duplicate",
                  onClick: () => alert("Under development"),
                },
              ]}
            />
          </TabsContent>
        ))}
      </Tabs>
      <Button onClick={onTablesSave}>Save</Button>
    </div>
  );
};

export default TemplateTables;
