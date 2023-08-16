const SurveyRepository = require("../db/repositories/surveyRepository");

class SurveyController {
  static async addSurvey(req, res) {
    const surveyData = req.body;
    try {
      const survey = await SurveyRepository.save(surveyData);
      res.status(200).json(survey);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = SurveyController;
