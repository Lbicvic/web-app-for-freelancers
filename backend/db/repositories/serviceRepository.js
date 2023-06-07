const Service = require("../../models/serviceModel");

class ServiceRepository {
  static async save(service) {
    try {
      return await Service.create(service);
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getAllServices() {
    const services = await Service.find({}).sort({ createdAt: -1 });

    return { services };
  }

  static async getServiceById(serviceId) {
    try {
      return await Service.findById(serviceId);
    } catch (error) {
      return { error: error.message };
    }
  }

  static async getServicesByCategory(category) {
    const services = await Service.find({ category }).sort({ createdAt: -1 });

    return { services };
  }

  static async getServicesByUserID(user_id) {
    const services = await Service.find({ user_id }).sort({ createdAt: -1 });

    return { services };
  }

  static async getServicesByTitle(title) {
    const services = await Service.find({
      title: { $regex: title, $options: "i" },
    }).sort({ createdAt: -1 });

    return { services: services };
  }

  static async updateService(service, serviceId) {
    try {
      return await Service.findByIdAndUpdate(serviceId, service, { new: true });
    } catch (error) {
      return { error: error.message };
    }
  }

  static async deleteService(serviceId) {
    return await Service.findOneAndDelete({ _id: serviceId });
  }
}

module.exports = ServiceRepository;
