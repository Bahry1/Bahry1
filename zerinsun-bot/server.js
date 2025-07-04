const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("ZerinSunBot is running ☀️");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🟢 Express server is running on port ${PORT}`);
});
