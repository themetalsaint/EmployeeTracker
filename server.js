//**TO DO**

//Schema DB with 3 tables

// Use MySQL, Inquirer, Console.Table

//SQL Joins? "You will need to perform a variety of SQL JOINS to complete this assignment, and it's recommended you review the week's activities if you need a refresher on this."

//You may wish to include a `seed.sql` file to pre-populate your database. This will make development of individual features much easier.

//You may wish to have a separate file containing functions for performing specific SQL queries you'll need to use. Could a constructor function or a class be helpful for organizing these?


const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table')
const figlet = require('figlet');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeetracker',
    
  });

 connection.connect();
 connection.query = util.promisify(connection.query);
 

 

 const start = () => {


    figlet('Hello!!', function(err, data) { //Code from class for popup
        if (err) {
            console.log('Error...');
            console.dir(err);
            return;
        }
        console.log(data)
    });

    prompts()
    }


    function prompts(){
        

    //prompts for the menu
    setTimeout(  () => {inquirer
      .prompt({
        name: 'startMenu',
        type: 'list',
        message: 'What would like to do? (use arrow keys)',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Update Employee', 'Remove Employee', 'Add Department', 'Add Role', 'EXIT'],
      })
      .then((answer) => {
        
        if (answer.startMenu === 'View All Employees') {
            console.log("viewAll")
            viewAll()

        } else if (answer.startMenu === 'View All Departments') {
            console.log("viewD")
            viewDepartments()

        } else if (answer.startMenu === 'View All Roles') {
            console.log("viewM")
            viewRoles()

        } else if (answer.startMenu === 'Add Employee') {
            console.log("addE")
            addEmployee()
            
        } else if (answer.startMenu === 'Update Employee') {
            console.log("updateE")
            updateER()

        } else if (answer.startMenu === 'Remove Employee') {
            console.log("removeE")
            removeEmployee()

        } else if (answer.startMenu === 'Add Role') {
            console.log("addR")
            addRole()

        } else if (answer.startMenu === 'Add Department') {
            console.log("addD")
            addDepartment()



        } else {
          connection.end();
        }
      });
    }, 100) 
    }
    

function viewAll(){
    const employees = db.findAllEmployees();
    prompts();
    console.table(employees);
}

start();


// findAllEmployees(){
//     return this.connection.query(
//        'SELECT employee.employeeId, employee.firstName, employee.lastName, employee.roleId, employee.managerId'

//     );
// };












