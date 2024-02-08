import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";

const ChangeTemplate = ({ placeholder, onSubmit }) => {
  const [html, setHTML] = useState("");

  useEffect(() => {
    setHTML(placeholder);
  }, []);

  return (
    <>
      <div className="w-full xl:h-[1000px] md:h-[600px] h-[400px] overflow-y-auto rounded-md block">
        <Textarea
          type="text"
          id="name"
          onChange={(ev) => setHTML(ev.target.value)}
          placeholder="template name"
          value={html}
          className="w-full h-full"
        />
      </div>
      <Button
        className="mt-6 w-full"
        onClick={() => onSubmit({ template_html: html })}>
        Save
      </Button>
    </>
  );
};

export default ChangeTemplate;
