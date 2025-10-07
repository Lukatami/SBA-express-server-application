import express from "express";
import { quests } from "../data/quests.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(quests);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const quest = quests.find((p) => p.id === id);
  if (!quest) {
    return res.status(404).json({ error: "Quest not found" });
  }
  res.json(quest);
});

export default router;
