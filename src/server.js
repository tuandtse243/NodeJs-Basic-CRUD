import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./rounte/web";
// import connection from './configs/connectDB';

require("dotenv").config();

const app = express(); //app là biến chứ express
const port = process.env.PORT || 8080; //nếu như undefine thì nó sẽ lấy 300 (cách check nếu như biến bị undefine)

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
