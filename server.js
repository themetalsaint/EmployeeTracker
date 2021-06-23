const inquirer = require('inquirer');
const mysql = require('mysql');
const consoleTable = require('console.table')
const figlet = require('figlet');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'employeetracker',
  });


const start = () => {

    figlet('Hello World!!', function(err, data) { //Code from class for popup
        if (err) {
            console.log('Error...');
            console.dir(err);
            return;
        }
        console.log(data)
    });
    //prompts for the menu
    setTimeout(  () => {inquirer
      .prompt({
        name: 'startMenu',
        type: 'list',
        message: 'What would like to do? (use arrow keys)',
        choices: ['View All Employees', 'View All Departments', 'View All Roles', 'Add Employee', 'Remove Employee', 'Add Department', 'Add Role', 'Update Employee', 'EXIT'],
      })
      .then((answer) => {
        
        if (answer.startMenu === 'View All Employees') {
            console.log("view All")
            viewAll()
        } else if (answer.startMenu === 'View All Departments') {
            console.log("view D")
            viewDepartments()

        } else if (answer.startMenu === 'View All Roles') {
            console.log("view M")
            viewRoles()

        } else if (answer.startMenu === 'Add Employee') {
            console.log("addE")
            addEmployee()
            
        } else if (answer.startMenu === 'Update Employee') {
            console.log("update")
            updateER()

        } else if (answer.startMenu === 'Remove Employee') {
            console.log("remove")
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
