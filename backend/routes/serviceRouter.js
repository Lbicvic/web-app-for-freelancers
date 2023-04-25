const express = require("express");
const ServiceController = require("../controllers/serviceController")
const serviceRouter = express.Router();

serviceRouter.get("/", ServiceController.getAllServices);
serviceRouter.get("/:id", ServiceController.getService);
serviceRouter.post("/", ServiceController.addService);
serviceRouter.delete("/:id", ServiceController.deleteService);
serviceRouter.patch("/:id", ServiceController.updateService);



module.exports = serviceRouter;