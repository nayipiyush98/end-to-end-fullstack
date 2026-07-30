import Express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = Express();
const PORT = process.env.PORT || 3000;
const API_VERSION = process.env.API_VERSION || 'v1';

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(Express.json());
app.use(cookieParser());

async function startServer() {
  await connectDB();
  app.use(`/api/${API_VERSION}/auth`, authRoutes);

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
