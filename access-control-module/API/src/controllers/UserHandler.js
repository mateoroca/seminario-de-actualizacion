class UserHandler {
  constructor(DataBaseHandler, innerGroupHandler) {
    this.DBHandler = DataBaseHandler;
    this.groupH = innerGroupHandler;
  }
  async create(data) {
    const Data = {
      paramName1: data.userName,
      paramName2: data.password,
    };

    await this.DBHandler.executeSPWithData("createUser", Data);

    let userID = await this.getIdByUserName(Data.paramName1);
    //set user on guest group by default
    this.groupH.addUserToGroup(userID, 15);
  }

  createUserData(id, data) {
    const Data = {
      param1: data.name,
      param2: data.surname,
      param3: data.dni,
      param4: data.gender,
      param5: data.phoneNumber,
      param6: data.email,
      param7: data.userMembership,
      param8: data.isActive,
    };
    this.DBHandler.executeSPByIdWithData("createUserData", Data, id);
  }

  update(id, data) {
    const Data = {
      param1: data.name,
      param2: data.surname,
      param3: data.dni,
      param4: data.gender,
      param5: data.phoneNumber,
      param6: data.email,
      param7: data.userMembership,
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

  remove(id) {
    this.DBHandler.executeSPById("deleteUserData", id);
    return true;
  }

  getGroupMemberShip(id) {
    return true;
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
  showAll() {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query("CALL GetUsers()", (error, results) => {
        if (error) {
          console.error("Error:", error);
          reject(error);
          return;
        }

        const users = results[0];
        resolve(users);
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
}

module.exports = {
  UserHandler,
};
