import express from "express";
import homeController from "../controller/homeController";
import multer from 'multer'
import path from 'path'
var appRoot = require('app-root-path');
let router = express.Router(); //giúp định nghĩa, express hiểu rằng đang khai báo 1 route (đường link trên web)

// thư viện multer trong express nó được xem như là 1 middleware
// Nên nó sẽ xử lý trước khi chuyển qua controller
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    console.log('>>> check approots: ', appRoot)
      cb(null, appRoot + '/src/public/image/');
  },

  // By default, multer removes file extensions so let's add them back
  filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const imageFilter = function(req, file, cb) {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
      req.fileValidationError = 'Only image files are allowed!';
      return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

let upload = multer({ storage: storage, fileFilter: imageFilter });

const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);

  router.get("/detail/user/:id", homeController.getDetailPage)  // :userId truyền giá trị của userId đã lấy từ url ở trang home tới trang detail
  //đoạn sau dấu : chính là tên đặt trong object, sử dụng /:params chính là tham số truyền vào thông qua url
  router.post("/create-new-user", homeController.createNewUser)
  router.post("/delete-user", homeController.deleteUser);
  router.get("/edit-user/:id", homeController.editUser);
  router.post('/update-user', homeController.updateUser)
  router.get('/upload', homeController.uploadFilePage)
  router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile)

  return app.use("/", router); //tham số đầu tiên chính là tiền tố trước route VD /about or /abc/about
};

export default initWebRoute;
