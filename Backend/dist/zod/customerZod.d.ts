import { z } from "zod";
export declare const updateCustomerStatusSchema: z.ZodObject<{
    isActive: z.ZodBoolean;
}, z.core.$strip>;
export type UpdateCustomerStatusInput = z.infer<typeof updateCustomerStatusSchema>;
//# sourceMappingURL=customerZod.d.ts.map