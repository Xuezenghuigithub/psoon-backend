const Tech = require('../models/tech');

const techService = Object.create(null);

techService.getTech = async (matchObj = {}) => {
  return await Tech.find(matchObj);
}

techService.addTech = async (techObj) => {
  try {
    return await new Tech(techObj).save();
  } catch (error) {
    return error.message || 'save error';
  }
}


techService.deleteTech = async id => {
  return await Tech.findByIdAndDelete(id);
}
module.exports = techService;