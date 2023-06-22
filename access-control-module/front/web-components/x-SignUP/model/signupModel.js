class SignupModel {
  constructor() {}
  async signUp(data) {
    if (data != null && data !== "") {
      try {
        let requestMetadata = {
          method: "POST",
          body: JSON.stringify(data),
        };

        let res = await fetch(
          "http://localhost:3000/UserHandler/signup/userData",
          requestMetadata
        );
        res = await res.json();
        return res;
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert("error empty data (front side)");
    }
  }
}

export { SignupModel };
