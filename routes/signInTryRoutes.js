const express = require("express");
const router = express.Router();

const signInTryController = require("../controller/signIn_controller");

router.post("/", signInTryController.createSession);

module.exports = router;
