const userServices = require('./service');
const nodemailer = require('nodemailer');

const login = async (username, password) => {
    try {
        return await userServices.login(username, password);
    } catch (error) {
        throw error;
    }
};
const register = async (username, password) => {
    try {
        return await userServices.register(username, password);
    } catch (error) {
        console.log('User service register error: ',error);
        throw error;
    }
};
const saveScore = async (username, score) => {
    try {
        return await userServices.saveScore(username, score);
    } catch (error) {
        console.log('User service saveScore error: ',error);
        throw error;
    }
};
const savePosition = async (username, positionX, positionY, positionZ) => {
    try {
        return await userServices.savePosition(username, positionX, positionY, positionZ);
    } catch (error) {
        console.log('User service savePosition error: ',error);
        throw error;
    }
};
const changePassword = async (username, oldPassword, newPassword) => { 
    try {
        return await userServices.changePassword(username, oldPassword, newPassword);
    } catch (error) {
        console.log('User service changePassword error: ',error);
        throw error;
    }
};
const changePasswordOTP = async (username, newPassword, otp) => {
    try {
        return await userServices.changePasswordOTP(username, newPassword, otp);
    } catch (error) {
        console.log('User service changePasswordOTP error: ',error);
        throw error;
    }
}
const sendOTP = async (username) => {
    try {
        return await userServices.sendOTP(username);
    } catch (error) {
        console.log('User service sendOTP error: ',error);
        throw error;
    }
};


module.exports = {login, register, saveScore , savePosition, changePassword, changePasswordOTP , sendOTP}