const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Helpers = require("../utilities/Helpers");
const UserRepository = require("../db/repositories/userRepository");

class UserController{
    static async loginUser (req, res) {
        const {email, password} = req.body;
        try{
            const user = await User.login(email, password);
            const token = Helpers.createToken(user._id, user.email);
            req.user = user._id;

            res.status(200).json({email, token});
        } catch (error){
            res.status(400).json({error: error.message});
        }
    }

    static async registerUser (req, res) {
        const {firstName, lastName, email, password, role} = req.body;

        try{
            const user = await User.register(firstName, lastName, email, password, role);

            const token = Helpers.createToken(user._id, user.email);

            res.status(200).json({email, token});
        } catch (error){
            res.status(400).json({error: error.message});
        }
    }

    static async getCurrentUser (req, res) {
        const { authorization } = req.headers;

        if(!authorization){
            return res.status(401).json({error: "Authorization required"});
        }
        const token = authorization.split(" ")[1];
        try{
            const { _id } = jwt.decode(token);
            const {firstName, lastName, email, skills, role} = await UserRepository.getUserById(_id);
            res.status(200).json({firstName, lastName, email, skills, role});
        } catch (error){
            res.status(400).json({error: error.message});
        }
    }
}

module.exports = UserController;