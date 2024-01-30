import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

const RenameTemplate = ({ label, placeholder, onSubmit }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(placeholder)
  }, []);

  return (
    <div className="grid items-center gap-2 mt-4 w-full">
      <Label htmlFor="name" className="capitalize">{label ?? "Name"}</Label>
      <Input
        type="text"
        id="name"
        onChange={(ev) => setName(ev.target.value)}
        placeholder="template name"
        value={name}
        disabled={label === "Slug"}
        className="w-full"
      />
      <Button disabled={label === "Slug"} onClick={() => onSubmit({[label]: name})}>Save</Button>
    </div>
  );
};

export default RenameTemplate;
