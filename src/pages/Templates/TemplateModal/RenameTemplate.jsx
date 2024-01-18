import { TemplatesService } from "@/api/templates/init";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RenameTemplate = ({ template_id }) => {
  const navigator = useNavigate()
  const [name, setName] = useState("");
  const [template, setTemplate] = useState({});
  // Fetch all templates
  // TODO
  useEffect(() => {
    async function getTemplateList() {
      try {
        const response = await TemplatesService.getTemplates();
        if (response.ok) {
          const data = await response.json();
          const template = data.find((template) => template.id === template_id);
          if (template) {
            setTemplate(template);
            setName(template.template_name)
          } else {
            throw new Error("Template not found.");
          }
        }
      } catch (error) {
        console.warn(error.message);
      }
    }

    getTemplateList();
  }, []);

  const onSubmit = () => {
    if (name.length < 4) return;
    console.log(template.id);
    TemplatesService.updateTemplate({ ...template, template_name: name });
    navigator("/templates/" + template.id)
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-2 mt-6">
      <Label htmlFor="name">Name</Label>
      <Input
        type="text"
        id="name"
        onChange={(ev) => setName(ev.target.value)}
        placeholder="template name"
        value={name}
      />
      <Button onClick={onSubmit}>Save</Button>
    </div>
  );
};

export default RenameTemplate;
