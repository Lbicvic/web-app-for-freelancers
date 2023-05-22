const express = require("express");
const serviceRouter = require("./serviceRouter");
const userRouter = require("./userRouter");

const apiRouter = express.Router();

apiRouter.use("/api/user", userRouter);
apiRouter.use("/api/services", serviceRouter);

module.exports = apiRouter;
