const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  "username": { type: String, required: true },
  "email": { type: String, required: true },
  "password": { type: String, required: true },
  "status": { type: Number, required: true, default: 1 },
  "create_time": { type: Date, required: true, default: Date.now() },
  "is_admin": { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model("User", userSchema, "users");