import connection from '../configs/connectDB'

let getHomepage = (req, res) => {
  // simple query
  let data = [];
  connection.query("SELECT * FROM `users` ", 
  function (err, results, fields) {
    console.log(results); // results contains rows returned by server
    results.map((row) => {
      data.push({
        id: row.id,
        email: row.email,
        address: row.address,
        firstName: row.firstName,
        lastName: row.lastName
      })
    });
    return res.render("index.ejs", {dataUser: data});  //tham số đầu tiên là màn hình chúng ta muốn render ra, tham số thứ 2 chính là 1 object chứa data muốn truyền vào view đó
  });

};

module.exports = {
  getHomepage,
};
