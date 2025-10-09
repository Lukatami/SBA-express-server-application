import express from "express";

import logger from "./middleware/logger.js";
import errorHandler from "./middleware/errorHandler.js";

import playersRouter from "./routes/r-players.js";
import itemsRouter from "./routes/r-items.js";
import questsRouter from "./routes/r-quests.js";

const app = express();
const port = 3000;

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware for logging all requests
app.use(logger);

// Routers middleware
app.use("/players", playersRouter);
app.use("/items", itemsRouter);
app.use("/quests", questsRouter);

// Base route to server
app.get("/", (req, res) => {
  res.send(`Nice to see you at http://localhost:${port}!`);
});

// Special route for check errorHandler middleware
app.get("/test-error", (req, res) => {
  throw new Error("Errors handling Tested successfully");
});

// errorHandler after all routes
app.use(errorHandler);

// confirmation of server running
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
