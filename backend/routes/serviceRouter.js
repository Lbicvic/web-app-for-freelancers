const express = require("express");
const ServiceController = require("../controllers/serviceController");
const AuthMiddleware = require("../middleware/authMiddleware");
const serviceRouter = express.Router();

serviceRouter.use(AuthMiddleware.requireAuth);

serviceRouter.get("/", ServiceController.getAllServices);
serviceRouter.get("/:id", ServiceController.getService);
serviceRouter.post("/myServices", ServiceController.getServicesByUserID);
serviceRouter.post("/", ServiceController.addService);
serviceRouter.delete("/:id", ServiceController.deleteService);
serviceRouter.patch("/:id", ServiceController.updateService);
serviceRouter.post("/categories", ServiceController.getServicesByCategory);



module.exports = serviceRouter;