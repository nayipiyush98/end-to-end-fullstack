import { prisma } from "../config/db.js";
import { AdminLoginValidation, AdminValidation, UserLoginValidation, UserValidation, } from "../zod/UserZod.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken, } from "../utils/jwt.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { getRefreshToken } from "../utils/auth.js";
import { maxSize } from "zod";
export async function UserRegister(req, res) {
    try {
        const User = UserValidation.parse(req.body);
        const hashedpassword = await hashPassword(User.password);
        const newUser = await prisma.user.create({
            data: {
                name: User.name,
                email: User.email,
                password: hashedpassword,
            },
        });
        res.status(200).json(newUser);
    }
    catch (error) {
        res.status(500).json({
            message: "Something went wrong",
        });
    }
}
export async function AdminRegister(req, res) {
    try {
        const Admin = AdminValidation.parse(req.body);
        const existAdmin = await prisma.role.findUnique({
            where: {
                name: Admin.name,
            },
        });
        const hashedpassword = await hashPassword(Admin.password);
        const NewAdmin = await prisma.adminUser.create({
            data: {
                name: Admin.name,
                email: Admin.email,
                password: hashedpassword,
                roleId: existAdmin ? existAdmin.id : null,
            },
        });
        res.send(NewAdmin);
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error
                ? error?.message
                : "Something went wrong while admin user register",
        });
    }
}
export async function AdminLogin(req, res) {
    try {
        const Admin = AdminLoginValidation.parse(req.body);
        const existAdmin = await prisma.adminUser.findUnique({
            where: {
                email: Admin.email,
            },
            include: {
                role: true,
            },
        });
        if (!existAdmin) {
            res.send("invalid credential");
            return;
        }
        const isPasswordMatch = await comparePassword(Admin.password, existAdmin.password);
        if (!isPasswordMatch) {
            res.status(401).json({
                message: "Invalid email or password",
            });
            return;
        }
        const accessToken = generateAccessToken(existAdmin.id, existAdmin.email, existAdmin.role?.name);
        const refreshToken = generateRefreshToken(existAdmin.id);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "Admin login successful",
            accessToken,
            admin: {
                id: existAdmin.id,
                name: existAdmin.name,
                email: existAdmin.email,
                role: existAdmin.role?.name,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error
                ? error?.message
                : "Something went wrong while admin user login",
        });
    }
}
export async function UserLogin(req, res) {
    try {
        const User = UserLoginValidation.parse(req.body);
        const existUser = await prisma.user.findUnique({
            where: {
                email: User.email,
            },
        });
        if (!existUser) {
            res.status(401).json({
                message: "Invalid email or password",
            });
            return;
        }
        const isPasswordMatch = await comparePassword(User.password, existUser.password);
        if (!isPasswordMatch) {
            res.status(401).json({
                message: "Invalid email or password",
            });
            return;
        }
        const accessToken = generateAccessToken(existUser.id, existUser.email);
        const refreshToken = generateRefreshToken(existUser.id);
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "User login successful",
            accessToken,
            User: {
                id: existUser.id,
                name: existUser.name,
                email: existUser.email,
            },
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error
                ? error?.message
                : "Something went wrong while user login",
        });
    }
}
export async function UserRefreshToken(req, res) {
    try {
        const { id } = getRefreshToken(req.cookies.refreshToken);
        const User = await prisma.user.findUnique({
            where: { id },
        });
        if (!User) {
            res.status(401).json({ message: "User not found" });
            return;
        }
        const accessToken = generateAccessToken(User.id, User.email);
        res.json({
            message: "Access token refreshed successfully",
            accessToken,
        });
    }
    catch (error) {
        res.status(401).json({
            message: error instanceof Error
                ? error?.message
                : "Something went wrong while user refreshing token",
        });
    }
}
export async function UserLogOut(req, res) {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        res.status(200).json({
            message: "User logout successfully",
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "Something went wrong",
        });
    }
}
export async function UserProfile(req, res) {
    try {
        const User = req.user;
        if (!User) {
            res.status(401).json({
                message: "unauthorized",
            });
        }
        const UserProfile = await prisma.user.findUnique({
            where: {
                id: req.user.id,
            },
            omit: {
                password: true,
            },
        });
        if (!UserProfile) {
            res.status(404).json({
                message: "User not found",
            });
        }
        res.status(200).json({
            message: "User Profile is founnd",
            UserProfile,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error
                ? error?.message
                : "Something went wrong while fetching user profile",
        });
    }
}
export async function UserForgetPassword(req, res) {
    try {
        const Email = req.body;
        const User = await prisma.user.findUnique({
            where: Email,
        });
        if (!User) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        const token = generateAccessToken(User.id, User.email);
        res.status(200).send({
            message: "OTP is 394585",
            Token: token,
        });
    }
    catch (error) {
        res.status(500).json({
            message: error instanceof Error
                ? error?.message
                : "Something went wrong while forgeting password",
        });
    }
}
export async function UserResetPassword(req, res) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                message: "Reset token required",
            });
            return;
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                message: "Invalid reset token",
            });
            return;
        }
        const decoded = verifyAccessToken(token);
        const User = await prisma.user.findUnique({
            where: {
                id: decoded.id,
            },
        });
        if (!User) {
            res.status(404).json({
                message: "User not found",
            });
            return;
        }
        const { password } = req.body;
        const hashedpassword = await hashPassword(password);
        await prisma.user.update({
            where: {
                id: decoded.id,
            },
            data: {
                password: hashedpassword,
            },
        });
        res.status(200).json({
            message: "Password reset successfully",
        });
    }
    catch (error) {
        res.status(401).json({
            message: error instanceof Error
                ? error.message
                : "Invalid or expired reset token",
        });
    }
}
export async function UserChangePassword(req, res) {
    try {
        if (!req.user) {
            res.status(401).json({
                message: "Unauthorised",
            });
            return;
        }
        const { oldpassword, newpassword } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                id: req.user?.id,
            },
        });
        if (!user) {
            res.status(401).json({
                message: "User not found",
            });
            return;
        }
        const IsMatch = await comparePassword(oldpassword, user.password);
        if (!IsMatch) {
            res.status(401).json({
                message: "old password is invalid",
            });
        }
        console.log(req.body);
        console.log(newpassword);
        const hashedpassword = await hashPassword(newpassword);
        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: hashedpassword,
            },
        });
        res.status(200).json({
            message: "Successfully password changed",
        });
    }
    catch (error) {
        res.status(401).json({
            message: error instanceof Error
                ? error.message
                : "Invalid or expired reset token",
        });
    }
}
//# sourceMappingURL=auth.controller.js.map