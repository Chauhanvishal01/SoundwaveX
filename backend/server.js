import express from "express";
import { config } from "dotenv";
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

app.use(express.json());

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  ConnectDb();
});
