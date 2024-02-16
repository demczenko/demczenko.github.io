import PreviewHeader from "./PreviewHeader";

const Preview = ({ template_name, template_html }) => {
  return (
    <div className="w-full h-full space-y-4">
      <PreviewHeader template_name={template_name} />
      {template_html && (
        <iframe
          className="w-full h-[400px] lg:h-[800px] pointer-events-none rounded-md p-4 bg-slate-300"
          srcDoc={template_html}></iframe>
      )}
    </div>
  );
};

export default Preview;
