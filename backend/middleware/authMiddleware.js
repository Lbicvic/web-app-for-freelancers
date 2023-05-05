const jwt = require("jsonwebtoken");
const UserRepository = require("../db/repositories/userRepository");

class AuthMiddleware{
    static async requireAuth(req, res, next){
        const { authorization } = req.headers;

        if(!authorization){
            return res.status(401).json({error: "Authorization required"});
        }
        const token = authorization.split(" ")[1];
        try{
            const { _id } = jwt.verify(token, process.env.TOKEN_SECRET_STRING);
            req.user = await UserRepository.getUserById(_id);
            next();
        } catch (error){
            res.status(401).json({error: "Request is not authorized"})
        }
    }
}

module.exports = AuthMiddleware;