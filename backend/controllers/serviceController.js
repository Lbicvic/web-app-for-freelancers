const Service = require("../models/serviceModel");
const mongoose = require("mongoose")

class ServiceController {
    static async getAllServices(req, res) {
        try{
            const services = await Service.find({}).sort({createdAt: -1});
            res.status(200).json(services);
        } catch(error){
            res.status(400).json({error: error.message});
        }
    }

    static async addService(req, res) {
        const {title, description, aproxFinishTime, cost} = req.body;

        try{
            const service = await Service.create({title, description, aproxFinishTime, cost});
            res.status(200).json(service);
        } catch(error){
            res.status(400).json({error: error.message});
        }
    }

    static async getService(req, res) {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Service not found"});
        }
        try{
            const service = await Service.findById(id);
            res.status(200).json(service);
        } catch(error){
            res.status(404).json({error: "Service not found"});
        }
    }

    static async deleteService(req, res) {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Service not found"});
        }
        try{
            const service = await Service.findOneAndDelete({_id: id});
            res.status(200).json(service);
        } catch(error){
            res.status(404).json({error: "Service not found"});
        }
    }

    static async updateService(req, res) {
        const { id } = req.params
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({error: "Service not found"});
        }
        try{
            const service = await Service.findOneAndUpdate({_id: id}, {
                ...req.body
            });
            res.status(200).json(service);
        } catch(error){
            res.status(404).json({error: "Service not found"});
        }
    }
}

module.exports = ServiceController;
