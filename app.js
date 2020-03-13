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
            departments();
            break;

        case 'View roles':
            roles();
            break;

        case 'View employees':
            employees();
            break;

        case 'Add department':
            addDepartment();
            break;

        case 'Add employee':
            addEmployee();
            break;

        case 'Add role':
            addRole();
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

  //Viewing dept. employees and roles from db//

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

   //Adding a department into db//

   function addDepartment() {
    inquirer.prompt(
    {
      type: 'input',
      message: 'Name of new department',
      name: 'department'
    }

    ).then(function(answers){
      con.query("INSERT INTO departments (name) VALUES (?)", [answers.department], function(err, data) {
        if (err) throw err

        console.log("\n" + "New department added: " + answers.department);

        selectionMaker();
      });
    });
  }

   //Adding a new employee into db//

   function addEmployee() {
    inquirer.prompt([{
      type: 'input',
      message: 'Employee first name',
      name: 'firstName'
    },
    {
      type: 'input',
      message: 'Employee last name',
      name: 'lastName'
    },
    {
      type: 'input',
      message: 'Enter role id',
      name: 'roleId'
    },
    {
      type: 'input',
      message: 'Enter manager id',
      name: 'managerId'
    }

  ]).then(function(answers){
    con.query("INSERT INTO employees set ?", {first_name: answers.firstName, last_name: answers.lastName, role_id: answers.roleId, manager_id: answers.managerId}, function(err, data) {
      if (err) throw err;

      console.log("\n" + "New employee added: " + answers.firstName + " " + answers.lastName + "\n");

      selectionMaker();
    });
  })
  }

// Still need to insert into db and update db//