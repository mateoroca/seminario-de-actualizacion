const dataBase = require("../dataBase");
const { DB } = require("../dataBase");
const { DataBaseHandler } = require("./DataBaseHandler");

class UserHandler {
  constructor(DataBaseHandler) {
    this.DBHandler = DataBaseHandler;
  }
  create(data) {
    this.DBHandler.connect();
    const Data = {
      paramName1: data.name,
      paramName2: data.password,
    };

    this.DBHandler.executeStoredProcedure("createUser", Data);
  }

  update(id, data) {
    return true;
  }

  read(Data) {}

  remove(id) {
    return true;
  }

  getGroupMemberShip(id) {
    return true;
  }
}

module.exports = {
  UserHandler,
};
/*  */
