const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true, default: false, enum: true },
});

const usersModel = mongoose.model("users", userSchema);

module.exports = usersModel;
