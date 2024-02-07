import PreviewHeader from "./PreviewHeader";
import TableBadge from "./TableBadge";

const Preview = ({
  template_name,
  removeTable,
  renameTable,
  template_html,
  tables,
}) => {
  return (
    <div className="w-full h-full space-y-4">
      <PreviewHeader template_name={template_name} />
      {template_html && (
        <iframe
          className="w-full h-[400px] lg:h-[800px] pointer-events-none rounded-md p-4 bg-slate-300"
          srcDoc={template_html}
        ></iframe>
      )}
      <div className="grid gap-2 grid-cols-[repeat(6,auto);]">
        {tables?.map((table) => (
          <TableBadge
            key={table.id}
            table={table}
            renameTable={renameTable}
            removeTable={removeTable}
          />
        ))}
      </div>
    </div>
  );
};

export default Preview;