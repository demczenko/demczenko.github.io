import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useEffect, useState } from "react";

const RenameTemplate = ({ placeholder, onSubmit }) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(placeholder)
  }, []);

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
      <Button onClick={() => onSubmit(name)}>Save</Button>
    </div>
  );
};

export default RenameTemplate;
