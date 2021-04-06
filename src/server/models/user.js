const mongoose = require("mongoose");

const userModel = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  uid: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("User", userModel);
