import z, { string } from "zod"

export const UserValidation = z.object({
    name:z.string().min(3,"Name should be 3").max(15),
    email:z.email(),
    password:z.string().min(8).max(20)
})

export const AdminValidation = z.object({
    name:z.string().min(3,"Name should be 3").max(15),
    email:z.email(),
    password:z.string().min(8).max(20),
    roleId:z.int().nullable()
})

export const AdminLoginValidation = z.object({
    email:z.email(),
    password:z.string().min(8).max(20)
})

export const UserLoginValidation = z.object({
    email:z.email(),
    password:z.string().min(8).max(20)
})

export const UserResetPassword = z.object({
    password:z.string()
})