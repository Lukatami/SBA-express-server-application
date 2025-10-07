import express from "express";
import playersRouter from "./routes/players.js";
import itemsRouter from "./routes/items.js";
import questsRouter from "./routes/quests.js";

const app = express();
const port = 3000;

app.use(express.json());

app.use("/players", playersRouter);
app.use("/items", itemsRouter);
app.use("/quests", questsRouter);

app.get("/", (req, res) => {
  res.status(200);
  res.send("You are Welcome!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
