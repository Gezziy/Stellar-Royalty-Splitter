import { Router } from "express";
import { prometheusMetrics } from "../metrics.js";

export const metricsRouter = Router();

metricsRouter.get("/", async (_req, res, next) => {
  try {
    const body = await prometheusMetrics();
    res.type("text/plain; version=0.0.4; charset=utf-8").send(body);
  } catch (error) {
    next(error);
  }
});
