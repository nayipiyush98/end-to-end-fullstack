import type { CancelOrderInput, CreateOrderInput, GetOrdersQuery, UpdateOrderStatusInput } from "../zod/orderZod.js";
export declare function createOrderService(userId: number, data: CreateOrderInput): Promise<{
    items: ({
        product: {
            id: number;
            name: string;
            description: string | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            stock: number;
            sku: string;
            images: string[];
            categoryId: number;
            isArchived: boolean;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        orderId: number;
        productId: number;
        qty: number;
        price: import("@prisma/client-runtime-utils").Decimal;
    })[];
    statusHistory: {
        id: number;
        orderId: number;
        status: string;
        createdAt: Date;
    }[];
} & {
    id: number;
    userId: number;
    total: import("@prisma/client-runtime-utils").Decimal;
    shippingAddress: string;
    paymentMethod: string;
    status: string;
    cancelReason: string | null;
    cancelledAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getOrdersService(authId: number, AuthType: "CUSTOMER" | "ADMIN", query: GetOrdersQuery): Promise<{
    orders: ({
        items: ({
            product: {
                id: number;
                images: string[];
                name: string;
                price: import("@prisma/client-runtime-utils").Decimal;
            };
        } & {
            id: number;
            orderId: number;
            productId: number;
            qty: number;
            price: import("@prisma/client-runtime-utils").Decimal;
        })[];
        user: {
            email: string;
            id: number;
            name: string;
        };
    } & {
        id: number;
        userId: number;
        total: import("@prisma/client-runtime-utils").Decimal;
        shippingAddress: string;
        paymentMethod: string;
        status: string;
        cancelReason: string | null;
        cancelledAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    })[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasPreviousPage: boolean;
        hasNextPage: boolean;
    };
}>;
export declare function getOrderByIdService(orderId: number, authId: number, authType: "ADMIN" | "CUSTOMER"): Promise<{
    items: ({
        product: {
            id: number;
            images: string[];
            name: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            sku: string;
        };
    } & {
        id: number;
        orderId: number;
        productId: number;
        qty: number;
        price: import("@prisma/client-runtime-utils").Decimal;
    })[];
    statusHistory: {
        id: number;
        orderId: number;
        status: string;
        createdAt: Date;
    }[];
    user: {
        email: string;
        id: number;
        name: string;
    };
} & {
    id: number;
    userId: number;
    total: import("@prisma/client-runtime-utils").Decimal;
    shippingAddress: string;
    paymentMethod: string;
    status: string;
    cancelReason: string | null;
    cancelledAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function updateOrderStatusService(orderId: number, data: UpdateOrderStatusInput): Promise<{
    items: ({
        product: {
            id: number;
            images: string[];
            name: string;
            price: import("@prisma/client-runtime-utils").Decimal;
        };
    } & {
        id: number;
        orderId: number;
        productId: number;
        qty: number;
        price: import("@prisma/client-runtime-utils").Decimal;
    })[];
    user: {
        email: string;
        id: number;
        name: string;
    };
} & {
    id: number;
    userId: number;
    total: import("@prisma/client-runtime-utils").Decimal;
    shippingAddress: string;
    paymentMethod: string;
    status: string;
    cancelReason: string | null;
    cancelledAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function cancelOrderService(orderId: number, authId: number, authType: "ADMIN" | "CUSTOMER", data: CancelOrderInput): Promise<{
    id: number;
    userId: number;
    total: import("@prisma/client-runtime-utils").Decimal;
    shippingAddress: string;
    paymentMethod: string;
    status: string;
    cancelReason: string | null;
    cancelledAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
export declare function getInvoiceService(orderId: number, authId: number, authType: "ADMIN" | "CUSTOMER"): Promise<{
    items: ({
        product: {
            id: number;
            name: string;
            sku: string;
        };
    } & {
        id: number;
        orderId: number;
        productId: number;
        qty: number;
        price: import("@prisma/client-runtime-utils").Decimal;
    })[];
    user: {
        email: string;
        id: number;
        name: string;
    };
} & {
    id: number;
    userId: number;
    total: import("@prisma/client-runtime-utils").Decimal;
    shippingAddress: string;
    paymentMethod: string;
    status: string;
    cancelReason: string | null;
    cancelledAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}>;
//# sourceMappingURL=order.service.d.ts.map