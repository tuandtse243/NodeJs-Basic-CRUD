import express from "express";
import homeController from "../controller/homeController";

let router = express.Router(); //giúp định nghĩa, express hiểu rằng đang khai báo 1 route (đường link trên web)

const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);

  router.get("/about", (req, res) => {
    res.render(`I'm Tuan!`);
  });

  return app.use("/", router); //tham số đầu tiên chính là tiền tố trước route VD /about or /abc/about
};

export default initWebRoute;
