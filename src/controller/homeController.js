import { json } from 'body-parser';
import pool from '../configs/connectDB'

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

  console.log('>>> check rows: ', rows)

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

module.exports = {
  getHomepage, getDetailPage, createNewUser, deleteUser, editUser, updateUser
};

