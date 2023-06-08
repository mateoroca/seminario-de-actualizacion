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

  async disconnect() {
    await this.DB.end();
  }

  executeSPWithData(StorageP, data) {
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

  executeSPByIdWithData(StorageP, data, id) {
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
        return true;
      }
    });
  }

  executeSPById(StorageP, id) {
    return new Promise((resolve, reject) => {
      const query = `CALL ${StorageP}(${id})`;

      this.DB.query(query, (error, results, fields) => {
        if (error) {
          console.error("QUERY ERROR:", error);
          this.DB.end(() => {
            reject(error);
          });
        } else {
          resolve(results);
        }
      });
    });
  }

  executeStoredProsedure(procedureName) {
    this.DB.query(`CALL ${procedureName}()`, (error, results) => {
      if (error) {
        console.error("Error al ejecutar el procedimiento almacenado:", error);
        return;
      }

      const groups = results[0];

      console.log(groups);
    });
  }
}

module.exports = {
  DataBaseHandler: DataBaseHandler,
};
