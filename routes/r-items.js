import express from "express";
import { items } from "../data/items.js";
import idValidation from "../middleware/idValidation.js";

const router = express.Router();

// Base endpoing GET request with query params
// http://localhost:3000/items?quality=rare&type=equipment&playerId=2&minValue=10&maxValue=100&sort=asc
router.get("/", (req, res) => {
  let filteredItems = items;

  const { quality, type, playerId, minValue, maxValue, sort } = req.query;

  // http://localhost:3000/items?quality=rare
  if (quality) {
    filteredItems = filteredItems.filter(
      (i) => i.quality.toLowerCase() === quality.toLowerCase()
    );
  }

  // http://localhost:3000/items?type=consumable
  if (type) {
    filteredItems = filteredItems.filter(
      (i) => i.type.toLowerCase() === type.toLowerCase()
    );
  }

  // http://localhost:3000/items?playerId=1
  if (playerId) {
    const numPlayerId = Number(playerId);
    if (!Number.isInteger(numPlayerId) || numPlayerId <= 0) {
      return res
        .status(400)
        .json({ error: "playerId must be a positive integer" });
    }
    filteredItems = filteredItems.filter(
      (item) => item.playerId === numPlayerId
    );
  }

  // http://localhost:3000/items?minValue=100
  if (minValue) {
    let numMin = Number(minValue);
    if (!Number.isInteger(numMin) || numMin <= 0) {
      return res
        .status(400)
        .json({ error: "minValue must be a positive integer" });
    }
    filteredItems = filteredItems.filter((i) => i.value >= numMin);
  }

  // http://localhost:3000/items?maxValue=12
  if (maxValue) {
    let numMax = Number(maxValue);
    if (!Number.isInteger(numMax) || numMax <= 0) {
      return res
        .status(400)
        .json({ error: "minValue must be a positive integer" });
    }
    filteredItems = filteredItems.filter((i) => i.value <= numMax);
  }

  // http://localhost:3000/items?minValue=5&maxValue=100&sort=asc
  if (sort === "asc") filteredItems.sort((a, b) => a.value - b.value);
  // http://localhost:3000/items?minValue=5&maxValue=100&sort=desc
  if (sort === "desc") filteredItems.sort((a, b) => b.value - a.value);

  // Render the page
  res.render("items", { items: filteredItems });
});

// GET request with id param
router.get("/:id", idValidation, (req, res) => {
  const id = req.validId;
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
router.put("/:id", idValidation, (req, res) => {
  // URL: http://localhost:3000/items/1
  // Sample body for PUT request: { "name": "Poo-poo Hat", "quality": "common", "type": "equipment", "value": 10, "playerId": 1 }
  const id = req.validId;
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
router.patch("/:id", idValidation, (req, res) => {
  // URL: http://localhost:3000/items/1
  // Sample body for PUT request: { "name": "Wolf Mask", "quality": "rare", "type": "equipment", "value": 20, "playerId": 1 }
  const id = req.validId;
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
router.delete("/:id", idValidation, (req, res) => {
  const id = req.validId;
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
