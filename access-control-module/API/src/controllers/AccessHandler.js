class AccessHandler {
  constructor(dbHandler) {
    this.DBHandler = dbHandler;
    this.groupAccessByResource = [];
    this.acceessByGroup = [];
  }

  add(accessID, groupID) {
    this.DBHandler.connect();
    this.DBHandler.DB.query("", Data, groupID);
  }

  remove(accessID, groupID) {}
  getGroupaccessByAccess(accessID) {
    return this.groupAccessByResource;
  }
  getAccessByGroup(groupId) {
    return this.acceessByGroup;
  }
}

module.exports = {
  AccessHandler,
};
