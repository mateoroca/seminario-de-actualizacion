class StateApplicationHandler {
  constructor() {
    this.currentState = null;
  }

  changeState(newState) {
    if (this.currentState) {
      this.currentState.remove();
    }

    this.currentState = newState;
    document.body.appendChild(this.currentState);
  }
}

export { StateApplicationHandler };
