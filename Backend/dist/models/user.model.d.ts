import { Prisma } from "../generated/prisma/client.js";
export declare function createUser(data: Prisma.UserCreateInput): Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}>;
export declare function updateUser(id: number, data: Prisma.UserUpdateInput): Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}>;
export declare function findByEmailUser(email: string): Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
} | null>;
export declare function findByIdUser(args: Prisma.UserFindUniqueArgs): Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
} | null>;
export declare function deleteUser(id: number): Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}>;
//# sourceMappingURL=user.model.d.ts.map