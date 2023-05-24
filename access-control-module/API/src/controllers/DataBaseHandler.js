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

  async connect() {
    return new Promise((resolve, reject) => {
      this.DB.connect((error) => {
        if (error) {
          console.error("Error to connect DB: ", error);
          reject(error);
        } else {
          console.log("Success connection to DB!");
          resolve();
        }
      });
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

  async executeQuery(query) {
    return new Promise((resolve, reject) => {
      this.DB.query(query, (error, results, fields) => {
        if (error) {
          console.error("QUERY ERROR:", error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });
  }

  executeStoredProcedureByIdWithData(StorageP, data, id) {
    const queryParams = Object.values(data)
      .map((value) => `'${value}'`)
      .join(", ");
    const query = `CALL ${StorageP}(${id},${queryParams})`;

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

  executeStoredProcedureById(StorageP, id) {
    const query = `CALL ${StorageP}(${id})`;

    this.DB.query(query, (error, results, fields) => {
      if (error) {
        console.error("QUERY ERROR:", error);
        this.DB.end(() => {
          console.log("Close DB");
        });
      } else {
        this.DB.end(() => {
          console.log("Close DB, Query successful");
          return results;
        });
        return true;
      }
    });
  }

  executeStoragePwithReturnValue(procedureName, params) {}
}

module.exports = {
  DataBaseHandler: DataBaseHandler,
};
