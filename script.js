var inquirer = require("inquirer");
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "bootcamp123!",
    database: "employee_trackerDB"

});


connection.connect(err =>{

    if (err) throw err; 

    console.log("connected");

    connection.end();
});



function prompts (){

    inquirer.prompt([

        {
            type: "list",
            message: "What would you like to do?",
            name: "question",
            choices: ["Add departments", "Add roles", "Add employees", "View departments", "View roles", "View employees", "Update employee", "Update roles"]
        }
    ]).then(function(data){

        switch(data.question) {
            case "Add departments":
                console.log("0") 
                break;

                case "Add roles":
                console.log("1")
                break;

                case "Add employees":
                console.log("1")
                break;

                case "View departments":
                console.log("1")
                break;

                case "View roles":
                console.log("1")
                break;

                case "View employees":
                console.log("1")
                break;

                case "Update employees":
                console.log("1")
                break;

                case "Update roles":
                console.log("1")
                break;
        }

     
    })
};

prompts();



function addDepartment(){

    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of the department you would like to add?",
            name: "department",
            
        }

    ]).then(function(data){

        connection.query(`INSERT into department (name) VALUES (${data.department})`, function(err, response){
            if (err) throw err;

        })

    })
};
