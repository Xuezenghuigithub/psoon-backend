const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
  "is_use": { type: Boolean, required: true, default: true },
  "count": { type: Number, required: true }
});

module.exports = mongoose.model("Like", likeSchema, "likes");