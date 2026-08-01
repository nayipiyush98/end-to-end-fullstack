import rateLimit from "express-rate-limit";
export const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 8,
    message: "Too many attempts. Please try again after 15 minutes.",
    standardHeaders: true,
    legacyHeaders: true,
    skipSuccessfulRequests: true
});
//# sourceMappingURL=rateLimiter.js.map