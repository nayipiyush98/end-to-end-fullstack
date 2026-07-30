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
//# sourceMappingURL=UserZod.d.ts.map