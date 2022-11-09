const express = require("express");

const app = express();
const port = 8080;

app.get("/", (req, res) => {
  res.send("Hello World! Thanh Tuan here");
});
app.get("/about", (req, res) => {
  res.send(`I'm Tuan!`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
