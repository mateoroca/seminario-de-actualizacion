class Sanitizer {
  constructor() {}

  trimData(data) {
    for (const prop in data) {
      if (typeof data[prop] === "string") {
        data[prop] = data[prop].trim();
      }
    }
  }

  validateTypeString(data) {
    for (const prop in data) {
      if (typeof data[prop] === "string") {
        return true;
      }
    }
  }

  isDataEmpty(data) {
    for (const prop in data) {
      if (data[prop] === null || data[prop].trim() === "") {
        return true;
      }
    }
    return false;
  }
}

module.exports = { Sanitizer };
