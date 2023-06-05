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
        resolve(groups);
      });

      this.DBHandler.DB.end();
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
        resolve(exist);
      });

      this.DBHandler.DB.end();
    });
  }
}

module.exports = {
  GroupHandler,
};
