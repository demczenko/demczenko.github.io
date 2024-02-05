import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useColumns } from "@/hooks/useColumns";
import { useTables } from "@/hooks/useTables";
import { useTemplates } from "@/hooks/useTemplates";
import { TrashIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const TemplateForm = ({
  onSubmitForm,
  templateId,
  tables,
  columns,
  form,
  html,
  setHtml,
  fileName,
  setFileName,
}) => {
  const [error, setError] = useState("");
  const {
    data: templates,
    isError,
    isLoading,
    update,
    set: setTemplate,
    remove,
  } = useTemplates();
  const {
    data,
    isError: IsColumnsError,
    isLoading: isColumnsLoading,
    update: updateColumn,
    set: setColumns,
    remove: removeColumn,
  } = useColumns();



  const {
    data: dataTables,
    isError: IsTablesError,
    isLoading: isTablesLoading,
    update: updateTables,
    set: setTable,
  } = useTables();

  const onDrop = useCallback((htmlFile) => {
    const html = htmlFile[0];
    const reader = new FileReader();
    reader.onerror = () => setError("File reading has failed");
    reader.onload = () => {
      setFileName(html.path);
      setHtml(reader.result);
      form.clearErrors("template_html");
    };
    reader.readAsText(html);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/html": [".html"],
    },
  });

  const validateForm = (formData, cb) => {
    if (formData.template_name.length < 4) {
      form.setError("template_name", {
        message: "Template name must be at least 4 characters",
        type: "required",
      });
      return;
    }

    if (!html) {
      form.setError("template_html", {
        message: "Html template is required.",
        type: "required",
      });
      return;
    }

    cb(formData);
  };

  const onSubmit = (data) => {
    if (tables.length === 0) {
      console.log("Please create at least one table.");
      return;
    }
    const template = {
      template_name: data.template_name,
      template_html: html,
      isArchived: false,
      id: templateId,
      createdAt: Date.now(),
    };

    console.log(tables)
    console.log(columns)

    onSubmitForm();
    setError("");
    setTemplate(template);
    tables.forEach((table) => setTable(table));
    columns.forEach((column) => setColumns(column));
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => validateForm(data, onSubmit))}
        className="space-y-8">
        <FormField
          control={form.control}
          name="template_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="template name" {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on template card.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="template_html"
          render={({ field }) => (
            <FormItem>
              <FormLabel>HTML Template</FormLabel>
              <FormControl>
                <div className="flex flex-col space-y-4">
                  <div {...getRootProps()}>
                    <input {...getInputProps()} {...field} />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <FormLabel>
                        Drag and drop only HTML files here, or click to select
                        HTML files
                      </FormLabel>
                    )}
                  </div>
                  {html && (
                    <FormLabel className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-green-900">
                          File successfully uploaded
                        </p>
                        <TrashIcon
                          className="h-3 w-3 hover:text-red-300 transition-colors cursor-pointer"
                          onClick={() => setHtml("")}
                        />
                      </div>
                      <p className="text-neutral-300">{fileName}</p>
                    </FormLabel>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                This is the template that will be used to create projects.
              </FormDescription>
              <FormMessage />
              {error && (
                <p className="text-red-500 font-semibold text-sm">{error}</p>
              )}
            </FormItem>
          )}
        />
        <Button type="submit" size="sm">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default TemplateForm;
