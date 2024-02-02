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
import { useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";

const HandleEmptyColumns = () => {
  return (
    <p className="text-neutral-400 font-semibold text-sm">
      Looks like there is no columns
    </p>
  );
};

const HandleInputError = () => {
  return alert("Column name must be at least 3 characters");
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

const TableColumns = ({ table_id, columns, set }) => {
  const ref = useRef()
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
      createdAt: Date.now(),
      table_id,
    };
    set((prev) => [...prev, new_column]);
  };

  const renameColumn = () => {
    set((prev) => {
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
    if (columnName.length === 0) {
      setIsOpenNewColumn(false);
      return;
    }
    if (columnName.length < 3) {
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
    set((prev) => prev.filter((column) => column.id !== id));
  };

  const handleRename = (column) => {
    setIsOpenNewColumn(true);
    setColumnName(column.header);
    setRenamedColumnId(column.id);
    ref.current.focus()
  };

  const selectedColumns = columns.filter(
    (column) => column.table_id === table_id
  );

  useEffect(() => {
    if (!ref.current) return

    ref.current.focus()
  }, [isOpenNewColumn])

  if (!columns) {
    return <HandleEmptyColumns />;
  }
  

  return (
    <div className="flex justify-between gap-2">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow className="flex items-center">
            {selectedColumns.map((column) => (
              <TableHead
                key={column.id}
                className="w-[200px] flex justify-start items-center">
                {column.type === "slug" ? (
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
              <TableHead className="w-[200px] flex items-center">
                <Input
                  ref={ref}
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
