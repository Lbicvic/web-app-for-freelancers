const express = require("express");
const ApplicationController = require("../controllers/applicationController");
const AuthMiddleware = require("../middleware/authMiddleware");
const applicationRouter = express.Router();

applicationRouter.use(AuthMiddleware.requireAuth);

applicationRouter.post("/", ApplicationController.addApplication);

applicationRouter.get(
  "/userApplications",
  ApplicationController.getApplicationsByUserID
);

applicationRouter.get(
  "/freelancerApplications",
  ApplicationController.getApplicationsByFreelancerID
);
applicationRouter.patch("/:id", ApplicationController.updateApplication);

applicationRouter.delete("/:id", ApplicationController.deleteApplication);

module.exports = applicationRouter;
