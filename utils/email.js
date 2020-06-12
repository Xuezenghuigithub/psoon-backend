const nodemailer = require("nodemailer");
const emailConfig = require('../conf/config').email;

module.exports = async function sendEmail(email, code) {
  const mail = {
    from: 'Psoon <1196637816@qq.com>',
    to: email,
    subject: 'Psoon 注册验证码',
    text: `啊！美丽的女子 or 帅气的汉子，你好，欢迎使用 Psoon 😉。您的专属注册验证码为 ${code}，验证码有效时间 5 分钟。`
  }
  const transporter = nodemailer.createTransport(emailConfig); // 创建 SMTP 客户端对象

  try {
    return await transporter.sendMail(mail);
  } catch (error) {
    return error.message || '发送邮件失败';    
  }
}