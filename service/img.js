const Tech = require('../models/tech');

const imgService = Object.create(null);

imgService.getTech = async (matchObj = {}) => {
  return await Tech.find(matchObj);
}

imgService.addTech = async (techObj) => {
  try {
    return await new Tech(techObj).save();
  } catch (error) {
    return error.message || 'save error';
  }
}

module.exports = imgService;