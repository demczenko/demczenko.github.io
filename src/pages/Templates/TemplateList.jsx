import Template from "./Template";

export const TemplateList = ({ templates }) => {
  return (
    <>
      {templates.map((template) => (
        <Template key={template.id} {...template} />
      ))}
    </>
  );
};
