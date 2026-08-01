import jwt from "jsonwebtoken";
export const generateAccessToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET, {
        expiresIn: "15m",
    });
};
export const verifyAccessToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};
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
//# sourceMappingURL=jwt.js.map