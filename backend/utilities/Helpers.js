const jwt = require("jsonwebtoken");
const xlsx = require("xlsx");
const path = require("path");

class Helpers {
  static createToken(_id, email) {
    return jwt.sign({ _id, email }, process.env.TOKEN_SECRET_STRING, {
      expiresIn: "3d",
    });
  }
  static getUserDataForResponse(user) {
    const { _id, firstName, lastName, email, role, skills } = user;
    return { _id, firstName, lastName, email, role, skills };
  }

  static exportToExcel(data, workSheetHeaders, workSheetTitle, filePath) {
    const workBook = xlsx.utils.book_new();
    const sheetData = [workSheetHeaders, ...data];
    const workSheet = xlsx.utils.aoa_to_sheet(sheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetTitle);
    xlsx.writeFile(workBook, path.resolve(filePath));
  }
}

module.exports = Helpers;
