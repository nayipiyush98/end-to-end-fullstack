export declare function getUsersService(email?: string): Promise<{
    createdAt: Date;
    email: string;
    id: number;
    name: string;
}[]>;
export declare function getUserProfileService(id: number): Promise<{
    createdAt: Date;
    email: string;
    id: number;
    isActive: boolean;
    name: string;
} | null>;
export declare function updateUserProfileService(id: number, data: {
    name: string;
    phone?: string | undefined;
    addresses?: {
        address: string;
    }[] | undefined;
}): Promise<{
    addresses: {
        address: string;
        createdAt: Date;
        id: number;
    }[];
    createdAt: Date;
    email: string;
    id: number;
    isActive: boolean;
    name: string;
    phone: string | null;
} | null>;
//# sourceMappingURL=users.servies.d.ts.map