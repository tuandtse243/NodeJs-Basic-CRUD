import { json } from 'body-parser';
import pool from '../configs/connectDB';
import multer from 'multer'
import path from 'path'

let getHomepage = async (req, res) => {
  // simple query
  // let data = [];
  // connection.query("SELECT * FROM `users` ", 
  // function (err, results, fields) {
  //   console.log(results); // results contains rows returned by server
  //   results.map((row) => {
  //     data.push({
  //       id: row.id,
  //       email: row.email,
  //       address: row.address,
  //       firstName: row.firstName,
  //       lastName: row.lastName
  //     })
  //   });
  //   // return res.render("index.ejs", {dataUser: data});  //tham số đầu tiên là màn hình chúng ta muốn render ra, tham số thứ 2 chính là 1 object chứa data muốn truyền vào view đó
  // });

  const [rows, fields] = await pool.execute('SELECT * FROM users')  //query data dưới database và hàm này trả ra 1 mảng có 2 giá trị là rows và fields nên khi ta viết [rows, fields] sẽ lấy ra đúng 2 giá trị đó
  return res.render("index.ejs", {dataUser: rows});  //tham số đầu tiên là màn hình chúng ta muốn render ra, tham số thứ 2 chính là 1 object chứa data muốn truyền vào view đó
};

let getDetailPage = async (req, res) => {
  let id = req.params.id;
  let user = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);

  // console.log("Check req params: ", user[0])  //req.params trả ra 1 object chứa những tham số đã truyền trên url mà key của nó chính lấy từ sau dấu :
  return res.send(JSON.stringify(user[0])) // lúc execute thì nó sẽ đá ra 2 tham số [rows, fields] ta chỉ lấy giá trị tham số đầu
}

let createNewUser = async (req, res) => {
  console.log('check req: ', req.body)  //giá trị các field trong form sẽ truyền qua body
  let {firstName, lastName, email, address} = req.body;   //destructuring
  await pool.execute("INSERT INTO users(firstName, lastName, email, address) VALUES (?, ?, ?, ?)", [firstName, lastName, email, address])
  
  return res.redirect('/')  //trở về trang HOME
  
}

let deleteUser = async (req, res) => {
  let userId = req.body.userId;
  await pool.execute('DELETE FROM users WHERE id = ?', [userId]);
  return res.redirect('/');
}

let editUser = async (req, res) => {
  let id = req.params.id
  let user = await pool.execute('SELECT * FROM users WHERE id = ?', [id]);  //nó trả ra 1 mảng 2 tham số rows và field, trong đó rows cũng là 1 mảng nữa nên user là mảng 2 chiều

  return res.render('update.ejs', {dataUser: user[0][0]});  // vì thế nên lấy [0][0]
}

let updateUser = async (req, res) => {
  let id = req.body.id;
  let {firstName, lastName, email, address} = req.body;   //destructuring
  await pool.execute('UPDATE users SET firstName=?, lastName=?, email=?, address=? WHERE id=?', [firstName, lastName, email, address, id])

  return res.redirect('/')
}

let uploadFilePage = async (req, res) => {
  return res.render('uploadFile.ejs')
}



const upload = multer().single('profile_pic')  //khai báo này sẽ giúp biết được dùng thằng multer, cần nói cho nó biết 1 cái tên
                                               // bởi vì nó cần xử lý cái req, dựa vào đó để lấy cái tên file

let handleUploadFile = async (req, res) => {
  // 'profile_pic' is the name of our file input field in the HTML form
  console.log(req.file)  //khi dùng multer thì req gửi lên sẽ có 1 tham số lên là file nên ta có thể check xem có gì 
  upload(req, res, function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

      if (req.fileValidationError) {
          return res.send(req.fileValidationError);
      }
      else if (!req.file) {
          return res.send('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
          return res.send(err);
      }
      else if (err) {
          return res.send(err);
      }

      // Display uploaded image for user validation
      res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
  });
}

module.exports = {
  getHomepage, getDetailPage, createNewUser, deleteUser, editUser, 
  updateUser, uploadFilePage, handleUploadFile
};

