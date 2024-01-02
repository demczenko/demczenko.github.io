import { Heading } from "@/components";
import Template from "./Template";
import { PageContainer } from "..";

export const TemplateList = ({ templates }) => {
  if (!templates.length) {
    return (
      <PageContainer>
        <Heading title={"Templates not found."} />
      </PageContainer>
    );
  }

  return (
    <>
      {templates.map((template) => (
        <Template key={template.id} {...template} />
      ))}
    </>
  );
};
