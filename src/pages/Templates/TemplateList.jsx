import { List } from "@/components";
import TemplateCart from "./TemplateCart";

export const TemplateList = ({
  onRename,
  onArchive,
  onDelete,
  templates,
  isProjectPage,
  isTemplatePage,
}) => {
  return (
    <List>
      {templates.map((template) => (
        <TemplateCart
          isTemplatePage={isTemplatePage}
          isProjectPage={isProjectPage}
          onRename={onRename}
          onArchive={onArchive}
          onDelete={() => onDelete(template.id)}
          key={template.id}
          template={template}
        />
      ))}
    </List>
  );
};
