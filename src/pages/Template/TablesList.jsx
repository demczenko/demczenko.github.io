import { TableService } from "@/api/tables/init";
import TableCart from "./TableCart";

const TablesList = ({ tables }) => {
  const handleDelete = (id) => {
    const filtered = tables.filter((table) => table.id === id);
    filtered.forEach((table) => TableService.deleteTable(table));
  };

  // TODO: REMOVE ALL COLUMNS WITH ID OF DELETED TABLE

  return (
    <div>
      <h2 className="text-2xl text-neutral-200 row-span-full mb-2">Tables</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {tables.map((item) => (
          <TableCart
            key={item.id}
            onDelete={() => handleDelete(item.id)}
            table={item}
          />
        ))}
      </div>
    </div>
  );
};

export default TablesList;
