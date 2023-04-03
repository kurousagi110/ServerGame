const userModel = require('./Model');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');


const login = async (username, password) => {

    try {
        let user = await userModel.findOne({ username });
        console.log(username);
        // console.log(user);
        console.log(password);
        console.log(user.password);
        if (user && password == user.password) {
            return user;
        }
    } catch (error) {
        console.log('User service login error: ', error);
    }
    return false;

};
const register = async (username, password) => {
    try {
        let user = await userModel.findOne({ username });
        console.log(user);
        if (!user) {
            await userModel.create({
                username: username,
                password: password,
                score: 0,
                positionX: "",
                positionY: "",
                positionZ: "",
                otp : ""
            });
            return true;
        }
    } catch (error) {
        console.log('User service register error: ', error);
    }
    return false;
};
const saveScore = async (username, score) => {
    try {
        let user = await userModel.findOne({ username });
        console.log(user);
        if (user) {
            user.score = score;
            await user.save();
            return true;
        }
    } catch (error) {
        console.log('User service saveScore error: ', error);
    }
    return false;
};
const updateScore = (username, score) => {
    const userIndex = data.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        data[userIndex].score = score;
        return true;
    } else {
        return false;
    }
};
const savePosition = async (username, positionX, positionY, positionZ) => {
    try {
        let item = await userModel.findOne({ username });
        console.log(item);
        if (item) {
            item.positionX = positionX;
            item.positionY = positionY;
            item.positionZ = positionZ;
            await item.save();
            return true;
        }
    } catch (error) {
        console.log('User service savePosition error: ', error);
    }
    return false;
};
const updatePosition = (username, positionX, positionY, positionZ) => {
    const userIndex = data.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        data[userIndex].positionX = positionX;
        data[userIndex].positionY = positionY;
        data[userIndex].positionZ = positionZ;
        return true;
    } else {
        return false;
    }
};
const changePassword = async (username, oldPassword, newPassword) => {
    try {
        let user = await userModel.findOne({ username });
        if (user && oldPassword == user.password) {
            user.password = newPassword;
            await user.save();
            return true;
        }
    } catch (error) {
        console.log('User service changePassword error: ', error);
    }
    return false;
}
const changePasswordOTP = async (username, newPassword, otp) => {
    try {
        const user = await userModel.findOne({ username });
        if (user && otp == user.otp) {
            user.password = newPassword;
            user.otp = Math.floor(1000 + Math.random() * 9000);;
            await user.save();
            return true;
        }
    } catch (error) {
        console.log('User service changePassword error: ', error);
    }
    return false;
}

const updatePassword = (username, password) => {
    const userIndex = data.findIndex(user => user.username === username);
    if (userIndex !== -1) {
        data[userIndex].password = password;
        return true;
    } else {
        return false;
    }
}

const sendOTP = async (username) => {
    try {
        const otp = Math.floor(1000 + Math.random() * 9000);
        const mailOptions = {
            from: 'hoatrinh14020@gmail.com'
            , to: username
            , subject: 'Verify your email'
            , text: `Your OTP is ${otp}`
        };
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'hoatrinh14020@gmail.com',
                pass: 'xtbceynfxxpndphh'
              }
            });
        await transporter.sendMail(mailOptions);
        const user = await userModel.findOne ({username});
        if (user) {
            user.otp = otp;
            await user.save();
            return true;
        }
    } catch (error) {
        console.log('User service sendOTP error: ', error);
    }
    return false;
}

module.exports = { login, register, saveScore, savePosition, changePassword, changePasswordOTP,sendOTP}
var data = [
    { _id: 1, username: '123@gmail.com', password: '123', score: -1, positionX: "", positionY: "", positionZ: "" },
    { _id: 2, username: '321@gmail.com', password: '123', score: -1, positionX: "", positionY: "", positionZ: "" },
    { _id: 3, username: 'abc@gmail.com', password: '123', score: -1, positionX: "", positionY: "", positionZ: "" },
    { _id: 4, username: 'def@gmail.com', password: '123', score: -1, positionX: "", positionY: "", positionZ: "" },
    { _id: 5, username: 'ghj@gmail.com', password: '123', score: -1, positionX: "", positionY: "", positionZ: "" },
]
// {status: 0, notification: "Đăng nhập không thành công", username: "", password:"", score: -1, positionX: "", positionY: "", positionZ: ""},
//     {status: 0, notification: "Đăng nhập không thành công", username: "", password:"",score: -1, positionX: "", positionY: "", positionZ: ""},
//     {status: 0, notification: "Đăng nhập không thành công", username: "", password:"",score: -1, positionX: "", positionY: "", positionZ: ""},
//     {status: 0, notification: "Đăng nhập không thành công", username: "", password:"",score: -1, positionX: "", positionY: "", positionZ: ""},
//     {status: 0, notification: "Đăng nhập không thành công", username: "", password:"",score: -1, positionX: "", positionY: "", positionZ: ""},