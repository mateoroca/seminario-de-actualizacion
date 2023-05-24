class UserHandler {
  constructor(DataBaseHandler) {
    this.DBHandler = DataBaseHandler;
  }
  create(data) {
    this.DBHandler.connect();
    const Data = {
      paramName1: data.userName,
      paramName2: data.password,
    };

    this.DBHandler.executeStoredProcedure("createUser", Data);
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
    this.DBHandler.executeStoredProcedureByIdWithData(
      "createUserData",
      Data,
      id
    );
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
    this.DBHandler.DB.query(
      "CALL getData_userByUserID(?)",
      [id],
      (error, results) => {
        if (error) {
          console.error("Error:", error);
          return;
        }

        const userData = results[0];

        const name = userData[0].name;
        const surname = userData[0].surname;
        const dni = userData[0].dni;
        const gender = userData[0].gender;
        const phoneNumber = userData[0].phonenumber;
        const email = userData[0].email;
        const userMembership = userData[0].user_membership;
        const isActive = userData[0].is_active;

        console.log("Name:", name);
        console.log("Surname:", surname);
        console.log("DNI:", dni);
        console.log("Gender:", gender);
        console.log("Phone Number:", phoneNumber);
        console.log("Email:", email);
        console.log("User Membership:", userMembership);
        console.log("Is Active:", isActive);
      }
    );

    this.DBHandler.DB.end();
  }

  remove(id) {
    this.DBHandler.executeStoredProcedureById("deleteUserData", id);
    return true;
  }

  getGroupMemberShip(id) {
    return true;
  }

  getIdByUserName(userName) {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.connect();

      this.DBHandler.DB.query(
        "CALL getUserIdByUserName(?, @userId)",
        [userName],
        (err, results) => {
          if (err) {
            console.error(
              "Error al ejecutar el procedimiento almacenado:",
              err
            );
            this.DBHandler.DB.end();
            reject(err);
            return;
          }

          this.DBHandler.DB.query(
            "SELECT @userId AS userId",
            (err, results) => {
              if (err) {
                console.error("Error al obtener el valor de retorno:", err);
                this.DBHandler.DB.end();
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
}

module.exports = {
  UserHandler,
};
