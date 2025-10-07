import express from "express";
import playersRouter from "./routes/players.js";

import { items } from "./data/items.js";
import { quests } from "./data/quests.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/players", playersRouter);

app.get("/", (req, res) => {
  res.status(200);
  res.send("You are Welcome!");
});

app.get("/items", (req, res) => {
  res.json(items);
});

app.get("/quests", (req, res) => {
  res.json(quests);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
