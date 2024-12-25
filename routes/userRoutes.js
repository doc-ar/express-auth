const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControllers.js");

router.get("/register", userController.registerForm);
router.get("/login", userController.loginForm);
router.post("/login", userController.loginUser);
router.post("/", userController.createUser);
router.get("/", userController.homePage);

module.exports = router;
