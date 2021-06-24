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
    

// function viewAll(){
//     const employees = db.findAllEmployees();
//     prompts();
//     console.table(employees);
//     function findAllEmployees(){
//         return this.connection.query(
//            'SELECT employee.employeeId, employee.firstName, employee.lastName, employee.roleId, employee.managerId'
    
//         );
//     };
// }

const viewAll = () => {

    connection.query("SELECT * FROM employee", (err, res) => {
        if (err) throw err;
        // console.log(res)
        
        console.table(res)
            
            setTimeout(  () => {
                start()
            }, 100) 
        
    })

}

const addEmployee = () => { //required - DONE

inquirer
    .prompt([
      {
        name: 'firstName',
        type: 'input',
        message: 'What is the first name of the employee?',
      },
      {
        name: 'lastName',
        type: 'input',
        message: 'What is the last name of the employee?',
      },
      {
        name: 'roleID',
        type: 'input',
        message: 'What is the role of the employee? (use role ID number)',
      },
    //   {
    //     name: 'managerID',
    //     type: 'input',
    //     message: 'What is the manager ID? (use managers ID/if they dont have one, leave it blank)',
    //   },
    ])
    .then((answer) => {
    //   let managerInfo 
    //   if (answer.managerID = '') {
    //       managerInfo = null
    //   } else {
    //       managerInfo = answer.managerID
    //   }

      connection.query(
        'INSERT INTO employee SET ?',
        
        {
          firstName: answer.firstName,
          lastName: answer.lastName,
          roleID: answer.roleID,
        //   managerID: managerInfo,
        },
        (err) => {
          if (err) throw err;
          console.log('The employee was made successfully');
          
          start()
        }
      );
    });
}

const removeEmployee = () => { 
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;

        inquirer
         .prompt([
             {
                 name: "choice",
                 type: "rawlist",
                 choices() {
                     const choiceArray = []
                     results.forEach(({ firstName, lastName, employeeID, roleID, managerID }) => {
                         choiceArray.push(employeeID +" "+ firstName +" "+ lastName +" "+ roleID +" "+ managerID)
                     })
                     return choiceArray
                 },
                 message: "Which employee would you like to remove?"
             }
         ])
         .then((answer) => {

            let array = answer.choice.split(" ")
            console.log(array[0])
                results.forEach(( {employeeID} ) => {
                    console.log(employeeID, array[0])
                    if (employeeID == array[0]) {
                        console.log("correct")
                        connection.query(
                        "DELETE FROM employee WHERE ?",
                        [
                            {
                                employeeID: array[0]
                            }
                        ],
                        (error) => {
                            if (error) throw err;
                            console.log('Employee removed successfully');
                            
                        }
                        )
                    }
                }) 
            })
    })

}

const addDepartment = () => { //required - DONE
    
inquirer
.prompt([
  {
    name: 'departmentName',
    type: 'input',
    message: 'What is the new department name?',
  },
])
.then((answer) => {

  connection.query(
    'INSERT INTO department SET ?',
    
    {
      name: answer.departmentName
    },
    (err) => {
      if (err) throw err;
      console.log('The department was made successfully');
      
      start()
    }
  );
});
}

const viewDepartments = () => { //Not working

    connection.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
        // console.log(res)
        
        console.table(res)
            
        
        
    })
}

const viewRoles = () => { //Not Working

    connection.query("SELECT * FROM roles", (err, res) => {
        if (err) throw err;
        // console.log(res)
        
        console.table(res)
            
        
        
    })
}

const addRole = () => { //Not Working
    inquirer
.prompt([
  {
    name: 'roleDepartment',
    type: 'input',
    message: 'What is the new role department (use department ID)',
  },
])
.then((answer) => {

  connection.query(
    'INSERT INTO roles SET ?',
    
    {
      departmentID: answer.roleDepartment
    },
    (err) => {
      if (err) throw err;
      console.log('The role was made successfully');
      
      start()
    }
  );
});
}

const updateER = () => { 
    connection.query('SELECT * FROM employee', (err, results) => {
        if (err) throw err;

        inquirer
         .prompt([
             {
                 name: "choice",
                 type: "rawlist",
                 choices() {
                     const choiceArray = []
                     results.forEach(({ firstName, lastName, employeeId, roleId, managerId }) => {
                         choiceArray.push(employeeId +" "+ firstName +" "+ lastName +" "+ roleId +" "+ managerId)
                     })
                     return choiceArray
                 },
                 message: "What employee to update?"
             },
             {
             name: "role",
             type: "input",
             message: "What role to add?"
            }
         ])
         .then((answer) => {

            let array = answer.choice.split(" ")
            console.log(array[0])
                results.forEach(( {employeeId} ) => {
                    console.log(employeeId, array[0])
                    if (employeeId == array[0]) {
                        console.log("correct")
                        connection.query(
                        "UPDATE employee SET ? WHERE ?",
                        [
                            {
                                roleId: answer.role,
                            },
                            {
                                employeeId: array[0]
                            },
                        ],
                        (error) => {
                            if (error) throw err;
                            console.log('Employee updated successfully');
                            
                        }
                        )
                    }
                }) 
            })
    })
}

start();














