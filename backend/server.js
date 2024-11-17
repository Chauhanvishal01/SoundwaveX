import express from "express";
import { config } from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";

import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import albumRoutes from "./routes/album.routes.js";
import songRoutes from "./routes/songs.routes.js";
import statsRoutes from "./routes/stats.routes.js";
import { ConnectDb } from "./Database/DbConnection.js";
config();
const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();
app.use(express.json());

//add auth to req obj
app.use(clerkMiddleware());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, //10MB
    },
  })
);

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

//error middleware
app.use((err, req, res, next) => {
  res
    .status(500)
    .json({
      message:
        process.env.NODE_ENV === "production"
          ? "Internal Server Error"
          : err.message,
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  ConnectDb();
});
