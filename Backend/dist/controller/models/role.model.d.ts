import { Prisma } from "../../generated/prisma/client.js";
export declare function createRole(data: Prisma.RoleCreateInput): Promise<{
    id: number;
    name: string;
}>;
export declare function updateRole(id: number, data: Prisma.RoleUpdateInput): Promise<{
    id: number;
    name: string;
}>;
export declare function findByIdRole(id: number): Promise<{
    id: number;
    name: string;
} | null>;
export declare function findByNameRole(name: string): Promise<{
    id: number;
    name: string;
} | null>;
export declare function deleteRole(id: number): Promise<{
    id: number;
    name: string;
}>;
//# sourceMappingURL=role.model.d.ts.map