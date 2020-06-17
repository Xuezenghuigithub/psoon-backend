const express = require('express');
const router = express.Router();
const Common = require('../utils/common');
const Regex = require('../utils/regex');
const _ = require('lodash');
const multer = require('multer'); // 引入multer中间件
const storage = multer.diskStorage({ // multer磁盘存储引擎
    destination: function (req, file, cb) {
        cb(null, 'public/images/') // 指定存储位置
    },
    filename: function (req, file, cb) { // 文件重命名
      let type = file.mimetype.split('/')[1];
      if (type === 'svg+xml') {
        type = 'svg';
      }
      cb(null, file.fieldname + Date.now() + '.' + type)
    }
})
const upload = multer({
    storage
})

const imgService = require('../service/img');

/**
 * @Name: /tech
 * @Description: 获取技术数据
 * @Param:  
 * @Return: 
 * @Author: Zander Xue
 * @Date: 2020-06-15 10:30:55
 */
router.get('/tech', async (req, res) => {
  const { id, name } = req.query;
  const queryObj = Object.create(null);
  if (id) {
    if (!Regex.isId(id)) {
      return res.json(Common.resError());
    }
    queryObj._id = id;
  }
  if (name) {
    if (!_.isString(name)) {
      return res.json(Common.resError());
    }
    queryObj.name = name;
  }
  
  const result = await imgService.getTech(queryObj);
  res.json(Common.resFromService(result));
})



router.post('/tech', upload.single('file'), async (req, res, next) => {
  const name = req.body.name;
  const maxSize = 5 * 1024 * 1024;

  if (!_.isString(name)) {
    return res.json(Common.resError());
  }
  if (req.file.size > maxSize) {
    return res.json(Common.resError(501, 'image too big'));
  }
  if (req.file.mimetype.split('/')[0] !== 'image') {
    return res.json(Common.resError(501, 'file type error'));
  }
  
  const path = req.file.path.slice(7);
  const techData = {
    name: name,
    upload_time: Date.now(),
    path
  }
  const result = await imgService.addTech(techData);
  res.json(Common.resFromService(result));
})

module.exports = router;
