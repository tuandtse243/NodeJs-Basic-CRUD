import express from "express";
import APIController from '../controller/APIController'
let router = express.Router(); //giúp định nghĩa, express hiểu rằng đang khai báo 1 route (đường link trên web)

const initAPIRoute = (app) => {
    router.get("/users", APIController.getAllUsers);
    router.post("/create-user", APIController.createNewUser);
    router.put('/update-user/', APIController.updateUser);
    router.delete('/delete-user/:id', APIController.deleteUser);


  return app.use("/api/v1/", router); //tham số đầu tiên chính là tiền tố trước route VD /about or /abc/about
};

export default initAPIRoute;
