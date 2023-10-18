const { Encryptor } = require("../Encryptor/Encryptor.js");

class UserHandler {
  constructor(DataBaseHandler, innerGroupHandler) {
    this.DBHandler = DataBaseHandler;
    this.groupH = innerGroupHandler;
  }
  async create(data) {
    const encryptor = new Encryptor();
    const encryptedPassword = encryptor.encrypt(data.password);

    const Data = {
      paramName1: data.userName,
      paramName2: encryptedPassword,
    };

    await this.DBHandler.executeSPWithData("createUser", Data);

    let userID = await this.getIdByUserName(data.userName);

    this.groupH.addUserToGroup(userID, 15);
  }

  createUserData(id, data) {
    const Data = {
      param1: data.name,
      param2: data.surname,
      param6: data.email,
      param8: data.isActive,
    };
    this.DBHandler.executeSPByIdWithData("createUserData", Data, id);
  }

  update(id, data) {
    const Data = {
      param1: data.name,
      param2: data.surname,
      param6: data.email,
      param8: data.isActive,
    };
    this.DBHandler.executeStoredProcedureByIdWithData(
      "updateUserData",
      Data,
      id
    );
    return true;
  }

  read(id) {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query(
        "CALL getData_userByUserID(?)",
        [id],
        (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
            return;
          }

          const userData = results[0];
          resolve(userData);
        }
      );
    });
  }

  delete(id) {
    this.DBHandler.executeSPById("DeleteUser", id);
  }

  deleteUserData(id) {
    this.DBHandler.executeSPById("deleteUserData", id);
  }

  getIdByUserName(userName) {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query(
        "CALL getUserIdByUserName(?, @userId)",
        [userName],
        (err, results) => {
          if (err) {
            console.error(
              "Error al ejecutar el procedimiento almacenado:",
              err
            );

            reject(err);
            return;
          }

          this.DBHandler.DB.query(
            "SELECT @userId AS userId",
            (err, results) => {
              if (err) {
                console.error("Error al obtener el valor de retorno:", err);
                reject(err);
                return;
              }

              let userId = results[0].userId;
              resolve(userId);
            }
          );
        }
      );
    });
  }
  async getUsers() {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query("CALL GetUsers()", (error, results) => {
        if (error) {
          console.error("Error:", error);
          reject(error);
          return;
        }

        const users = results[0];

        const cleanedUsers = users.map(({ id, user_name }) => ({
          id,
          user_name,
        }));

        resolve(cleanedUsers);
      });
    });
  }

  async checkIfUsersExist() {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query("CALL areThereUsers()", (error, results) => {
        if (error) {
          console.error("Error:", error);
          reject(error);
          return;
        }

        const exist = results[0];
        if (exist.length > 0) {
          resolve(true);
        } else resolve(false);
      });
    });
  }
  async GetLastUserID() {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query("CALL GetLastUserID()", (error, results) => {
        if (error) {
          console.error("Error:", error);
          reject(error);
          return;
        }

        const LastuserID = results[0];

        resolve(LastuserID[0].last_user_id);
      });
    });
  }
  async GetUserInformation(id) {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query(
        "CALL GetUserInformation(?)", // Aquí pasamos el valor de id como argumento
        [id],
        (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
            return;
          }

          const userInformation = results[0];
          const userInfo = {
            id: userInformation[0]._user_id,
            userName: userInformation[0]._user_name,
            password: userInformation[0]._user_password,
          };

          resolve(userInfo);
        }
      );
    });
  }
}

module.exports = {
  UserHandler,
};
