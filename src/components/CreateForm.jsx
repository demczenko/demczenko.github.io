import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function CreateForm({
  title,
  description,
  isOpen,
  setIsOpen,
  onSubmit,
  fields,
}) {
  const defaultValues = fields.reduce((acc, item) => {
    acc[item.name] = item.value ?? "";
    return acc;
  }, {});

  const form = useForm({
    defaultValues: defaultValues,
  });

  const validateFormInput = (formData, cb) => {
    for (const key in formData) {
      const value = formData[key];

      if (typeof value === "string") {
        if (value.trim().length < 2) {
          form.setError(key, {
            type: "required",
            message: "Please enter a valid value",
          });
          return;
        }
      }
    }

    cb(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((formData) =>
              validateFormInput(formData, onSubmit)
            )}
            className="space-y-6 h-full flex flex-col w-full">
            <DialogHeader>
              <DialogTitle className="capitalize">{title}</DialogTitle>
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>

            {fields.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="capitalize">{item.label}</FormLabel>
                    <FormControl>
                      {item.content ? (
                        item.content(form)
                      ) : (
                        <Input
                          type={item.type ?? "text"}
                          placeholder={item.placeholder}
                          {...field}
                        />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" size="sm" className="w-full">
              Done
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
