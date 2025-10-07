import express from "express";
import { players } from "../data/players.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(players);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const player = players.find((p) => p.id === id);
  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }
  res.json(player);
});

export default router;
