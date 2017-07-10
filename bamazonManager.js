var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Descartes6",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  managerMenu();
 });

function managerMenu(){
	inquirer.prompt([
		{
			name:"menuOptions",
			type: "list",
			message: "What would you like to do?",
			choices: ["View Products for Sale", 
					"View Low Inventory", 
					"Add to Inventory", 
					"Add New Product"]
		}]).then(function(option){
			switch(option.menuOptions) {
				case "View Products for Sale":
				viewProducts();
				break;

				case "View Low Inventory":
				viewInv();
				break;

				case "Add to Inventory":
				addInv();
				break;

				case "Add New Product":
				addProduct();
				break;
			}
		})
};

function viewProducts(){
	connection.query("SELECT * FROM products", function(err, results) {
		if(err) throw err;
		 inquirer.prompt([
		{
			name: "itemList",
			type: "list",
			choices: function() {
				var invArray = [];
				for (var i = 0; i < results.length; i++) {
					invArray.push(results[i].item_id + "|" + results[i].product_name + "|" + results[i].department_name + "|" + results[i].price + "|" + results[i].stock_quantity);
				}
			console.log("Items in Inventory");
			console.log(invArray);
			}
		}])
	})
};

function viewInv() {
	connection.query("SELECT * FROM products WHERE stock_quantity < 30", function(err, results) {
		if(err) throw err;
		 inquirer.prompt([
		{
			name: "itemList",
			type: "list",
			choices: function() {
				var lowInvArray = [];
				for (var i = 0; i < results.length; i++) {
					lowInvArray.push(results[i].item_id + "|" + results[i].product_name + "|" + results[i].department_name + "|" + results[i].price + "|" + results[i].stock_quantity);
				}
			console.log("Low Inventory");
			console.log(lowInvArray);
			}
		}])
	})

};

function addInv() {
	connection.query("SELECT * FROM products", function(err, results) {
		if(err) throw err;
		 inquirer.prompt([
		{
			name: "itemList",
			type: "list",
			choices: function() {
				var choiceArray = [];
				for (var i = 0; i < results.length; i++) {
					choiceArray.push(results[i].item_id + "|" + results[i].product_name + "|" + results[i].department_name + "|" + results[i].price + "|" + results[i].stock_quantity);
				}
			return choiceArray;
			},
			message: "Choose the item you would like to add more inventory of."
		},
		{
			name: "addQty",
			type: "input",
			message: "How many units would you like to add?",
			validate: function(value) {
          		if (isNaN(value) === false) {
            	return true;
		        }
		        return false;
        	}		
        }]).then(function(answer) {
        	var chosenItem;
        	for (var i = 0; i < results.length; i++) {
        		if (results[i].item_id + "|" + results[i].product_name + "|" + results[i].department_name + "|" + results[i].price + "|" + results[i].stock_quantity === answer.itemList) {
        		chosenItem = results[i];
        		invItem = results[i].product_name;
				}
			}
			var newQty = parseInt(answer.addQty) + chosenItem.stock_quantity; 
			connection.query("UPDATE products SET ? WHERE ?",
				[
					{
						stock_quantity: newQty
					},
					{
						item_id: chosenItem.item_id
					}
				],
						function(err){
							if (err) throw err;
							
						}
			)
			console.log(invItem + "|" + "New Stock Total: " + newQty);
        })
	});
};

function addProduct() {
	connection.query("SELECT * FROM products", function(err, results) {
		if(err) throw err;
		inquirer.prompt([
      {
        name: "product",
        type: "input",
        message: "What product would you like to add?"
      },
      {
        name: "department",
        type: "input",
        message: "What department is your item listed in?"
      },
      {
        name: "price",
        type: "input",
        message: "What is the price of the item?",
        validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      },
      {
      	name: "quantity",
      	type: "input",
      	message: "How many units of the new item are stocked?",
      	validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
      	}
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          product_name: answer.product,
          department_name: answer.department,
          price: answer.price,
          stock_quantity: answer.quantity
        },
        function(err) {
          if (err) throw err;
          console.log("Your new item has been added.");
          viewProducts();
        }
      );
    });
})
};
