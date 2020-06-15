const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const techSchema = new Schema({
  "name": { type: String, required: true },
  "upload_time": { type: Date, required: true, default: Date.now() },
  "path": { type: String, required: true }
});

module.exports = mongoose.model("Tech", techSchema, "techs");