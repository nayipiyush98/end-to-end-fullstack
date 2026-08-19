import { z } from "zod";
export declare const createOrderSchema: z.ZodObject<{
    items: z.ZodArray<z.ZodObject<{
        productId: z.ZodNumber;
        qty: z.ZodNumber;
    }, z.core.$strip>>;
    shippingAddress: z.ZodString;
    paymentMethod: z.ZodString;
}, z.core.$strip>;
export type CreateOrderInput = z.infer<typeof createOrderSchema>;
export declare const getOrdersQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodOptional<z.ZodString>;
    userId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type GetOrdersQuery = z.infer<typeof getOrdersQuerySchema>;
//# sourceMappingURL=orderZod.d.ts.map