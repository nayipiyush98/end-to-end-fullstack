import Express from "express";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/products.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

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

app.use(
  "/images",
  Express.static(
    path.join(process.cwd(), "scripts", "public", "images")
  )
);

async function startServer() {
  await connectDB();
  app.use(`/api/${API_VERSION}/auth`, authRoutes);
  app.use(`/api/${API_VERSION}`,productRoutes)

  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
