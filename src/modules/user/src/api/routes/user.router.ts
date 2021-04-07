import express, { Router } from "express";

export const userRouting = (): Router => {
  const router = express.Router();

  router.get("/", (_req, res) => {
    res.json("User module");
  });

  return router;
};
