const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const Helpers = require("../utilities/Helpers");

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
}

module.exports = UserController;