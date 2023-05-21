const mysql = require("mysql");
require("dotenv").config({ path: "../.env" });

class DataBaseHandler {
  constructor() {
    this.DB = mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }

  connect() {
    this.DB.connect((error) => {
      if (error) {
        console.error("Error to conect DB: ", error);
      } else {
        console.log("Susccess conocetion to DB!");
      }
    });
  }
  executeStoredProcedure(StorageP, data) {
    const queryParams = Object.values(data)
      .map((value) => `'${value}'`)
      .join(", ");
    const query = `CALL ${StorageP}(${queryParams})`;

    this.DB.query(query, (error, results, fields) => {
      if (error) {
        console.error("QUERY ERROR:", error);
        this.DB.end(() => {
          console.log("Close DB");
        });
      } else {
        this.DB.end(() => {
          console.log("Close DB, Query successful");
        });
        return true;
      }
    });
  }
}

module.exports = {
  DataBaseHandler: DataBaseHandler,
};
