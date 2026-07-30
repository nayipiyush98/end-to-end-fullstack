import * as z from "zod";

const email = z.email();
const password = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/\\|~`-]).+$/,
    {
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    },
  );

/**
 * Login Form Schema
 * 
 * @author piyush
 * @description Email and password validation
 */
export const loginFormSchema = z.object({
  email: email,
  password: password
});

export const registerFormSchema = z.object({
    name:z.string().min(2, "Name is required"),
    email: email,
  password: password
});
