import express from "express";

const configViewEngine = (app) => {
  //cấu hình express
  app.set("view engine", "ejs"); // cấu hình view engine của express là ejs
  app.set("views", "./src/views"); //cấu hình tất cả màn hình ở trong thư mục views để express vô đây tìm
};

export default configViewEngine;
