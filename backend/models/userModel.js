const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add name"]
    },
    email: {
        type: String,
        required: [true, "Please add email"],
        unique: true,
        trim: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ,
            "Please enter valid email address"
        ]
    },
    password: {
        type: String,
        required: [true, "Please add password"],
        minLength: [6, "Weak Password, enter two more characters"],
       // maxLength: [23," max Password length is 23"],
    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.ibb.co/4pDNDk1/avatar.png"
    },
    phone: {
        type: String,
        default: "+91"
    },
    bio: {
        type: String,
        default: "bio",
        maxLength: [250," max bio length is 250 characters"],
    }

}, {
    timestamps: true,
});

//encrypting password before going to DB 
userSchema.pre("save", async function(next) {
    if(!this.isModified("password")){
        return next();
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});

const User = mongoose.model("User", userSchema)
module.exports = User