var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "Bamazon"
})

function bamazon(){
    connection.query("SELECT * FROM Products", function (err, res){
        if(err) throw err;
        
        console.log("Starting Bamazon");
        
        for(var i = 0; i < res.length; i++){
            console.log("id: " + res[i].itemID + "\n" + "Product Name: " + res[i].product_name + "\n" + "Department: " + res[i].department_name + "\n" + "Price: " + res[i].prices + "\n" + "Quantity: " + res[i].stock_quantity + "\n" + "----------------------------------")
        }
        
        inquirer.prompt([
            {
                type: "input",
                name: "ID",
                message: "Search via ID#",
                validate: function(name){
                    if(isNaN(name)== false && parseInt(name) <= res.length && parseInt(name) > 0){
                        return true;
                    }else{
                        return "Please return a valid number";
                    }
                }
            },
            {
                type: "input",
                name: "number",
                message: "How many would you like to buy?",
                validate: function(name){
                if(isNaN(name)){
                return "Please return a valid number";
            }else{
                return true;
            }
            }
            }
        ]).then(function(answer){
            var item = (answer.ID)-1;
            var number = parseInt(answer.number);
            var totalprice = parseFloat(((res[item].prices * number).toFixed(2)));
           
            if(res[item].stock_quantity >= number){
                connection.query("UPDATE Products SET ? WHERE ?", [{stock_quantity: (res[item].stock_quantity - number)},
                                                                   {itemID: answer.ID}], function(err, res){
                    if( err) throw err;
                    console.log("Transaction successful, total is : " + totalprice)
                    console.log("\n" + "reloading catalogue" + "\n")
                    bamazon();
                });
                
            }else {
                console.log("Insufficient quantity try again");
                buyAnother();
            }
                                   
        })
    })
    
}

function buyAnother(){
    inquirer.prompt([{
    type: "confirm",
    name: "reply",
    message: "Would you like to buy another item?"
  }]).then(function(ans){
    if(ans.reply){
      bamazon();
    } else{
      console.log("thank you for using bamazon");
    }
  });
}
    
bamazon();