import jwt from "jsonwebtoken";
export function generateAdminAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
}
export function generateAdminRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
}
export function generateUserAccessToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
}
export function generateUserRefreshToken(payload) {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d",
    });
}
export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
export function verifyUserRefreshToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return decoded.id;
}
export function verifyAdminRefreshToken(token) {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    return decoded.id;
}
export function verifyAccessTokenAndGetUser(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({
            message: "Access token required",
        });
        return;
    }
    const token = authHeader.split(" ")[1];
    try {
        if (!token) {
            res.status(401).json({
                message: "Invalid access token",
            });
            return;
        }
        const decoded = verifyAccessToken(token);
        req.user = decoded;
        next();
    }
    catch {
        res.status(401).json({
            message: "Invalid or expired token",
        });
    }
}
//# sourceMappingURL=verifyToken.js.map