import express from "express";
import homeController from "../controller/homeController";

let router = express.Router(); //giúp định nghĩa, express hiểu rằng đang khai báo 1 route (đường link trên web)

const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);

  router.get("/detail/user/:id", homeController.getDetailPage)  // :userId truyền giá trị của userId đã lấy từ url ở trang home tới trang detail
  //đoạn sau dấu : chính là tên đặt trong object, sử dụng /:params chính là tham số truyền vào thông qua url
  router.post("/create-new-user", homeController.createNewUser)
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:id", homeController.editUser);
  router.post('/update-user', homeController.updateUser)
  router.get("/about", (req, res) => {
    res.render(`I'm Tuan!`);
  });

  return app.use("/", router); //tham số đầu tiên chính là tiền tố trước route VD /about or /abc/about
};

export default initWebRoute;
