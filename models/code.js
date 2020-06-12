const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const codeSchema = new Schema({
  "code": { type: String, required: true },
  "email": { type: String, required: true },
  "create_time": { type: Date, required: true, default: Date.now() }
});

module.exports = mongoose.model("Code", codeSchema, "codes");