const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/email');
const Regex = require('../utils/regex');
const Common = require('../utils/common');
const _ = require('lodash');

const userService = require('../service/user');

/**
 * @Name: [GET] authCode
 * @Description: 发送邮件获取验证码
 * @Param:  email
 * @Return: 
 * @Author: Zander Xue
 * @Date: 2020-06-12 09:27:48
 */
router.get('/authCode', async (req, res) => {
  const email = req.query.email;
  const code = Common.createAuthCode();

  if (!Regex.isEmail(email)) {
    return res.json(Common.resError());
  }
  const result = await sendEmail(email, code);

  if (_.isString(result)) {
    return res.json(Common.resError(503, 'send email error'));
  }
  const codeData = {
    email,
    code,
    create_time: Date.now()
  }
  await userService.saveCodeData(codeData);
  res.json(Common.resSuccess(result));
})

/**
 * @Name: [POST] user
 * @Description: 添加用户
 * @Param:  email
 * @Return: 
 * @Author: Zander Xue
 * @Date: 2020-06-12 09:29:28
 */
router.post('/user', async (req, res) => {
  const { username, email, password, code } = req.body;
  
  const codeData = await userService.findCode({ email });
  // 无 code
  if (!codeData) {
    return res.json(Common.resError(5021, 'cant find code'));
  }
  // code 过期
  const timePass = Common.timePass(codeData);
  if (!timePass) {
    return res.json(Common.resError(5022, 'time pass'));
  }
  // code 错误
  if(codeData.code !== code){
    return res.json(Common.resError(5023, 'code error'));
  }
  // 已存在该用户
  const isExist = await userService.findOneUser({ email });
  if (isExist) {
    return res.json(Common.resError(5024, 'is exist'));
  }
  const userData = { username, email, password, is_admin: false }
  const result = await userService.addUser(userData);
  if (typeof result === 'string') {
    return res.json(Common.resError());
  }
  res.json(Common.resSuccess(result));
});

/**
 * @Name: [POST] login
 * @Description: 用户登录
 * @Param:  
 * @Return: 
 * @Author: Zander Xue
 * @Date: 2020-06-12 14:19:23
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!Regex.isEmail(email)) {
    return res.json(Common.resError());
  }

  const result = await userService.findOneUser({ email });
  
  if (!result) {
    return res.json(Common.resError(5021, 'user not exsit'));
  }
  if (result.password !== password) {
    return res.json(Common.resError(5022, 'password error'));
  }
  res.json(Common.resSuccess(result))
})

module.exports = router;
