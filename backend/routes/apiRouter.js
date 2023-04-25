const express = require("express");
const serviceRouter = require("./serviceRouter");

const apiRouter = express.Router();

apiRouter.use(serviceRouter);

module.exports = apiRouter;