const express = require("express");

const router = express.Router();
const PageController = require("../controller/home_controller");
const studentController = require("../controller/studentProfile_controller");
const interviewController = require("../controller/interview_controller");
const signInController = require("../controller/signIn_controller");

console.log(" Router loaded");

router.get("/", PageController.homeController);
router.use("/signin", require("./signRoutes"));
router.use("/signup", signInController.signup);
router.use("/createNewAdmin", signInController.createNewAdmin);

router.use("/signInTry", require("./signInTryRoutes"));
router.use(
  "/studentprofile",
  function (req, res, next) {
    studentList = req.studentList;
    next();
  },
  require("./studentProfileRoutes")
);
router.get("/addNewStudent", studentController.addNewStudent);
router.post("/createstu", studentController.createNewStudent);
router.post("/updateStudent", studentController.updateStudentProfile);
router.get("/signOut", signInController.signOut);

router.get("/addInterviewPage", interviewController.addInterviewPage);
router.post("/createint", interviewController.createInterview);
router.get(
  "/companyPage/:id",
  function (req, res, next) {
    studentList = req.studentList;
    companyInterviewList = req.companyInterviewList;
    next();
  },
  interviewController.companyPage
);
router.post(
  "/appNewStudentInParticipationList",
  interviewController.appNewStudentInParticipationList
);
router.post(
  "/appNewStudentInSelectedList",
  interviewController.appNewStudentInSelectedList
);
router.post(
  "/appNewStudentInOnHoldList",
  interviewController.appNewStudentInOnHoldList
);
router.get("/exportToCsvCompanyData", PageController.exportToCsvCompanyData);
router.get("/exportToCsvStudentData", PageController.exportToCsvStudentData);

module.exports = router;
