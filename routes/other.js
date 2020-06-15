const express = require('express');
const router = express.Router();
const Common = require('../utils/common');
const Regex = require('../utils/regex');
const _ = require('lodash');
const otherService = require('../service/other');

router.get('/like', async (req, res) => {
  const result = await otherService.getCount();

  res.json(Common.resFromService(result));
})


router.post('/like', async (req, res) => {
  const result = await otherService.updateCount();
  console.log(result);
  res.json(Common.resFromService(result));;
})

module.exports = router;
