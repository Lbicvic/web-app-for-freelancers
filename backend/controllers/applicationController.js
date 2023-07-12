const ApplicationRepository = require("../db/repositories/applicationRepository");
const mongoose = require("mongoose");

class ApplicationController {
  static async getApplicationsByUserID(req, res) {
    const user = req.user;
    try {
      const { applications } =
        await ApplicationRepository.getApplicationsByUserID(user._id);
      res.status(200).json(applications);
    } catch (error) {
      res.status(404).json({ error: "Application not found" });
    }
  }

  static async getApplicationsByFreelancerID(req, res) {
    const user = req.user;
    try {
      const { applications } =
        await ApplicationRepository.getApplicationsByFreelancerID(user._id);
      res.status(200).json(applications);
    } catch (error) {
      res.status(404).json({ error: "Application not found" });
    }
  }

  static async addApplication(req, res) {
    const data = req.body;
    const user = req.user;
    const serviceData = {
      ...data,
      user_id: user._id,
      user_name: user.firstName.concat(" ", user.lastName),
      user_email: user.email,
    };
    try {
      const application = await ApplicationRepository.save(serviceData);
      res.status(200).json(application);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteApplication(req, res) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Application not found" });
    }
    try {
      const application = await ApplicationRepository.deleteApplication(id);
      res.status(200).json(application);
    } catch (error) {
      res.status(404).json({ error: "Application not found" });
    }
  }

  static async updateApplication(req, res) {
    const { id } = req.params;
    const data = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Application not found" });
    }
    try {
      const application = await ApplicationRepository.updateApplication(
        data,
        id
      );
      res.status(200).json(application);
    } catch (error) {
      res.status(404).json({ error: "Application not found" });
    }
  }
}

module.exports = ApplicationController;
