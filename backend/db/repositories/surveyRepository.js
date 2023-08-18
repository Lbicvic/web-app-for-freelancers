const Survey = require("../../models/surveyModel");

class SurveyRepository {
  static async save(survey) {
    try {
      return await Survey.create(survey);
    } catch (error) {
      return { error: error.message };
    }
  }
  static async getSurveys() {
    const surveys = await Survey.find({}).sort({ createdAt: -1 });

    return { surveys };
  }
}

module.exports = SurveyRepository;
