const express = require("express");
const body = require("body-parser");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

app.get("/", (req, res) => {
    res.status(200);
    res.send("You are Welcome!")
})