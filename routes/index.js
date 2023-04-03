var express = require('express');
var router = express.Router();
const userServices = require('../components/controller');
const { changePassword } = require('../components/service');

const { Auth, LoginCredentials } = require("two-step-auth");
/* GET home page. */
//http://localhost:3000/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
//http://localhost:3000/login
router.post('/login', async (req, res, next)=> {
    try {
      const {username, password} = req.body;
      const result = await userServices.login(username, password);
       console.log('result: ',result);
       if(result){
        res.status(200).json({status: 1, notification: "Đăng nhập thành công",id: result._id, username: result.username, password: result.password, score: result.score, positionX: result.positionX, positionY: result.positionY, positionZ: result.positionZ});
       }else{
        res.status(400).json({status: 0, notification: "Đăng nhập không thành công"});
       }
      // if(result) {
      //   res.json({status: 1, notification: "Đăng nhập thành công", username: result.email, password: result.password, score: result.score, positionX: result.positionX, positionY: result.positionY, positionZ: result.positionZ});
      // }else {
      //   res.json({status: 0, notification: "Đăng nhập không thành công", username: "", password:"", score: -1, positionX: "", positionY: "", positionZ: ""});
      // }
    } catch (error) {
      console.log('Login error: ',error);
      res.status(500).json({status: 0, notification: "Đăng nhập không thành công"})
    }
});
//http://localhost:3000/register
router.post('/register', async (req, res, next)=> {
  try {
    const {username, password} = req.body;
    const result = await userServices.register(username, password);
    console.log('result: ',result);
    if(result){
      res.status(200).json({status: 1, notification: "Đăng ký thành công"});
    }else{
      res.status(400).json({status: 0, notification: "Đăng ký không thành công"});
    }
    // if(result){
    //   res.json({status: 1, notification: "Đăng ký thành công"});
    // }else{
    //   res.json({status: 0, notification: "Đăng ký không thành công"});
    // }
  } catch (error) {
    res.status(500).json({status: 0, notification: "Đăng ký không thành công"})
    console.log('Register error: ',error);
  }
});
//http://localhost:3000/save-score
router.post('/save-score', async (req, res, next)=> {
  try {
    const {username, score} = req.body;
    const result = await userServices.saveScore(username, score);
    console.log('result: ',result);
    if(result){
      res.status(200).json({status: 1, notification: "Lưu điểm thành công"});
    }else{
      res.status(400).json({status: 0, notification: "Lưu điểm không thành công"});
    }
  } catch (error) {
    console.log ('Save score error: ',error);
    res.status(500).json({status: 0, notification: "Lưu điểm không thành công"})
  }
});
//http://localhost:3000/save-position
router.post('/save-position', async (req, res, next)=> {
  try {
    const {username, positionX, positionY, positionZ} = req.body;
    const result = await userServices.savePosition(username, positionX, positionY, positionZ);
    console.log('result: ',result);
    if(result){
      res.status(200).json({status: 1, notification: "Lưu vị trí thành công"});
    }else{
      res.status(400).json({status: 0, notification: "Lưu vị trí không thành công"});
    }
  } catch (error) {
    console.log ('Save position error: ',error);
    res.status(500).json({status: 0, notification: "Lưu vị trí không thành công"})
  }
});
//http://localhost:3000/change-password
router.post('/change-password', async (req, res, next)=> {
  try {
    const {username,oldpassword, newpassword} = req.body;
    const result = await userServices.changePassword(username, oldpassword, newpassword);
    console.log('result: ',result);
    if(result){
      res.status(200).json({status: 1, notification: "Đổi mật khẩu thành công"});
    }else{
      res.status(400).json({status: 0, notification: "Đổi mật khẩu không thành công"});
    }
  } catch (error) {
    console.log ('Change password error: ',error);
    res.status(500).json({status: 0, notification: "Đổi mật khẩu không thành công"})
  }
});
//http://localhost:3000/change-password-otp
router.post('/change-password-otp', async (req, res, next)=> {
  try {
    const {username, newpassword, otp} = req.body;
    const result = await userServices.changePasswordOTP(username, newpassword, otp);
    console.log('result: ',result);
    if(result){
      res.status(200).json({status: 1, notification: "Đổi mật khẩu thành công"});
    }else{
      res.status(400).json({status: 0, notification: "Đổi mật khẩu không thành công"});
    }
    
  } catch (error) {
    console.log ('Change password otp error: ',error);
    res.status(500).json({status: 0, notification: "Đổi mật khẩu không thành công"})
  }
});
//http://localhost:3000/send-otp
router.post('/send-otp', async (req, res, next)=> {
  try {
    const {username} = req.body;
    const result = await userServices.sendOTP(username);
    console.log('result: ',result);
    if(result){
      res.status(200).json({status: 1, notification: "Gửi mã otp thành công"});
    }else{
      res.status(400).json({status: 0, notification: "Gửi mã otp không thành công"});
    }
  } catch (error) {
    console.log ('Send otp error: ',error);
    res.status(500).json
  }
});



module.exports = router;
