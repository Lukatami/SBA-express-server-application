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

// POST request - add new object
router.post("/", (req, res) => {
  // URL: http://localhost:3000/items
  // Sample body for POST request: { "name": "Poo-poo Hat", "quality": "common", "type": "equipment", "value": 10, "playerId": 1 }

  const {
    name: itemName,
    quality: itemQuality,
    type: itemType,
    value: itemValue,
    playerId: ownerId,
  } = req.body;

  if (!itemName || !itemType) {
    return res.status(400).json({ error: "Name and type required" });
  }

  const newItem = {
    id: items.length ? items[items.length - 1].id + 1 : 1,
    name: itemName,
    quality: itemQuality,
    type: itemType,
    value: Number(itemValue),
    playerId: Number(ownerId),
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

// PUT request - replace all object data
router.put("/:id", (req, res) => {
  // URL: http://localhost:3000/items/1
  // Sample body for PUT request: { "name": "Poo-poo Hat", "quality": "common", "type": "equipment", "value": 10, "playerId": 1 }
  const id = Number(req.params.id);
  const {
    name: itemName,
    quality: itemQuality,
    type: itemType,
    value: itemValue,
    playerId: ownerId,
  } = req.body;

  const item = items.find((p) => p.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  if (!itemName || !itemQuality || !itemType || !itemValue || !ownerId) {
    return res.status(400).json({
      error: "All fields (name, quality, type, value, playerId) required",
    });
  }

  item.name = itemName;
  item.quality = itemQuality;
  item.type = itemType;
  item.value = Number(itemValue);
  item.playerId = Number(ownerId);

  res.json(item);
});

// PATCH request - replace all or part of object data
router.patch("/:id", (req, res) => {
  // URL: http://localhost:3000/items/1
  // Sample body for PUT request: { "name": "Wolf Mask", "quality": "rare", "type": "equipment", "value": 20, "playerId": 1 }
  const id = Number(req.params.id);
  const item = items.find((p) => p.id === id);

  if (!item) {
    return res.status(404).json({ error: "Item not found" });
  }

  const {
    name: itemName,
    quality: itemQuality,
    type: itemType,
    value: itemValue,
    playerId: ownerId,
  } = req.body;

  if (itemName !== undefined) item.name = itemName;
  if (itemQuality !== undefined) item.quality = itemQuality;
  if (itemType !== undefined) item.type = itemType;
  if (itemValue !== undefined) item.value = Number(itemValue);
  if (ownerId !== undefined) item.playerId = Number(ownerId);

  res.json(item);
});

// DELETE request - delete object with id param
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Item not found" });
  }

  const deletedItem = items.splice(index, 1)[0];

  res.json({
    message: "Item Deleted Successfully",
    item: deletedItem,
  });
});

export default router;
