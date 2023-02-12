const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoute = require("./routes/uploadRoute");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const morgan = require("morgan");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoute);
app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 4200;

app.listen(
  port,
  console.log(`server running in ${process.env.NODE_ENV} mode on port ${port}`)
);
