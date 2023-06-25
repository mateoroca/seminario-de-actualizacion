class Sanitizer {
  constructor() {}

  trimData(data) {
    for (const prop in data) {
      if (typeof this.data[prop] === "string") {
        this.data[prop] = this.data[prop].trim();
      }
    }
  }

  validateTypeString(data) {
    for (const prop in data) {
      if (typeof this.data[prop] === "string") {
        return true;
      }
    }
  }

  isDataEmpty() {
    for (const prop in this.data) {
      if (this.data[prop] === null || this.data[prop].trim() === "") {
        return true;
      }
    }
    return false;
  }
}

module.exports = { Sanitizer };
