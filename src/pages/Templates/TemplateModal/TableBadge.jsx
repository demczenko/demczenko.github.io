import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useKeypress from "react-use-keypress";

const TableBadge = ({ table, renameTable, removeTable }) => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(table.table_name);

  useKeypress("Enter", (e) => {
    if (e.keyCode === 13) {
      handleChangeName(table);
    }
  });

  const handleChangeName = (table) => {
    if (name.trim().length > 0) {
      renameTable({ ...table, table_name: name });

      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (!ref.current) return;

    ref.current.focus();
  }, [isOpen]);

  return (
    <Badge
      className={
        "px-3 py-2 flex justify-between items-center rounded-md hover:bg-red-50"
      }
      variant={"ghost"}>
      {isOpen ? (
        <Input
          ref={ref}
          className="text-xs px-2 py-2 h-6 ц"
          onBlur={() => handleChangeName(table)}
          onChange={(ev) => setName(ev.target.value)}
          value={name}
        />
      ) : (
        <h4
          onClick={() => {
            setIsOpen(true);
          }}
          className="tex-xs font-semibold">
          {table.table_name}
        </h4>
      )}
      {!isOpen && (
        <X
          onClick={() => removeTable(table.id)}
          className="w-3 h-3 cursor-pointer"
        />
      )}
    </Badge>
  );
};

export default TableBadge;
