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
      }).then(function(response){
    
        switch (response.action) {
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

    ).then(function(response){
      con.query("INSERT INTO departments (name) VALUES (?)", [response.department], function(err, data) {
        if (err) throw err

        console.log("\n" + "New department added: " + response.department);

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

  ]).then(function(response){
    con.query("INSERT INTO employees set ?", {first_name: response.firstName, last_name: response.lastName, role_id: response.roleId, manager_id: response.managerId}, function(err, data) {
      if (err) throw err;

      console.log("\n" + "New employee added: " + response.firstName + " " + response.lastName + "\n");

      selectionMaker();
    });
  })
  }
 
  //Adding role into db//

  function addRole() {
    inquirer.prompt([
      {
        type: 'input',
        message: 'Enter new role name',
        name: 'role'
      },

      {
        type: 'input',
        message: 'Enter new role salary',
        name: 'salary'
      },

      {
        type: 'input',
        message: 'enter new role department id',
        name: 'department_id'
      },

      ]).then(function(response){
        con.query("INSERT INTO roles set ?", {title: response.role, salary: response.salary, department_id: response.department_id}, function(err, data) {
          if (err) throw err

          console.log("\n" + "New role added: " + response.role);

          selectionMaker();
        });
      });
  }

  //Update into db//
  function updateDepartment() {
    con.query("SELECT * FROM  departments", function(err, data) {
      if (err) throw err;

      let choices = [];

      for (i = 0; i < data.length; i++) {
        choices.push({name: `${data[i].name}`, value: `${data[i].name}`});

      }

      inquirer.prompt(
        [
        {
          type: 'list',
          message: 'Select department to update',
          choices: choices,
          name: 'department'
        }
        ]

        ).then(function(response){
         var deptUpdate = response.department;

         inquirer.prompt(
            {
              type: 'input',
              message: 'New department name',
              name: 'newName'
            }

         ).then(function(response) {
          var newName = response.newName;
          con.query("UPDATE departments SET ? WHERE ?",
            [
              {
                name: newName
              },
              {
                name: deptUpdate
              }
            ]
          );

          console.log("\n" + "Department is now " + newName + "\n");

          selectionMaker();
         });
        });
    });
  }

  function updateRole() {
    con.query("SELECT * FROM roles", function(err, data) {
      if (err) throw err;

      let choices = [];

      for (i = 0; i < data.length; i ++) {
        choices.push({name: `${data[i].title}`, value: data[i].title});
      }

      inquirer.prompt({
        type: 'list',
        message: 'Select role to update?',
        choices: choices,
        name: 'role'
      }).then(function(response){
        choices = [];
        var roleUpdate = response.role;
        inquirer.prompt(
        [{
          type: 'input',
          message: 'Enter updated role title',
          name: 'title'
        },
        {
          type: 'input',
          message: 'Enter updated salary',
          name: 'salary'
        }
      ])
      .then(function(response) {
        var updatedTitle = response.title;

        var updatedSalary = response.salary;

        con.query("UPDATE roles SET ? WHERE ?", 
        [
          {
            title: updatedTitle,
            salary: updatedSalary
          },
          {
            title: roleUpdate
          }
        ]
        );

        console.log('\n'+'Role is now ' + roleUpdate + '\n');

        selectionMaker();
        });
    });
  });
}