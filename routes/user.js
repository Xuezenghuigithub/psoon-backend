const express = require('express');
const router = express.Router();

const userService = require('../service/user');

/* 注册 */
router.post('/user', async (req, res) => {
  const userData = req.body;
  console.log(userData);
  const result = await userService.addUser(userData);
  if (typeof result === 'string') {
    return res.json({
      status: 501,
      msg: result
    });
  }
  res.json({
    status: 200,
    result
  })
});

/* 按名字查找一个 */
router.get('/user', async (req, res) => {
  const name = req.query.name;
  if (!name || typeof name !== 'string') {
    return res.json({
      status: 501,
      msg: '参数错误'
    });
  }
  const result = await userService.findOneUser({ name });
  
  res.json({
    status: 200,
    result
  })
})

module.exports = router;
