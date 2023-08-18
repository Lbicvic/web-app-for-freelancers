const SurveyRepository = require("../db/repositories/surveyRepository");
const Helpers = require("../utilities/Helpers");

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

  static async getSurveys(req, res) {
    try {
      const { surveys } = await SurveyRepository.getSurveys();
      res.status(200).json(surveys);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async exportSurveysToExcel(req, res) {
    try {
      const { surveys } = await SurveyRepository.getSurveys();
      let surveyData = {};
      surveyData = surveys.map((survey) => {
        const { answer1, answer2, answer3, answer4, answer5 } = survey;
        return [answer1, answer2, answer3, answer4, answer5];
      });
      const downloadPath = "./excelData/surveyanalysis.xlsx";
      Helpers.exportToExcel(
        surveyData,
        ["Question1", "Question2", "Question3", "Question4", "Question5"],
        "SurveyData",
        downloadPath
      );
      res.download(downloadPath);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = SurveyController;
