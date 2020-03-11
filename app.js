const mysql = require('mysql');
const inquirer = require('inquirer');

// Connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "Wm319660",
    database: "company_db"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    runManager();
  });