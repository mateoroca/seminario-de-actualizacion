const { UserHandler } = require("../handlers/UserHandler/UserHandler.js");
const {
  DataBaseHandler,
} = require("../handlers/DatabaseHandler/DataBaseHandler.js");
const { GroupHandler } = require("../handlers/GroupHandler/GroupHandler.js");
const { Sanitizer } = require("../sanitizer/sanitizer.js");

class ProxiGroupHandler {
  constructor() {}

  async getGroupsData(req, res) {
    try {
      const groupHandler = new GroupHandler(new DataBaseHandler());
      let groups = await groupHandler.showAll();

      res.end(JSON.stringify({ groups: groups }));
    } catch (error) {
      console.error("Error en getUsers:", error);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Internal Server Error" }));
    }
  }

  async addUserToGroup(req, res) {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const requestData = JSON.parse(body);

      const sanitizedData = new Sanitizer();
      sanitizedData.trimData(requestData);

      const isStryng = sanitizedData.validateTypeString(requestData);
      const isEmpty = sanitizedData.isDataEmpty(requestData);

      if (!isEmpty && isStryng) {
        const userName = requestData.userName;
        const userGroup = requestData.groupName;

        const userHandler = new UserHandler(
          new DataBaseHandler(),
          new GroupHandler(new DataBaseHandler())
        );
        const groupHandler = new GroupHandler(new DataBaseHandler());
        const groupId = await groupHandler.GetGroupIdByName(userGroup);
        const UserId = await userHandler.getIdByUserName(userName);
        let state = await groupHandler.addUserToGroup(UserId, groupId);
        res.end(
          JSON.stringify({
            status: state,
            message: `success to add ${userName} to group : ${userGroup}`,
          })
        );
      } else {
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ state: false, message: "error empty data" }));
      }
    });
  }
}

module.exports = { ProxiGroupHandler };
