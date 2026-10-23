import "dotenv/config";
import express from "express";
import { testConnection } from "./config/database";
import adminRouter from "./routes/user.routes";

const app = express();
const PORT = Number(process.env.PORT);

// Middleware
app.use(express.json());

// Health check
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    status: "success",
    message: "API is running",
  });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({
    status: "error",
    message: "Route introuvable",
  });
});
app.use("/api", adminRouter);



// Start server
async function startServer(): Promise<void> {
  try {
    await testConnection();

    app.listen(PORT, () => {
      console.log(`API disponible sur http://localhost:${PORT}`);
    });
  } catch {
    console.error("Impossible de démarrer le serveur.");
    process.exitCode = 1;
  }
}

void startServer();
export default app;
