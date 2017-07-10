//CUSTOMER VIEW  require mysql  require inquire
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
  // run the start function after the connection is made to prompt the user
  listItems();
});
// inquirer to display items for sale with ids
function listItems() {
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
			// inquirer to ask customer to select id of desired product
			message: "Please choose the desired product."
		},
		// inquirer to ask how many of the item 

		{
			name: "quantity",
			input: "input",
			message: "Please enter the quantity of the item you would like to purchase.",
			validate: function(value) {
          		if (isNaN(value) === false) {
            	return true;
		        }
		        return false;
        	}
		}
		]).then(function(answer) {
			var chosenItem;
			for (var i = 0; i < results.length; i++ ) {
				if (results[i].item_id + "|" + results[i].product_name + "|" + results[i].department_name + "|" + results[i].price + "|" + results[i].stock_quantity === answer.itemList) {
					chosenItem = results[i];
					console.log(chosenItem);
				}
			}
			//if not enough qty console.log "Insufficient Quantity!"
        	if (parseInt(answer.quantity) > chosenItem.stock_quantity) {
        		console.log("Insufficient Quantity");
        		listItems();
        	}else{
        		var newQty = chosenItem.stock_quantity - parseInt(answer.quantity);
        		connection.query(
        			"UPDATE products SET ? WHERE ?",
        			[
        				{ 
        					stock_quantity: newQty
        				},
        				{
        					item_id: chosenItem.item_id
        				}
        				],
        					function(err) {
        						if (err) throw err;
        						var totalPrice = parseInt(answer.quantity) * chosenItem.price;
        						console.log("Total Price: " + totalPrice);

        				});

        	}
	    })
	})

};


//if/else statement
	
	//run initial list with inquirer prompt
	//else 
	//update sql database
	//show customer price for products

//MANAGER VIEW
//inquirer for list of menu options(view products for sale, view low inventory, add to inventory, add new product)
//inquirer to view products for sale
//inquirer to view low inventory
//ability to select from list to add inventory
//use add to database to add item and then display inventory again
//add new new product will add new item to database