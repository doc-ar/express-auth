const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
  _id: { type: ObjectId, default: () => new mongoose.Types.ObjectId() },
});

// Create the User model
const User = mongoose.model("User", userSchema);

module.exports = User;
