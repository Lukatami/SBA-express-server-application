import express from "express";
import { quests } from "../data/quests.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(quests);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const quest = quests.find((p) => p.id === id);
  if (!quest) {
    return res.status(404).json({ error: "Quest not found" });
  }
  res.json(quest);
});

// POST request - add new object
router.post("/", (req, res) => {
  // URL: http://localhost:3000/quests
  // Sample body for POST request: { "title": "Dwemer Puzzle Box", "description": "Follow the path east of Balmora, across the bridge north of Fort Moonmoth", "reward": "Dwemer Axe" }

  const {
    title: questTitle,
    description: questDescription,
    reward: questReward,
    completed: undefined,
    playerId: playerAssigned,
  } = req.body;

  if (!questTitle || !questDescription || !questReward) {
    return res
      .status(400)
      .json({ error: "Title, description and reward required" });
  }

  const newQuest = {
    id: quests.length ? quests[quests.length - 1].id + 1 : 1,
    title: questTitle,
    description: questDescription,
    reward: questReward,
    completed: false,
    playerId: Number(playerAssigned),
  };

  quests.push(newQuest);

  res.status(201).json(newQuest);
});

// PUT request - replace all object data
router.put("/:id", (req, res) => {
  // URL: http://localhost:3000/quests/1
  // Sample body for PUT request: { "title": "Dwemer Puzzle Box", "description": "Follow the path east of Balmora, across the bridge north of Fort Moonmoth", "reward": "Dwemer Axe", "playerId": 1 }
  const id = Number(req.params.id);
  const {
    title: questTitle,
    description: questDescription,
    reward: questReward,
    completed: undefined,
    playerId: playerAssigned,
  } = req.body;

  const quest = quests.find((p) => p.id === id);

  if (!quest) {
    return res.status(404).json({ error: "Quest not found" });
  }

  if (!questTitle || !questDescription || !questReward || !playerAssigned) {
    return res.status(400).json({
      error: "All fields (title, description, reward, playerId) required",
    });
  }

  quest.title = questTitle;
  quest.description = questDescription;
  quest.reward = questReward;
  quest.completed = false;
  quest.playerId = Number(playerAssigned);

  res.json(quest);
});

// PATCH request - replace all or part of object data
router.patch("/:id", (req, res) => {
  // URL: http://localhost:3000/quests/1
  // Sample body for PATCH request: { "title": "Dwemer Puzzle Box", "description": "Follow the path east of Balmora, across the bridge north of Fort Moonmoth", "reward": "Dwemer Axe", "playerId": 1 }
  const id = Number(req.params.id);
  const quest = quests.find((p) => p.id === id);

  if (!quest) {
    return res.status(404).json({ error: "Quest not found" });
  }

  const {
    title: questTitle,
    description: questDescription,
    reward: questReward,
    completed: undefined,
    playerId: playerAssigned,
  } = req.body;

  if (questTitle !== undefined) quest.title = questTitle;
  if (questDescription !== undefined) quest.description = questDescription;
  if (questReward !== undefined) quest.reward = questReward;
  if (quest.completed == true) quest.completed = false;
  if (playerAssigned !== undefined) quest.playerId = Number(playerAssigned);

  res.json(quest);
});

// DELETE request - delete object with id param
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = quests.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Quest not found" });
  }

  const deletedQuest = quests.splice(index, 1)[0];

  res.json({
    message: "Quest Deleted Successfully",
    quest: deletedQuest,
  });
});

export default router;
