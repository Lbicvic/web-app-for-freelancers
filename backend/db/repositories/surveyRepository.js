const Survey = require("../../models/surveyModel");

class SurveyRepository {
  static async save(survey) {
    try {
      return await Survey.create(survey);
    } catch (error) {
      return { error: error.message };
    }
  }
}

module.exports = SurveyRepository;
