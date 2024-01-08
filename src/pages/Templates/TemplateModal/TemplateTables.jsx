import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { v4 as uuid } from "uuid";
import { Input } from "@/components/ui/input";
import { CardDescription } from "@/components";
import TableColumns from "./Table";

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
  const [tabValue, setTabValue] = useState();
  const [renamedTableId, setRenamedTableId] = useState();
  const [error, setError] = useState(false);
  const [isOpenNewTable, setIsOpenNewTable] = useState(false);
  const [tableName, setTableName] = useState("");
  const [tables, setTables] = useState([
    {
      id: 1,
      table_name: "Translations",
      template_id: "aa2a9bb1-73e7-4478-8302-3c3612ad61ea",
      columns: [],
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
        if (table.id === renamedTableId) {
          return {
            ...table,
            table_name: tableName,
          };
        }
        return table;
      });
    });
    setRenamedTableId();
  };

  const duplicate = (id) => {
    const duplicateTable = tables.find((table) => table.id == id);
    const new_table = {
      ...duplicateTable,
      id: uuid(),
      table_name: duplicateTable.table_name + " Copy",
    };
    setTables((prev) => [...prev, new_table]);
  };

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
    setTables((prev) => {
      const filteredTables = prev.filter((table) => table.id !== id);
      setTabValue(filteredTables[filteredTables.length - 1].id);
      return filteredTables;
    });
  };

  const handleRename = (table) => {
    setIsOpenNewTable(true);
    setTableName(table.table_name);
    setRenamedTableId(table.id);
  };

  const handleClick = (e, table) => {
    switch (e.detail) {
      case 1:
        setTabValue(table.id);
        break;
      case 2:
        handleRename(table);
        break;
    }
  };

  if (!tables) {
    return <HandleEmptyTables />;
  }

  return (
    <div className="mt-4 space-y-4">
      <Tabs value={tabValue} defaultValue={tables[0]?.id}>
        <div className="flex justify-between gap-2">
          <TabsList className="gap-1 max-w-[500px] h-fit overflow-hidden overflow-x-auto justify-start">
            {tables.map((table) => (
              <TabsTrigger
                onClick={(ev) => handleClick(ev, table)}
                key={table.id}
                value={table.id}>
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
                  onClick: () => duplicate(table.id),
                },
              ]}
            />
            <TableColumns />
          </TabsContent>
        ))}
      </Tabs>
      <Button onClick={onTablesSave}>Save table</Button>
    </div>
  );
};

export default TemplateTables;
