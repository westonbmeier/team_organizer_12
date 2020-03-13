const mysql = require('mysql');
const inquirer = require('inquirer');

// Connection
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: "MYSQL_PASSWORD",
    database: "company_db"
  });
  
  con.connect(function(err) {
    if (err) throw err;

    console.log("Connected!");

    selectionMaker();
  });

  con.connect(function(err) {
    if (err) throw err;

    console.log("Connected!");

    selectionMaker();
  });

  //Main Menu//
  function selectionMaker() {
      inquirer.prompt({
          type: 'list',
          message: 'What would you like to do?',
          name: 'action',
          choices: ['View departments', 'View roles', 'View employees', 'Add department', 'Add role', 'Add employee','Update a role', 'Update a department', 'Exit']
      }).then(function(answer){
    
        switch (answer.action) {
        case 'View departments':
            viewDepartments();
            break;

        case 'View roles':
            viewRoles();
            break;

        case 'View employees':
            viewEmployees();
            break;

        case 'Add department':
            addDepartment();
            break;

        case 'Add role':
            addRole();
            break;

        case 'Add employee':
            addEmployee();
            break;

        case 'Update a role':
            updateRole()
            break;

        case 'Update a department':
          updateDepartment()
          break;
          
        case 'Exit':
            con.end();
            break;
        }
      });
  }

  function departments() {
    var query = "SELECT * FROM DEPARTMENTS";

      con.query(query, function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
        console.log("\n" + "|| Name: " + res[i].name + "|| ID: " + res[i].id);
      }
      selectionMaker();
    });
  }

  function employees() {
    var query = "SELECT CONCAT(employees.first_name, ' ', employees.last_name) as employee_name, roles.title, departments.name, employees.id FROM employees LEFT JOIN roles on employees.role_id = roles.id LEFT JOIN departments ON departments.id = roles.department_id ";
      con.query(query, function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
          console.log("\n" + "|| Employee: " + res[i].employee_name + "|| Title: " + res[i].title + "|| Department: " + res[i].name + "|| ID: " + res[i].id);
      }
      selectionMaker();
    });
  }

  function roles() {
    var query = "SELECT * FROM ROLES";

      con.query(query, function(err, res) {
        if (err) throw err;

        for (var i = 0; i < res.length; i++) {
          console.log("\n" + "|| Role: " + res[i].title);
      }
      selectionMaker();
    });
  }
