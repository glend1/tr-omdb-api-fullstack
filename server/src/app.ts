import express from "express";
import { router } from "./route/routes";

export const app = express();

app.use(express.json());
app.use("/api/v1", router);
