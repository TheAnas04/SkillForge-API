import express from "express";
import { config } from "./config/env.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({message: "ok"});
});

app.listen(config.PORT, ()=>{
  console.log("SkillForge API started...");
});