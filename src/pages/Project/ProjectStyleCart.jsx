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
import CardActions from "@/components/CardActions";

const ProjectStyleCart = ({ item, handleEdit, handleDelete }) => {
  const [isOpen, setIsOpen] = useState(false);

  const style = item.style;
  const style_data = Object.entries(style);

  const handleSubmit = (data) => {
    const new_item = {
      id: item.id,
      style: {
        ...item.style,
        ...data,
      },
    };
    handleEdit(new_item);
  };

  return (
    <Card className="min-w-[300px] bg-neutral-900 hover:shadow-lg hover:bg-neutral-700 transition-all border-none">
      <CardHeader>
        <CardTitle className="text-white hover:underline">
          {style.name}
        </CardTitle>
      </CardHeader>
      {style_data.map(([key, value]) => {
        if (value.length > 0 && key !== "name") {
          return (
            <CardContent key={key}>
              <div className="flex justify-between items-center text-white">
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
                    style={{ backgroundColor: value }}></span>
                  {value}
                </p>
              </div>
            </CardContent>
          );
        }
      })}
      <CardFooter className="flex gap-2">
        <CardActions
          actions={[
            {
              id: 1,
              name: "Delete",
              icon: <TrashIcon className="h-4 w-4 mr-2" />,
              onClick: () => handleDelete(item.id),
            },
            {
              id: 2,
              name: "Edit",
              icon: <Edit2Icon className="h-4 w-4 mr-2" />,
              onClick: () => setIsOpen(true),
            },
          ]}
        />
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
