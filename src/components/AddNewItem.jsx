import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function AddNewItem({
  title,
  description,
  isOpen,
  setIsOpen,
  onSubmit,
  fields,
}) {
  const defaultValues = fields.reduce((acc, item) => {
    acc[item.name.toLowerCase()] = "";
    return acc;
  }, {});

  const form = useForm({
    defaultValues: defaultValues,
  });

  const validateFormInput = (formData, cb) => {
    for (const key in formData) {
      const value = formData[key];

      if (value.trim().length < 1) {
        form.setError(key, {
          type: "required",
          message: "Length must be at least 3 symbols",
        });
        return;
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
            className="space-y-8 h-full flex flex-col w-full">
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
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
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input placeholder={item.placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}

            <Button type="submit" size="sm" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
