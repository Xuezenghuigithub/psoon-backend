const _ = require('lodash');

class Common {
  /**
   * @Name: createAuthCode
   * @Description: 生成随机数验证码
   * @Param:  count
   * @Return: String
   * @Author: Zander Xue
   * @Date: 2020-06-12 09:09:08
   */
  static createAuthCode(count = 6) {
    return _.sampleSize('0123456789', count).join('');
  }

  /*
   * @Name: timePass
   * @Description: 时间是否过期
   * @Param:  startTime 开始时间， interval 时间间隔，默认 5min
   * @Return: Boolean
   * @Author: Zander Xue
   * @Date: 2020-06-12 13:43:22
   */
  static timePass(startTime, interval = 5 * 60 * 1000) {
    const nowTime = Date.now();
    return nowTime - startTime >= interval ? false : true;
  }

  static resSuccess (result, status = 200, msg = 'success'){
    return { status, msg, result };
  }

  static resError (status = 501, msg = 'params error', result = null){
    return { status, msg, result };
  }

  static resFromService (result, msg = 'success'){
    if (_.isString(result)) {
      return {
        status: 504,
        msg: result,
        result: null
      }
    }

    return {
      status: 200,
      msg,
      result
    }
  }
}

module.exports = Common;
