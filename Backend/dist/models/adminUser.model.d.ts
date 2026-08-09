import { Prisma } from "../generated/prisma/client.js";
export declare function createAdmin(data: Prisma.AdminUserCreateInput): Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number | null;
    createdAt: Date;
}>;
export declare function updateAdmin(id: number, data: Prisma.AdminUserUpdateInput): Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number | null;
    createdAt: Date;
}>;
export declare function findByEmailAdmin(args: Prisma.AdminUserFindUniqueArgs): Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number | null;
    createdAt: Date;
} | null>;
export declare function findAdminById<T extends Prisma.AdminUserFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.AdminUserFindUniqueArgs>): Promise<import("@prisma/client/runtime/client").GetFindResult<Prisma.$AdminUserPayload<import("@prisma/client/runtime/client").DefaultArgs>, T, {
    omit: Prisma.GlobalOmitConfig | undefined;
}> | null>;
export declare function deleteAdmin(id: number): Promise<{
    id: number;
    name: string;
    email: string;
    password: string;
    roleId: number | null;
    createdAt: Date;
}>;
//# sourceMappingURL=adminUser.model.d.ts.map