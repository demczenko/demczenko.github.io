import TemplateForm from "./TemplateForm";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import Preview from "./Preview";
import { useTables } from "@/hooks/tables/useTables";
import { useToast } from "@/components/ui/use-toast";

export const AddTemplateDrawer = ({ setTemplate, header, onSubmitForm }) => {
  const {
    data: dataTables,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTables,
    set: setTable,
  } = useTables();
  const [template_id, setTemplateID] = useState(() => uuidv4())
  const [tables, setTables] = useState([]);
  const [html, setHTML] = useState("");
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      template_name: "",
      table_name: "",
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
        }
      } else if (key === "table_name") {
        if (tables.length === 0) {
          form.setError("table_name", {
            type: "required",
            message: "Please, add at least 1 table",
          });
        }
      } else {
        const value = formData[key];
        if (value.trim().length < 1) {
          form.setError(key, {
            type: "required",
            message: "Please, enter valid value",
          });
        }
      }
    }
    cb(formData);
  };

  const onSubmit = async (data) => {
    const new_template = {
      template_name: data.template_name,
      template_html: html,
      id: template_id,
      isarchived: false,
      createdat: Date.now(),
    };

    const candidate = await setTemplate(new_template);

    if (candidate) {
      for (const table of tables) {
        // TODO
        setTable(table);
      }
      toast({
        variant: "success",
        title: "Success",
        description: "Project added successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failed to create project",
        description: "Something went wrong",
      });
    }
    onSubmitForm();
  };

  const handleAddTable = () => {
    const new_table = {
      id: uuidv4(),
      table_name: form.watch("table_name"),
      template_id: template_id,
      createdat: Date.now(),
    };

    setTables((prev) => [...prev, new_table]);
    form.resetField("table_name");
  };

  const handleRemoveTable = (id) => {
    setTables((prev) => prev.filter((item) => item.id !== id));
  };

  const handleRenameTable = (table) => {
    setTables((prev) =>
      prev.map((item) => (item.id === table.id ? { ...item, ...table } : item))
    );
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
          <TemplateForm form={form} handleAddTable={handleAddTable} />
          <Button type="submit" size="sm" className="w-full">
            Create
          </Button>
        </form>
      </Form>
      <Preview
        renameTable={handleRenameTable}
        removeTable={handleRemoveTable}
        template_html={html}
        tables={tables}
        template_name={form.watch("template_name")}
      />
    </div>
  );
};
