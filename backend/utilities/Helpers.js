const jwt = require("jsonwebtoken");

class Helpers {
  static createToken(_id, email) {
    return jwt.sign({ _id, email }, process.env.TOKEN_SECRET_STRING, {
      expiresIn: "3d",
    });
  }
  static getUserDataForResponse(user) {
    const { _id, firstName, lastName, email, role, skills} = user;
    return { _id, firstName, lastName, email, role, skills};
  }
}

module.exports = Helpers;
