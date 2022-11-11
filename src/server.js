import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./rounte/web";
import initAPIRoute from './rounte/api'
// import connection from './configs/connectDB';

require("dotenv").config();
var morgan = require('morgan')

const app = express(); //app là biến chứ express
const port = process.env.PORT || 8080; //nếu như undefine thì nó sẽ lấy 300 (cách check nếu như biến bị undefine)

app.use((req, res, next) => {
  console.log('>>> Run into my middleware')
  console.log(req);
  next();  //hàm này được hỗ trợ trong middleware với công dụng nhảy đến dòng code tiếp theo nếu hợp lệ
})

app.use(morgan('combined'))  //công dụng log ra thông tin của header trong console
app.use(express.urlencoded({extended: true}));  //giản lượt hóa các tham số từ request gửi lên server
app.use(express.json());  //đây là middleware chuyển dữ liệu sang kiểu json cho dễ đọc

configViewEngine(app);
initWebRoute(app);
initAPIRoute(app);

app.use((req, res) => {
    return res.render('404.ejs')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
