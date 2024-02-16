import TemplateForm from "./TemplateForm";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Preview from "./Preview";
import { useToast } from "@/components/ui/use-toast";
import { useTemplateCreate } from "@/hooks/templates/useTemplateCreate";
import { useQueryClient } from "react-query";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export const AddTemplateDrawer = ({ header, onSubmitForm }) => {
  const client = useQueryClient();
  const { mutate: createTemplate, isLoading, isError } = useTemplateCreate();
  const [html, setHTML] = useState("");
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      template_name: "",
    },
  });

  useEffect(() => {
    const reader = new FileReader();

    reader.onload = () => {
      setHTML(reader.result);
    };

    const file = form.watch("template_html");
    if (file) {
      reader.readAsText(file);
    }
  }, [form.watch("template_html")]);

  const validateFormInput = (formData, cb) => {
    for (const key in formData) {
      if (key === "template_html") {
        if (!html) {
          form.setError("template_html", {
            type: "required",
            message: "Please, enter valid value",
          });
          return;
        }
      } else {
        const value = formData[key];
        if (value.trim().length < 1) {
          form.setError(key, {
            type: "required",
            message: "Please, enter valid value",
          });
          return;
        }
      }
    }
    cb(formData);
  };

  const onSubmit = async (data) => {
    const new_template = {
      template_name: data.template_name,
      template_html: html,
      id: uuidv4(),
      isarchived: false,
      createdat: Date.now(),
    };

    createTemplate(new_template, {
      onError: () => {
        toast({
          variant: "destructive",
          title: "Failed to create template",
          description: "Something went wrong",
        });
      },
      onSettled: () => {
        client.invalidateQueries("templates");
      },
      onSuccess: () => {
        toast({
          variant: "success",
          title: "Success",
          description: "Template successfully created",
        });
      },
    });

    onSubmitForm();
  };

  return (
    <div className="flex xl:flex-row flex-col gap-6 h-[calc(100%-56px)]">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) =>
            validateFormInput(data, onSubmit)
          )}
          className="space-y-8 h-full flex flex-col w-full">
          {header}
          <TemplateForm form={form} />
          <Button type="submit" size="sm" className="w-full">
            {isLoading ? (
              <Loader2
                className={cn(" h-4 w-4", {
                  "animate-spin": isLoading,
                })}
              />
            ) : (
              "Create"
            )}
          </Button>
        </form>
      </Form>
      <Preview
        template_html={html}
        template_name={form.watch("template_name")}
      />
    </div>
  );
};
