const express = require("express");
const router = express.Router();

const studentProfileRoute = require("../controller/studentProfile_controller");

router.get("/:id", studentProfileRoute.studentProfilePage);

module.exports = router;
