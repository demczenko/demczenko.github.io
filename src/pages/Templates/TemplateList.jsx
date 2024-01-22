import Template from "./Template";
import { Button } from "@/components/ui/button";

export const TemplateList = ({ templates, onCreate }) => {
  if (!templates.length) {
    return (
      <div className="fixed top-1/2 -translate-y-1/2 w-3/4 text-center z-10">
        <p className="text-6xl text-neutral-100 font-medium tracking-tight">
          Whooops!
        </p>
        <p className="text-sm text-neutral-400 font-medium mt-4">
          Looks like you don't have any template yet.
        </p>
        <p className="text-neutral-200 font-medium mt-12">
          Start{" "}
          <Button onClick={onCreate} size="sm" variant="ghost">
            creating
          </Button>{" "}
          templates right now!
        </p>
      </div>
    );
  }

  return (
    <>
      {templates.map((template) => (
        <Template key={template.id} template={template} />
      ))}
    </>
  );
};
