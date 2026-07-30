import jwt from "jsonwebtoken";
export const generateAccessToken = (id, email, role) => {
    return jwt.sign({
        id,
        email,
        role,
    }, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
};
export const generateRefreshToken = (id) => {
    return jwt.sign({
        id,
    }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
export const verifyRefreshToken = (token) => {
    return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
};
//# sourceMappingURL=jwt.js.map