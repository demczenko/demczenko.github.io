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
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

const TemplateForm = ({ onSubmitForm }) => {
  const [html, setHtml] = useState("");
  const [error, setError] = useState("");
  const form = useForm({
    defaultValues: {
      template_name: "",
      template_html: "",
    },
  });

  const onDrop = useCallback((htmlFile) => {
    const html = htmlFile[0];
    const reader = new FileReader();
    reader.onerror = () => setError("File reading has failed");
    reader.onload = () => setHtml(reader.result);
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
        type: "required"
      })
      return;
    }

    if (!html) {
      form.setError("template_html", {
        message: "Html template is required.",
        type: "required"
      })
      return;
    }

    cb(formData)
  }

  const onSubmit = (data) => {

    const template = {
      template_name: data.template_name,
      template_html: html,
      id: uuidv4(),
    };

    onSubmitForm()
    console.log(template);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => validateForm(data, onSubmit))} className="space-y-8">
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
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on template card.
              </FormDescription>
              <FormMessage />
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
