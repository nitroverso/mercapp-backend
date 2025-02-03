import authRoutes from "./auth/infrastructure/routes/auth.routes";
import productRoutes from "./products/infrastructure/routes/products.routes";
import categoryRoutes from "./categories/infrastructure/routes/categories.routes";
import eventsRoutes from "./events/infrastructure/routes/events.routes";
import specs from "./swagger/swagger";

const swaggerUi = require("swagger-ui-express");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

//Swagger Documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/events", eventsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
