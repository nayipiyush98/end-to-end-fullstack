import { Prisma } from "../generated/prisma/client.js";
export declare function createRole(data: Prisma.RoleCreateInput): Promise<{
    id: number;
    name: string;
}>;
export declare function updateRole(id: number, data: Prisma.RoleUpdateInput): Promise<{
    id: number;
    name: string;
}>;
export declare function findByIdRole<T extends Prisma.RoleFindUniqueArgs>(args: Prisma.SelectSubset<T, Prisma.RoleFindUniqueArgs>): Promise<import("@prisma/client/runtime/client").GetFindResult<Prisma.$RolePayload<import("@prisma/client/runtime/client").DefaultArgs>, T, {
    omit: Prisma.GlobalOmitConfig | undefined;
}> | null>;
export declare function findByNameRole(args: Prisma.RoleFindUniqueArgs): Promise<{
    id: number;
    name: string;
} | null>;
export declare function deleteRole(id: number): Promise<{
    id: number;
    name: string;
}>;
//# sourceMappingURL=role.model.d.ts.map