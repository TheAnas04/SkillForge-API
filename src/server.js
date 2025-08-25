import express from "express";
import { config } from "./config/env.js";
import { requestIdMiddleware, requestLogger } from "./middleware/requestLogger.js";
import { logger } from "./lib/logger.js";

const app = express();

app.use(express.json());
app.use(requestIdMiddleware);
app.use(requestLogger);

app.get("/health", (req, res) => {
  logger.info('health check');
  res.status(200).json({message: "ok"});
});

app.listen(config.PORT, ()=>{
  console.log("SkillForge API started...");
});