class UserHandler {
  create(data) {
    return true;
  }

  update(id, data) {
    return true;
  }

  read(Data) {
    console.log(Data.id);
    console.log(Data.name);
    console.log(Data.surname);
  }

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
