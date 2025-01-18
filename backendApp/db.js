const mongoose = require("mongoose");
require('dotenv').config();
const db = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`The mongoose is connected`);
    } catch (error) {
        console.log(`Error in connecting to the database: ${error}`);
    }
};

db()

const detailSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    urlName:{
        type: String,
        required:true,

    },
    url:{
        type: String,
        required:true
    },
    type:{
        type:String,
        required: true,
    },
})

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required:true
    }
})

const User = mongoose.model("User", userSchema);
const Details = mongoose.model("Details", detailSchema );

module.exports = {
    User,
    Details
};
