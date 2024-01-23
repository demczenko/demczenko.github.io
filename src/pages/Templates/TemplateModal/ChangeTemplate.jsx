import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";

const ChangeTemplate = ({ label, placeholder, onSubmit }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(placeholder);
  }, []);

  return (
    <div className="flex flex-col w-full h-[94%] gap-2 mt-6">
      <Label htmlFor="name" className="capitalize">
        {label ?? "Name"}
      </Label>
      <Textarea
        type="text"
        id="name"
        onChange={(ev) => setName(ev.target.value)}
        placeholder="template name"
        value={name}
        className="w-full h-full"
      />
      <Button
        className="mt-auto"
        disabled={label === "Slug"}
        onClick={() => onSubmit({ [label.toLowerCase()]: name })}>
        Save
      </Button>
    </div>
  );
};

export default ChangeTemplate;
