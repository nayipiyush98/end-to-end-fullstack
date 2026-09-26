import z, { string } from "zod";
export const UserValidation = z.object({
    name: z.string().min(3, "Name should be 3").max(15),
    email: z.email(),
    password: z.string().min(8).max(20)
});
export const AdminValidation = z.object({
    name: z.string().min(3, "Name should be 3").max(15),
    email: z.email(),
    password: z.string().min(8).max(20),
    roleId: z.number().nullish()
});
export const AdminLoginValidation = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
});
export const UserLoginValidation = z.object({
    email: z.email(),
    password: z.string().min(8).max(20)
});
export const UserResetPassword = z.object({
    password: z.string()
});
export const updateUserProfileSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z
        .string()
        .min(10, "Phone number must be at least 10 characters")
        .optional(),
    addresses: z
        .array(z.object({
        address: z.string().min(5, "Address must be at least 5 characters"),
    }))
        .optional(),
});
//# sourceMappingURL=UserZod.js.map