import express from "express";
import cors from "express";
import authRoutes from "./auth/infrastructure/routes/auth.routes";
import productRoutes from "./products/infrastructure/routes/products.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);

export default app;