import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { useUsers } from "@/hooks/useUsers";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigator = useNavigate();
  const { data: users, isError, isLoading, update, set } = useUsers();
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
    },
  });

  const validateFormInput = (formData, cb) => {
    for (const key in formData) {
      const value = formData[key];
      if (value.trim().length < 1) {
        form.setError(key, {
          type: "required",
          message: "Please, enter valid value",
        });
        return;
      }
    }

    cb(formData);
  };

  const onSubmit = (formData) => {
    const new_user = {
      ...formData,
      id: uuidv4(),
      role: "user",
      full_name: formData.first_name + " " + formData.last_name,
    };
    const isSuccess = set(new_user);
    if (isSuccess) {
      toast({
        variant: "success",
        title: "Account created",
        description: "Account has been successfully created",
      });
      navigator("");
    } else {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later.",
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen bg-[#363636]">
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Create account here. Click save when you're done.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...form}>
            <form
              className="flex flex-col gap-2"
              onSubmit={form.handleSubmit((formData) =>
                validateFormInput(formData, onSubmit)
              )}>
              <FormField
                control={form.control}
                name={"first_name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"last_name"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Surname</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={"email"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-2" type="submit" size="sm">
                Create
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <Toaster />
    </div>
  );
}
export default Login;
