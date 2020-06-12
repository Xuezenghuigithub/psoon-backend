const User = require('../models/user');

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
 * @Name: 
 * @Description: 
 * @Param:  
 * @Return: 
 * @Author: Zander Xue
 * @Date: 2020-06-11 15:00:55
 */
userService.findOneUser = async (matchObj) => {
  return await User.findOne(matchObj);
}

module.exports = userService;