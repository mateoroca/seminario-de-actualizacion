class Sanitizer {
  constructor(data) {
    this.data = data;
  }

  trimData() {
    for (const prop in this.data) {
      if (typeof this.data[prop] === "string") {
        this.data[prop] = this.data[prop].trim();
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
