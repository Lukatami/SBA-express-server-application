import express from "express";
import logger from "./middleware/logger.js";
import playersRouter from "./routes/r-players.js";
import itemsRouter from "./routes/r-items.js";
import questsRouter from "./routes/r-quests.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use("/players", playersRouter);
app.use("/items", itemsRouter);
app.use("/quests", questsRouter);

app.get("/", (req, res) => {
  res.send("You are Welcome!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
