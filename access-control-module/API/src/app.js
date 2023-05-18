const { userData } = require("./models/UserData.js");
const { AccesHandler } = require("./controllers/AccessHandler.js");
const { Authorizer } = require("./controllers/Authorizer.js");
const { UserHandler } = require("./controllers/UserHandler.js");
const { connection } = require("./dataBase");

const http = require("http");
require("dotenv").config();

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end();
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is lisening on port: ${port}`);
});

connection.connect((error) => {
  if (error) {
    console.error("Error to conect DB: ", error);
  } else {
    console.log("Susccess conocetion to DB!");
  }
});

connection.query("SELECT * FROM user", (error, results, fields) => {
  if (error) {
    console.error("QUERY ERROR : ", error);
  } else {
    console.log("QUERY RESULTS: ", results);
  }
});
