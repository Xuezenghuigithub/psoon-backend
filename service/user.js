const User = require('../models/user');
const Code = require('../models/code');

const userService = Object.create(null);

/**
 * @Name: addUser
 * @Description: 添加用户
 * @Param:  
 * @Return: 
 * @Author: Zander Xue
 * @Date: 2020-06-11 15:00:25
 */
userService.addUser = async userData => {
  try {
    return await new User(userData).save();
  } catch (err) {
    return err.message || '保存出错';
  }
}

/**
 * @Name: findOneUser
 * @Description: 查询一个用户
 * @Param:  
 * @Return: 
 * @Author: Zander Xue
 * @Date: 2020-06-11 15:00:55
 */
userService.findOneUser = async (matchObj) => {
  return await User.findOne(matchObj);
}

userService.findCode = async (matchObj) => {
  return await Code.findOne(matchObj);
}

/**
 * @Name: saveCodeData
 * @Description: 保存验证码数据
 * @Param:  
 * @Return: 
 * @Author: Zander Xue
 * @Date: 2020-06-12 10:18:07
 */
userService.saveCodeData = async (codeData) => {
  const isExist = await userService.findCode({ email: codeData.email });
  if (isExist) {
    return await Code.findByIdAndUpdate(isExist._id, codeData);
  } else {
    return await new Code(codeData).save();
  }
}

module.exports = userService;