class AccessHandler {
  constructor(dbHandler) {
    this.DBHandler = dbHandler;
    this.acceessByGroupID = [];
    this.groupAccessByAccessID = [];
  }

  create(groupID, data) {
    this.DBHandler.connect();
    const Data = {
      param1: data.name,
      param2: data.description,
      param3: data.path,
    };
    this.DBHandler.executeSPByIdWithData(`createAccess`, Data, groupID);
  }

  remove(accessID) {
    this.DBHandler.executeSPById("deleteAccess", accessID);
    return true;
  }
  getGroupAccessByAccessID(accessID) {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query(
        "CALL getGroupaccessByAccessID(?)",
        [accessID],
        (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
            return;
          }

          const groupAccess = results[0];
          groupAccess.forEach((element) => {
            this.groupAccessByAccessID.push(element.groupID);
          });

          resolve(this.groupAccessByAccessID);
        }
      );
    });
  }

  async getAccessByGroupID(groupId) {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query(
        "CALL getAccessByGroupId(?)",
        [groupId],
        (error, results) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
            return;
          }

          const access = results[0];
          access.forEach((element) => {
            this.acceessByGroupID.push(element.accessID);
          });

          resolve(this.acceessByGroupID);
        }
      );
    });
  }
  GetAccessIDByPath(pathName) {
    return new Promise((resolve, reject) => {
      this.DBHandler.DB.query(
        "CALL GetAccessIDByPath(?, @accessId)",
        [pathName],
        (error) => {
          if (error) {
            console.error("Error:", error);
            reject(error);
            return;
          }

          this.DBHandler.DB.query(
            "SELECT @accessId AS accessId",
            (error, results) => {
              if (error) {
                console.error("Error:", error);
                reject(error);
                return;
              }

              const accessId = results[0].accessId;
              resolve(accessId);
            }
          );
        }
      );
    });
  }
}

module.exports = {
  AccessHandler,
};
