import express from "express";
import { players } from "../data/players.js";
import idValidation from "../middleware/idValidation.js";

const router = express.Router();

// Base endpoing GET request
router.get("/", (req, res) => {
  res.json(players);
});

// GET request with id param
router.get("/:id", idValidation, (req, res) => {
  const id = req.validId;
  const player = players.find((p) => p.id === id);
  if (!player) {
    return res.status(404).json({ error: "Player not found" });
  }
  res.json(player);
});

// POST request - add new object
router.post("/", (req, res) => {
  // URL: http://localhost:3000/players
  // Sample body for POST request: { "name": "TestName", "class": "TestClass" }

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

// PUT request - replace all object data
router.put("/:id", idValidation, (req, res) => {
  // URL: http://localhost:3000/players/1
  // Sample body for PUT request: { "name": "Bob's brother", "class": "The Builder", "level": "13"}
  const id = req.validId;
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

// PATCH request - replace all or part of object data
router.patch("/:id", idValidation, (req, res) => {
  // URL: http://localhost:3000/players/1
  // Sample body for PATCH request: { "name": "Bilbo Baggins", "class": "Hobbit", "level": "10"}
  const id = req.validId;
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

// DELETE request - delete object with id param
router.delete("/:id", idValidation, (req, res) => {
  const id = req.validId;
  const index = players.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Player not found" });
  }

  const deletedPlayer = players.splice(index, 1)[0];

  res.json({
    message: "Player Deleted Successfully",
    player: deletedPlayer,
  });
});

export default router;
