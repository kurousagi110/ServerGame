const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userOTP = new Schema({ 
    username: {type: String, required: true, unique: true},
    otp: {type: String, required: true},
    createAt: {type: Date},
    expireAt: {type: Date},
});
const UserOTP = mongoose.model('UserOTP', userOTP);
module.exports = UserOTP;