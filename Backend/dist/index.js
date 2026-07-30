import Express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
const app = Express();
const PORT = process.env.PORT || 3000;
app.use(Express.json());
app.use(cookieParser());
async function startServer() {
    await connectDB();
    app.use("/api/auth", authRoutes);
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
}
startServer();
//# sourceMappingURL=index.js.map