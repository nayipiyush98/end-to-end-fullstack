import type { Request, Response } from "express";
import { getUsersService } from "../services/users.servies.js"

export async function getUsersController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    if (!req.auth) {
      res.status(401).json({
        message: "Authentication required",
      });
      return;
    }

    if (req.auth.type !== "ADMIN") {
      res.status(403).json({
        message: "Admin access required",
      });
      return;
    }

    const email = typeof req.query.email === "string" ? req.query.email.trim() : undefined

    const users = await getUsersService(email);

    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("GET USERS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
}