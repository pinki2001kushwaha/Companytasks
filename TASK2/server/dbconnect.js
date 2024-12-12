const mysql = require('mysql2');


const pool = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: 3306,
  password: "",
  database: "notes"
});


pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  }
});
module.exports=pool
