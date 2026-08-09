import type { Request, Response } from "express";
import {
  AdminLoginValidation,
  AdminValidation,
  UserLoginValidation,
  UserValidation,
} from "../zod/UserZod.js";
import {
  generateAdminAccessToken,
  generateAdminRefreshToken,
  generateUserAccessToken,
  generateUserRefreshToken,
  verifyAccessToken,
  verifyAdminRefreshToken,
  verifyUserRefreshToken,
} from "../middleware/verifyToken.js";
import { hashPassword, comparePassword } from "../utils/password.js";
import { Prisma } from "../generated/prisma/client.js";
import {
  createUser,
  findByEmailUser,
  findByIdUser,
  updateUser,
} from "../models/user.model.js";
import { findByNameRole } from "../models/role.model.js";
import {
  createAdmin,
  findByEmailAdmin,
  findAdminById,
} from "../models/adminUser.model.js";

export async function userRegister(req: Request, res: Response): Promise<void> {
  try {
    const user = UserValidation.parse(req.body);

    const hashedpassword = await hashPassword(user.password);

    const newUser = await createUser({
      name: user.name,
      email: user.email,
      password: hashedpassword,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}

export async function adminRegister(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const admin = AdminValidation.parse(req.body);

    const existAdmin = await findByNameRole({
      where: {
        name: admin.name,
      },
    });

    const hashedpassword = await hashPassword(admin.password);

    const NewAdmin = await createAdmin({
      name: admin.name,
      email: admin.email,
      password: hashedpassword,
      ...(existAdmin && {
        role: {
          connect: {
            id: existAdmin.id,
          },
        },
      }),
    });

    res.status(200).json({
      message: "Admin registered successfully",
      data: NewAdmin,
    });
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      res.status(409).json({
        message: "Email already exists.",
      });
      return;
    }
    console.error(error);
    res.status(500).json({
      message: "Something went wrong.",
    });
  }
}

export async function adminLogin(req: Request, res: Response): Promise<void> {
  try {
    const admin = AdminLoginValidation.parse(req.body);

    const existAdmin = await findByEmailAdmin({
      where: {
        email: admin.email,
      },
      include: {
        role: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!existAdmin) {
      res.status(401).json({
        message: "Invalid email or password!",
      });
      return;
    }

    const isPasswordMatch = await comparePassword(
      admin.password,
      existAdmin.password,
    );

    if (!isPasswordMatch) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const accessToken = generateAdminAccessToken(existAdmin);

    const refreshToken = generateAdminRefreshToken({ id: existAdmin.id });

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
      },
    });
  } catch (error: unknown) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error?.message
          : "Something went wrong while admin user login",
    });
  }
}

export async function userLogin(req: Request, res: Response): Promise<void> {
  try {
    const user = UserLoginValidation.parse(req.body);

    const existUser = await findByEmailUser(user.email);

    if (!existUser) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const isPasswordMatch = await comparePassword(
      user.password,
      existUser.password,
    );

    if (!isPasswordMatch) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    const accessToken = generateUserAccessToken(existUser);

    const refreshToken = generateUserRefreshToken({ id: existUser.id });

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
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error?.message
          : "Something went wrong while user login",
    });
  }
}

export async function userRefreshToken(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const id = verifyUserRefreshToken(req.cookies.refreshToken);

    const user = await findByIdUser({
      where: {
        id,
      },
    });

    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    const accessToken = generateUserAccessToken(user);

    res.json({
      message: "Access token refreshed successfully",
      accessToken,
    });
  } catch (error) {
    res.status(401).json({
      message:
        error instanceof Error
          ? error?.message
          : "Something went wrong while user refreshing token",
    });
  }
}

export async function userLogOut(req: Request, res: Response): Promise<void> {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({
      message: "User logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}

export async function userProfile(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user;

    if (!user) {
      res.status(401).json({
        message: "unauthorized",
      });
    }

    const userProfile = await findByIdUser({
      where: {
        id: req.user!.id,
      },
      omit: {
        password: true,
      },
    });

    if (!userProfile) {
      res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User Profile is founnd",
      userProfile,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error?.message
          : "Something went wrong while fetching user profile",
    });
  }
}

export async function userForgetPassword(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const Email = req.body;

    const user = await findByEmailUser(Email);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const token = generateUserAccessToken(user);

    res.status(200).send({
      message: "OTP is 394585",
      Token: token,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error?.message
          : "Something went wrong while forgeting password",
    });
  }
}

export async function userResetPassword(
  req: Request,
  res: Response,
): Promise<void> {
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

    const decoded = verifyAccessToken(token) as {
      id: number;
      email: string;
    };

    const user = await findByIdUser({
      where: {
        id: decoded.id,
      },
    });

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
      return;
    }

    const { password } = req.body;

    const hashedpassword = await hashPassword(password);

    await updateUser(decoded.id, {
      password: hashedpassword,
    });

    res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    res.status(401).json({
      message:
        error instanceof Error
          ? error.message
          : "Invalid or expired reset token",
    });
  }
}

export async function userChangePassword(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Unauthorised",
      });
      return;
    }

    const user = req.user;

    const { oldpassword, newpassword } = req.body;

    const existUser = await findByIdUser({
      where: {
        id: user.id,
      },
    });

    if (!existUser) {
      res.status(401).json({
        message: "User not found",
      });
      return;
    }

    const IsMatch = await comparePassword(oldpassword, existUser.password);

    if (!IsMatch) {
      res.status(401).json({
        message: "old password is invalid",
      });
    }

    const hashedpassword = await hashPassword(newpassword);

    await updateUser(user.id, {
      password: hashedpassword,
    });

    res.status(200).json({
      message: "Successfully password changed",
    });
  } catch (error) {
    res.status(401).json({
      message:
        error instanceof Error
          ? error.message
          : "Invalid or expired reset token",
    });
  }
}

export async function adminMe(req: Request, res: Response): Promise<void> {
  try {
    if (!req.user) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }

    const admin = await findAdminById({
      where: {
        id: req.user.id,
      },
      include: {
        role: {
          include: {
            rolePermissions: {
              include: {
                permission: true,
              },
            },
          },
        },
      },
    });

    if (!admin) {
      res.status(404).json({
        message: "Admin not found",
      });
      return;
    }

    res.status(200).json({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role?.name ?? null,
      permissions:
        admin.role?.rolePermissions.map((rp) => rp.permission.name) ?? [],
    });
  } catch (error) {
    res.status(500).json({
      message:
        error instanceof Error
          ? error?.message
          : "Internal server error while fetching admin profile",
    });
  }
}

export async function adminRefreshToken(
  req: Request,
  res: Response,
): Promise<void> {
  try {
     console.log("=== ADMIN REFRESH ===");
    console.log("Cookies:", req.cookies);

    const refreshToken = req.cookies.refreshToken;

    console.log("Refresh token:", refreshToken);

    if (!refreshToken) {
      res.status(401).json({
        message: "Refresh token required",
      });
      return;
    }

      const adminId = verifyAdminRefreshToken(refreshToken);

        console.log("Admin ID:", adminId);

      const admin = await findAdminById({
        where: {
          id: adminId,
        },
      });
      
      if (!admin) {
        res.status(404).json({
          message: "Admin not found",
        });
        return;
      }
      
      const accessToken = generateAdminAccessToken(admin);

        console.log("✅ New access token generated");
      
      res.status(200).json({
        message: "Access token refreshed successfully",
        accessToken,
      });
  } catch (error) {
    res.status(401).json({
      message:
        error instanceof Error
          ? error?.message
          : "Something went wrong while refreshing admin access token",
    });
  }
}
