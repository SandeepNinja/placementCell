const express = require("express");

const router = express.Router();
const SignInController = require("../controller/signIn_controller");

router.get("/", SignInController.signInPage);

module.exports = router;
