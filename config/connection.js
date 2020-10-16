// Set up MySQL connection.
var mysql = require("mysql");
var connection;

if (process.env.JAWSDB_URL) {
  // use for heroku
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  // use for local
  var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "mypassword",
    database: "post_db",
  });
}

// Export connection for our ORM to use.
connection.connect();
module.exports = connection;
