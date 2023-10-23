const { UserHandler } = require("../handlers/UserHandler/UserHandler.js");
const {
  DataBaseHandler,
} = require("../handlers/DatabaseHandler/DataBaseHandler.js");
const { GroupHandler } = require("../handlers/GroupHandler/GroupHandler.js");

class ProxiUserHandler {
  constructor() {}

  async getUsers(req, res) {
    const userHandler = new UserHandler(
      new DataBaseHandler(),
      new GroupHandler(new DataBaseHandler())
    );
    try {
      const userData = await userHandler.getUsers();
      res.end(
        JSON.stringify({
          status: true,
          message: "success to get users",
          data: userData,
        })
      );
    } catch (error) {
      console.error("Error en getUsers:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ status: false, message: "Error interno del servidor" })
      );
    }
  }
}

module.exports = { ProxiUserHandler };
