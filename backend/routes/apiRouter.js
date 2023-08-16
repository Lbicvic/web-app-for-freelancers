const express = require("express");
const serviceRouter = require("./serviceRouter");
const userRouter = require("./userRouter");
const applicationRouter = require("./applicationRouter");
const surveyRouter = require("./surveyRouter");

const apiRouter = express.Router();

apiRouter.use("/api/user", userRouter);
apiRouter.use("/api/services", serviceRouter);
apiRouter.use("/api/applications", applicationRouter);
apiRouter.use("/api/survey", surveyRouter);

module.exports = apiRouter;
