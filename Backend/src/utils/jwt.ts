import jwt from "jsonwebtoken";

export const generateAccessToken = (
  id: number,
  email: string,
  role?: string
): string => {
  return jwt.sign(
    {
      id,
      email,
      role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "15m",
    }
  );
};

export const generateRefreshToken = (id: number): string => {
  return jwt.sign(
    {
      id,
    },
    process.env.JWT_REFRESH_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_SECRET as string
  );
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET as string
  );
};