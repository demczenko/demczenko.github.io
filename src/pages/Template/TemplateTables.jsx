import TableCart from "./TableCart";

const TemplateTables = ({ tables }) => {
  return (
    <div>
      <h2 className="text-2xl text-neutral-200 row-span-full mb-2">Tables</h2>
      <div className="grid grid-cols-4 gap-2">
        {tables.map((item) => (
          <TableCart key={item.id} table={item} />
        ))}
      </div>
    </div>
  );
};

export default TemplateTables;
