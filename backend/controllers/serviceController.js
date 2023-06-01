const ServiceRepository = require("../db/repositories/serviceRepository");
const mongoose = require("mongoose");

class ServiceController {
  static async getAllServices(req, res) {
    try {
      const { services } = await ServiceRepository.getAllServices();
      res.status(200).json(services);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async addService(req, res) {
    const data = req.body;
    const user = req.user;
    const serviceData = { ...data, user_id: user._id, user_name: user.firstName.concat(" ",user.lastName) };
    try {
      const service = await ServiceRepository.save(serviceData);
      res.status(200).json(service);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getService(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Service not found" });
    }
    try {
      const service = await ServiceRepository.getServiceById(id);
      res.status(200).json(service);
    } catch (error) {
      res.status(404).json({ error: "Service not found" });
    }
  }

  static async deleteService(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Service not found" });
    }
    try {
      const service = await ServiceRepository.deleteService(id);
      res.status(200).json(service);
    } catch (error) {
      res.status(404).json({ error: "Service not found" });
    }
  }

  static async updateService(req, res) {
    const { id } = req.params;
    const data = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Service not found" });
    }
    try {
      const service = await ServiceRepository.updateService(data, id);
      res.status(200).json(service);
    } catch (error) {
      res.status(404).json({ error: "Service not found" });
    }
  }

  static async getServicesByCategory(req, res) {
    const { category } = req.body;
    try {
      const { services } = await ServiceRepository.getServicesByCategory(
        category
      );
      res.status(200).json(services);
    } catch (error) {
      res.status(404).json({ error: "Service not found" });
    }
  }

  static async getServicesByUserID(req, res) {
    const user = req.user;
    try {
      const { services } = await ServiceRepository.getServicesByUserID(
        user._id
      );
      res.status(200).json(services);
    } catch (error) {
      res.status(404).json({ error: "Service not found" });
    }
  }

  static async getServicesByTitle(req, res) {
    const { title } = req.body;
    try {
      const { services } = await ServiceRepository.getServicesByTitle(title);
      res.status(200).json(services);
    } catch (error) {
      res.status(404).json({ error: "Service not found" });
    }
  }
}

module.exports = ServiceController;
