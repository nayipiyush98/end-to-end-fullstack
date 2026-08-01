import { cn } from "../lib/utils";
import { Button } from "@/components/ui/button";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { loginFormSchema } from "@/lib/validator";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ModeToggle } from "@/components/mode-toggle";
import { useNavigate } from "react-router-dom";
import { login } from "@/api/auth.apis";
import { API_TOKEN_COOKIE_KEY } from "@/lib/constants";
import { useAlert } from "@/components/common/alert-provider";

export function Login({ className, ...props }: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const { showAlert } = useAlert();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof loginFormSchema>) => {
    try {
      const response = await login(data);

      if (response.accessToken) {
        // Save Access Token
        localStorage.setItem(API_TOKEN_COOKIE_KEY, response.accessToken);

        showAlert({
          variant: "default",
          title: "Welcome Back",
          description:
            "You have logged in safely. Redirecting you to your dashboard....",
        });
        setTimeout(() => {
          // Redirect to Dashboard
          navigate("/admin");
        }, 2000);
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.status);
      if (error.response?.status === 429) {
        showAlert({
          variant: "destructive",
          title: "Too Many Attempts",
          description: "Please wait 15 minutes before trying again.",
        });
        return;
      }

      showAlert({
        variant: "destructive",
        title: "Login Failed!",
        description:
          error.response?.data?.message || "Something went wrong while login.",
      });
      console.error(error);
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
                <CardTitle>Login to your account</CardTitle>
                <CardDescription>
                  Enter your email below to login to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup>
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
                    <a
                      href="javascript:void(0)"
                      className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                      onClick={() => navigate("/admin/forgot-password")}
                    >
                      Forgot your password?
                    </a>
                    <Field>
                      <Button type="submit">Login</Button>
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
                        Login with Google
                      </Button>
                      <FieldDescription className="text-center">
                        Don&apos;t have an account?{" "}
                        <a
                          href="javascript:void(0)"
                          onClick={() => navigate("/admin/register")}
                        >
                          Sign up
                        </a>
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
