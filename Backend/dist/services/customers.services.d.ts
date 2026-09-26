export declare function getCustomersService(page: number, limit: number, search?: string): Promise<{
    customers: {
        id: number;
        name: string;
        email: string;
        createdAt: Date;
        orderCount: number;
    }[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPreviousPage: boolean;
    };
}>;
export declare function getCustomerByIdService(id: number): Promise<{
    id: number;
    name: string;
    email: string;
    createdAt: Date;
    totalOrders: number;
    orders: {
        cancelReason: string | null;
        cancelledAt: Date | null;
        createdAt: Date;
        id: number;
        items: {
            id: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            product: {
                id: number;
                images: string[];
                name: string;
                sku: string;
            };
            qty: number;
        }[];
        paymentMethod: string;
        shippingAddress: string;
        status: string;
        total: import("@prisma/client-runtime-utils").Decimal;
    }[];
} | null>;
export declare function updateCustomerStatusService(id: number, isActive: boolean): Promise<{
    createdAt: Date;
    email: string;
    id: number;
    isActive: boolean;
    name: string;
} | null>;
//# sourceMappingURL=customers.services.d.ts.map