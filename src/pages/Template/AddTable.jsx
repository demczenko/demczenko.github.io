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

export function AddTable({ isOpen, setIsOpen, onSubmit }) {
  const form = useForm({
    defaultValues: {
      table_name: "",
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 h-full flex flex-col w-full">
            <DialogHeader>
              <DialogTitle>Create table</DialogTitle>
              <DialogDescription>
                Enter table name. Click save when you're done.
              </DialogDescription>
            </DialogHeader>

            <FormField
              control={form.control}
              name={"table_name"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Table name</FormLabel>
                  <FormControl>
                    <Input placeholder="name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="sm" className="w-full">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
