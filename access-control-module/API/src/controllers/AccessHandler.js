class AccessHandler {
  groupAccessByResource = [];
  resourcessByGroup = [];
  add(resourceID, groupId) {}
  remove(resourceID, groupId) {}
  getGroupaccessByResource(resourceID) {
    return this.groupAccessByResource;
  }
  getResourcessByGroup(groupId) {
    return this.resourcessByGroup;
  }
}

module.exports = {
  AccessHandler,
};
