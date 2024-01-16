import { CardDescription } from "@/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const HandleEmptyColumns = () => {
  return (
    <p className="text-neutral-400 font-semibold text-sm">
      Looks like there is no columns
    </p>
  );
};

const HandleInputError = () => {
  return alert("Column name must be at least 4 characters");
  // return (
  //   <p className="text-red-400 font-semibold text-sm absolute top-8 left-0">
  //     Min 4 characters
  //   </p>
  // );
};

const HandleColumnInput = ({ isOpenNewColumn, setIsOpenNewColumn }) => {
  return (
    <>
      {isOpenNewColumn ? (
        <Button onClick={() => setIsOpenNewColumn(false)} variant="ghost">
          <MinusCircle className="w-4 h-4" />
        </Button>
      ) : (
        <Button onClick={() => setIsOpenNewColumn(true)} variant="ghost">
          <PlusCircle className="w-4 h-4" />
        </Button>
      )}
    </>
  );
};

const TableColumns = ({ table_id, columns, setColumns }) => {
  const [renamedColumnId, setRenamedColumnId] = useState();
  const [columnName, setColumnName] = useState("");
  const [error, setError] = useState(false);
  const [isOpenNewColumn, setIsOpenNewColumn] = useState(false);
  
  const createColumn = () => {
    const new_column = {
      id: uuid(),
      type: "text",
      header: columnName,
      accessorKey: columnName,
      table_id,
    };
    setColumns((prev) => [...prev, new_column]);
  };

  const renameColumn = () => {
    setColumns((prev) => {
      return prev.map((column) => {
        if (column.id == renamedColumnId) {
          return {
            ...column,
            header: columnName,
            accessorKey: columnName,
          };
        }
        return column;
      });
    });
    setRenamedColumnId();
  };

  const handleCreateColumn = () => {
    if (columnName.length < 4) {
      setError(true);
      return;
    }
    if (renamedColumnId) {
      renameColumn();
    } else {
      createColumn();
    }
    setColumnName("");
    setIsOpenNewColumn(false);
  };

  const handleDelete = (id) => {
    setColumns((prev) => prev.filter((column) => column.id !== id));
  };

  const handleRename = (column) => {
    setIsOpenNewColumn(true);
    setColumnName(column.header);
    setRenamedColumnId(column.id);
  };

  if (!columns) {
    return <HandleEmptyColumns />;
  }

  return (
    <div className="flex justify-between gap-2">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className="flex items-center">
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className="w-[140px] flex justify-start items-center">
                {column.accessorKey === "Slug" ? (
                  <CardDescription
                    style="text-black"
                    name={column.header}
                    title={"Manage column"}
                  />
                ) : (
                  <CardDescription
                    style="text-black"
                    name={column.header}
                    title={"Manage column"}
                    options={[
                      {
                        id: 3,
                        name: "Rename",
                        onClick: () => handleRename(column),
                      },
                      {
                        id: 1,
                        name: "Delete",
                        onClick: () => handleDelete(column.id),
                      },
                      {
                        id: 2,
                        name: "Duplicate",
                        onClick: () => alert("Under development"),
                      },
                    ]}
                  />
                )}
              </TableHead>
            ))}
            {isOpenNewColumn && (
              <TableHead className="w-[120px] flex items-center">
                <Input
                  onBlur={handleCreateColumn}
                  onKeyDown={(ev) => ev.keyCode === 13 && handleCreateColumn()}
                  className="h-8 w-full rounded-sm"
                  value={columnName}
                  onChange={(e) => {
                    setError(false);
                    setColumnName(e.target.value);
                  }}
                />
                {error && <HandleInputError />}
              </TableHead>
            )}
          </TableRow>
        </TableHeader>
      </Table>
      <HandleColumnInput
        isOpenNewColumn={isOpenNewColumn}
        setIsOpenNewColumn={setIsOpenNewColumn}
      />
    </div>
  );
};

export default TableColumns;
