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
  // Sample body for POST request { "name": "TestName", "class": "TestClass" }

  const { name: playerName, class: className, level: playerLevel } = req.body;

  if (!playerName || !className) {
    return res.status(400).json({ error: "Name and class required" });
  }

  const newPlayer = {
    id: players.length ? players[players.length - 1].id + 1 : 1,
    name: playerName,
    class: className,
    level: Number(playerLevel) ? Number(playerLevel) : 1,
  };

  players.push(newPlayer);

  res.status(201).json(newPlayer);
});

router.put("/:id", (req, res) => {
  // Sample body for PUT request { "name": "Bob's brother", "class": "The Builder", "level": "13"}
  const id = Number(req.params.id);
  const { name: playerName, class: playerClass, level: playerLevel } = req.body;

  const player = players.find((p) => p.id === id);

  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }

  if (!playerName || !playerClass || !playerLevel) {
    return res
      .status(400)
      .json({ error: "All fields (name, class, level) required" });
  }

  player.name = playerName;
  player.class = playerClass;
  player.level = Number(playerLevel);

  res.json(player);
});

router.patch("/:id", (req, res) => {
  // Sample body for PATCH request { "name": "Bilbo Baggins", "class": "Hobbit", "level": "10"}
  const id = Number(req.params.id);
  const player = players.find((p) => p.id === id);

  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }

  const { name: playerName, class: playerClass, level: playerLevel } = req.body;

  if (playerName !== undefined) player.name = playerName;
  if (playerClass !== undefined) player.class = playerClass;
  if (playerLevel !== undefined) player.level = Number(playerLevel);

  res.json(player);
});

export default router;
