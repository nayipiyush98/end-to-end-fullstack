import { cn } from "../lib/utils";
import { Button } from "../components/UI/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/UI/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "../components/UI/field";
import { Input } from "../components/UI/Input";
import { registerFormSchema } from "@/lib/validator";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router-dom";

export function Register({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
        name:"",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerFormSchema>) => {
    try {
    // const response = await axios.post(
    //   "http://localhost:3000/api/auth/admin/register",
    //   data,
    //   {
    //     withCredentials: true,
    //   }
    // );

    //console.log(response);

    alert("Admin registered successfully");

    navigate("/admin/login");
  }catch (error: any) {
  console.log(error);
  console.log(error.response);
  console.log(error.response?.data);

  alert(error.response?.data?.message || "Registration failed");
}
  };

  return (
    <>
      {/* <div className="flex items-right justify-end p-4 md:p-4">
        <ModeToggle />
      </div> */}
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Enter your information below to create your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup>
                    <Controller
                     name="name"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            type="name"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="email"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            type="email"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor={field.name}>
                            Passsword
                          </FieldLabel>
                          <Input
                            {...field}
                            id={field.name}
                            type="password"
                            aria-invalid={fieldState.invalid}
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                    
                    <Field>
                      <Button type="submit">Create Account</Button>
                      <Button variant="outline" type="button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                            fill="currentColor"
                          />
                        </svg>
                        Singup with Google
                      </Button>
                      <FieldDescription className="text-center">
                        Already have an account? <a href="javascript:void(0)" onClick={() => navigate('/admin/login') }>Sign In</a>
                      </FieldDescription>
                    </Field>
                  </FieldGroup>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
