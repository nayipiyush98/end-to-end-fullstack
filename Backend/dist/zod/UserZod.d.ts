import z from "zod";
export declare const UserValidation: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const AdminValidation: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    password: z.ZodString;
    roleId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
export declare const AdminLoginValidation: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const UserLoginValidation: z.ZodObject<{
    email: z.ZodEmail;
    password: z.ZodString;
}, z.core.$strip>;
export declare const UserResetPassword: z.ZodObject<{
    password: z.ZodString;
}, z.core.$strip>;
export declare const updateUserProfileSchema: z.ZodObject<{
    name: z.ZodString;
    phone: z.ZodOptional<z.ZodString>;
    addresses: z.ZodOptional<z.ZodArray<z.ZodObject<{
        address: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
//# sourceMappingURL=UserZod.d.ts.map