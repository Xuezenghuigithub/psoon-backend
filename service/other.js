const Like = require('../models/like');

const otherService = Object.create(null);

otherService.getCount = async () => {
  return await Like.findOne({ is_use: true });
}

otherService.updateCount = async () => {
  const count = await otherService.getCount();

  if (!count) {
    return await new Like({ count: 0, is_use: true }).save();
  }
  const newCount = count.count + 1;
  return await Like.findOneAndUpdate({ is_use: true }, { count: newCount });
}

module.exports = otherService;