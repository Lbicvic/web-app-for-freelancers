const Application = require("../../models/applicationModel");

class ApplicationRepository {
  static async save(application) {
    try {
      return await Application.create(application);
    } catch (error) {
      if (error.code == 11000) {
        return { error: "You have already sent this application" };
      } else {
        return { error: error.message };
      }
    }
  }

  static async getApplicationById(applicationId) {
    try {
      return await Application.findById(applicationId);
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getApplicationsByUserID(user_id) {
    const applications = await Application.find({ user_id }).sort({
      createdAt: -1,
    });

    return { applications };
  }

  static async getApplicationsByFreelancerID(freelancer_id) {
    const applications = await Application.find({ freelancer_id }).sort({
      createdAt: -1,
    });

    return { applications };
  }

  static async updateApplication(application, applicationId) {
    try {
      return await Application.findByIdAndUpdate(applicationId, application, {
        new: true,
      });
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteApplication(applicationId) {
    return await Application.findOneAndDelete({ _id: applicationId });
  }
}

module.exports = ApplicationRepository;
