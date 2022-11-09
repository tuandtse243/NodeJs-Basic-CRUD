import express from "express";
import configViewEngine from "./configs/viewEngine";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8080; //nếu như undefine thì nó sẽ lấy 300 (cách check nếu như biến bị undefine)

configViewEngine(app);

app.get("/", (req, res) => {
  res.render("index.ejs");
});
app.get("/about", (req, res) => {
  res.send(`I'm Tuan!`);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
