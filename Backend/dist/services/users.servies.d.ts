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
export declare function createUserAddressService(userId: number, data: {
    address: string;
}): Promise<{
    address: string;
    createdAt: Date;
    id: number;
} | null>;
export declare function deleteUserAddressService(userId: number, addressId: number): Promise<{
    address: string;
    createdAt: Date;
    id: number;
} | null>;
//# sourceMappingURL=users.servies.d.ts.map