class GroupHandler {
  constructor(dbHandler) {
    this.DBHandler = dbHandler;
  }

  create(name) {
    this.DBHandler.connect();
    let Name = {
      param1: name,
    };
    this.DBHandler.executeSPWithData("createGroup", Name);
  }

  remove(id) {
    this.DBHandler.connect();
    this.DBHandler.executeSPById("DeleteGroup", id);
  }
  async showAll() {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query("CALL GetGroups()", (error, results) => {
        if (error) {
          console.error("Error:", error);
          reject(error);
          return;
        }

        const groups = results[0];

        const cleanedGroups = groups.map((group) => ({
          id: group.id,
          name: group.name.trim(),
        }));

        resolve(cleanedGroups);
      });
    });
  }

  async checkIfGroupsExist() {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query("CALL areThereGroups()", (error, results) => {
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
  addUserToGroup(userID, groupID) {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query(
        "CALL addUserToGroup(?,?)",
        [userID, groupID],
        (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(false);
            return;
          }
          console.log("success to add user to group");
          resolve(true);
        }
      );
    });
  }
  async getGroupIDByUserID(userID) {
    try {
      const results = await this.DBHandler.executeSPById(
        `getGroupsByUserID`,
        userID
      );
      const res = results[0];
      return res;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
  async GetGroupIdByName(groupName) {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query(
        "CALL GetGroupIdByName(?,@GroupId)",
        [groupName],
        (error) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
            return;
          }

          this.DBHandler.DB.query(
            "SELECT @GroupId AS GroupId",
            (error, results) => {
              if (error) {
                console.error("Error:", error);
                reject(error);
                return;
              }

              const groupId = results[0].GroupId;
              resolve(groupId);
            }
          );
        }
      );
    });
  }
}

module.exports = {
  GroupHandler,
};
