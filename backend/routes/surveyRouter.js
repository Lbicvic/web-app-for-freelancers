const express = require("express");
const SurveyController = require("../controllers/surveyController");
const AuthMiddleware = require("../middleware/authMiddleware");
const surveyRouter = express.Router();

surveyRouter.use(AuthMiddleware.requireAuth);

surveyRouter.post("/", SurveyController.addSurvey);

module.exports = surveyRouter;