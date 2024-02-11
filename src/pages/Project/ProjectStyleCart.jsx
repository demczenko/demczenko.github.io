import { Button } from "@/components/ui/button";
import { Edit2Icon, TrashIcon } from "lucide-react";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateForm } from "@/components/CreateForm";

const ProjectStyleCart = ({ item, handleEdit, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const style = item.style;
  const style_data = Object.entries(style);

  const handleSubmit = (data) => {
    const new_item = {
      ...item,
      style: {
        ...item.style,
        ...data,
      },
    };
    handleEdit(new_item);
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>{style.name}</CardTitle>
      </CardHeader>
      {style_data.map(([key, value]) => {
        if (value.length > 0 && key !== "name") {
          return (
            <CardContent key={key}>
              <div className="flex justify-between items-center">
                <p className="capitalize">
                  {key === "backgroundColor"
                    ? "Background Color"
                    : key === "color"
                    ? "Text color"
                    : ""}
                </p>
                <p className="flex gap-2 items-center">
                  <span
                    className="rounded-full w-4 h-4 inline-block"
                    style={{ backgroundColor: value }}
                  ></span>
                  {value}
                </p>
              </div>
            </CardContent>
          );
        }
      })}
      <CardFooter className="flex gap-2">
        <Button
          size="sm"
          variant="ghost"
          className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
          onClick={() => handleDelete(item.id)}
        >
          <TrashIcon className="pr-2" />
          Delete
        </Button>
        <Button
          size="sm"
          variant="ghost"
          className="mt-2 h-fit px-2 py-1 rounded-sm text-xs text-blue-300 hover:text-blue-600 flex items-center justify-center"
          onClick={() => setIsOpen(true)}
        >
          <Edit2Icon className="pr-2" />
          Edit
        </Button>
      </CardFooter>
      <CreateForm
        fields={style_data.map(([key, value], i) => {
          return {
            id: i,
            key: key,
            label:
              key === "backgroundColor"
                ? "Background Color"
                : key === "color"
                ? "Text color"
                : key === "name"
                ? "Section name"
                : "Field",
            name: key,
            placeholder: key,
          };
        })}
        title={"Edit project style"}
        description={"Manage project style. Click done when you are ready"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default ProjectStyleCart;
