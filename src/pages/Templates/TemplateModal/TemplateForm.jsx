import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useKeypress from "react-use-keypress";

const TemplateForm = ({ form, handleAddTable }) => {
  useKeypress("Enter", (e) => {
    if (e.keyCode === 13 && e.ctrlKey) {
      handleAddTable();
    }
  });

  return (
    <div className="space-y-2 grow">
      <FormField
        control={form.control}
        name="template_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Template Name</FormLabel>
            <FormControl>
              <Input placeholder="template name" {...field} />
            </FormControl>
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
              <Input
                type="file"
                accept=".html"
                placeholder="html template"
                onChange={(e) => {
                  form.setValue("template_html", e.target.files[0]);
                  form.clearErrors("template_html");
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="table_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Table Name</FormLabel>
            <FormControl>
              <Input onKey placeholder="table name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TemplateForm;