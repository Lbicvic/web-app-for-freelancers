const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "user"
    }
}, { timestamps: true });

userSchema.statics.register = async function ( firstName, lastName, email, password, role ){
    if(!firstName || !lastName || !email || !password || !role){
        throw Error("Please fill all fields to continue");
    }

    if(!validator.isEmail(email)){
        throw Error("Email is not valid");
    }

    if(!validator.isStrongPassword(password)){
        throw Error("Password not strong enough");
    }

    const userExists = await this.findOne ({ email });

    if(userExists){
        throw Error("Email already in use");
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const user = await this.create({firstName, lastName, email, password: hashPassword, role});

    return user;
}

userSchema.statics.login = async function (email, password) {
    if(!email || !password){
        throw Error("Please fill all fields to continue");
    }

    const user = await this.findOne ({ email });

    if(!user){
        throw Error("User does not exist");
    }
    
    const comparedPass = await bcrypt.compare(password, user.password);

    if(!comparedPass){
        throw Error("Invalid password");
    }

    return user;
}


module.exports = mongoose.model("user", userSchema);