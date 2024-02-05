import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";

const ChangeTemplate = ({ placeholder, onSubmit }) => {
  const [html, setHTML] = useState("");

  useEffect(() => {
    setHTML(placeholder);
  }, []);

  return (
    <div className="flex flex-col w-full h-[94%] gap-2 mt-2">
      <Textarea
        type="text"
        id="name"
        onChange={(ev) => setHTML(ev.target.value)}
        placeholder="template name"
        value={html}
        className="w-full h-full"
      />
      <Button
        className="mt-auto"
        onClick={() => onSubmit({ template_html: html })}>
        Save
      </Button>
    </div>
  );
};

export default ChangeTemplate;
