const path = require("path");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel.js");

exports.sessionStatus = (req, res) => {
  if (req.session.userId) {
    res.json({ loggedIn: true, username: req.session.username });
  } else {
    res.json({ loggedIn: false });
  }
};

exports.loginForm = async (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "../public/login.html")));
};

exports.registerForm = async (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "../public/register.html")));
};

exports.homePage = async (req, res) => {
  res.sendFile(path.resolve(path.join(__dirname, "../public/home.html")));
};

// CREATE - login user
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate request body
    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Find user in database
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ error: "Username does not exist" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Create a session and store user ID
    req.session.userId = user._id;
    req.session.username = user.username;

    // Return success response
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({
      message: "Login unexpectedly failed",
      error: error.message,
    });
  }
};

// CREATE - Add a new user
exports.createUser = async (req, res) => {
  try {
    const { username, password, age } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, password: hashedPassword, age });
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error creating user", error: error.message });
  }
};

// READ - Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: error.message });
  }
};

// READ - Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: error.message });
  }
};

// UPDATE - Update a user by ID
exports.updateUser = async (req, res) => {
  const { username, password, age } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, password, age },
      { new: true, runValidators: true },
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

// DELETE - Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res
      .status(200)
      .json({ message: "User deleted successfully", user: deletedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};
