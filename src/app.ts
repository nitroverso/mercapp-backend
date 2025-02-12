import express from "express";
import cors from "express";
import authRoutes from "./auth/infrastructure/routes/auth.routes";
import productRoutes from "./products/infrastructure/routes/products.routes";
import categoryRoutes from "./categories/infrastructure/routes/categories.routes";
import eventsRoutes from "./events/infrastructure/routes/events.routes";
import unitRoutes from "./units/infrastructure/routes/unites.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/events", eventsRoutes);
app.use("/units,", unitRoutes);

export default app;
