import { Heading } from "@/components";
import Template from "./Template";

export const TemplateList = ({ templates }) => {
  if (!templates.length) {
    return <Heading title={"Templates not found."} />;
  }

  return (
    <>
      {templates.map((template) => (
        <Template key={template.id} template={template} />
      ))}
    </>
  );
};
