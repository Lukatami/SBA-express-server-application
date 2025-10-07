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

router.post("/", (req, res) => {
  const { name: name, class: playerClass, level = 1 } = req.body;

  if (!name || !playerClass) {
    return res.status(400).json({ error: "Name and class required" });
  }

  const newPlayer = {
    id: players.length ? players[players.length - 1].id + 1 : 1,
    name: name,
    class: playerClass,
    level,
  };

  players.push(newPlayer);

  res.status(201).json(newPlayer);
});

export default router;
