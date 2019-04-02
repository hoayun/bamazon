var mysql = require("mysql");
var Table = require('cli-table');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});
connection.connect(function (err) {
  if (err) throw err;
  start();
});
function start() {
  connection.query("SELECT * FROM `products`", function (err, results) {
    if (err) throw err;
    var table = new Table({
      head: ['ID', 'Product Name', 'Department', 'Price', 'Stock Quantity']
      , colWidths: [5, 20, 15, 10, 17]
    });

    // table is an Array, so you can `push`, `unshift`, `splice` and friends
    for (i = 0; i < results.length; i++) {
      table.push(
        [results[i].item_id, results[i].product_name, results[i].department_name, results[i].price, results[i].stock_quantity]
      );
    }
    console.log("success");

    console.log("\n" + table.toString() + "\n");
    buy();
  });
  // run the buy function after the table is made to prompt the user
  function buy() {
    inquirer
      .prompt([
        {
          name: "first",
          type: "input",
          message: "What is the ID of the unit you wish to purchase?",

        },
        {
          name: "second",
          type: "input",
          message: "How many of this item do wou wish to buy?"
        }])
      .then(function (answer) {
        x = answer.first;
        y = parseInt(answer.second);
      //  console.log(x);
      //  console.log(y);
        connection.query('SELECT * FROM `products` WHERE `item_id` LIKE ?', [x], function (err, fields) {
          if (err) throw err;
         // console.log(fields[0].stock_quantity);
          z = (parseInt(fields[0].stock_quantity) - y);
         // console.log(z);
          cost = ((parseInt(fields[0].price)) * y);
          if (z > 0) {
            connection.query("UPDATE `products` SET `stock_quantity` = '" + z + "' WHERE `item_id` = " + x, function (err, results) {
              if (err) throw err;
              console.log("Your purchase today cost " + cost + "$.")
              connection.end();
              
            })
          }
          else {
            console.log("Insufficient stock!!!!");
            connection.end();
          }
        })
      })

  }
}
