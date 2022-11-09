import express from "express";

const configViewEngine = (app) => {
  app.use(express.static("./src/public")); //cấu hình cho file nào có thể được xem từ kết nối ở bên ngoài, tất cả nằm trong folder public
  //cấu hình express
  app.set("view engine", "ejs"); // cấu hình view engine của express là ejs
  app.set("views", "./src/views"); //cấu hình tất cả màn hình ở trong thư mục views để express vô đây tìm
};

export default configViewEngine;
