import express from "express";
import { items } from "../data/items.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(items);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }
  res.json(item);
});

export default router;
