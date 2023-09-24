const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const port = 8000;
const app = express();
const expressLayouts = require("express-ejs-layouts");

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));

//  use express Layout
app.use(expressLayouts);
//extract style and script from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

const adminUser = [
  {
    id: "9090",
    name: "admin sandeep",
    email: "admin1@gmail.com",
    password: "1111",
  },
];

const studentList = [
  {
    id: "1",
    name: "Sandeep Vishwakarma",
    email: "sandeep@gmail.com",
    college: "BIT Raipur",
    status: "not Placed",
    DSA_final_score: "70",
    Web_final_score: "80",
    React_final_score: "88",
    interviews: [
      {
        id: "0001",
        companyName: "JSPL",
        DateOfInterview: "01-04-2022",
        Result: "selected",
      },
    ],
  },
  {
    id: "2",
    name: "Rahul Vishwakarma",
    email: "Rahul@gmail.com",
    college: "MIT Raipur",
    status: "not Placed",
    DSA_final_score: "80",
    Web_final_score: "90",
    React_final_score: "88",
    interviews: [
      {
        id: "0001",
        companyName: "JSPL",
      },
      {
        id: "0002",
        companyName: "Monnet",
      },
    ],
  },
  {
    id: "3",
    name: "Aman Ysdav",
    email: "Aman@gmail.com",
    college: "Aman Raipur",
    status: "not Placed",
    DSA_final_score: "80",
    Web_final_score: "90",
    React_final_score: "88",
    interviews: [],
  },
  {
    id: "4",
    name: "Polu Vishwakarma",
    email: "Polu@gmail.com",
    college: "Polu Raipur",
    status: "not Placed",
    DSA_final_score: "80",
    Web_final_score: "90",
    React_final_score: "88",
    interviews: [],
  },
];

const companyInterviewList = [
  {
    id: "0001",
    name: "JSPL",
    DateOfInterview: "01-04-2022",
    studentParticipatedList: [1, 2],
    studentSelected: [1],
    studentOnHold: [2],
  },
  {
    id: "0002",
    name: "Monnet",
    DateOfInterview: "01-12-2022",
    studentParticipatedList: [1, 2],
    studentSelected: [],
    studentOnHold: [],
  },
];

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(
  "/",
  function (req, res, next) {
    req.studentList = studentList;
    req.companyInterviewList = companyInterviewList;
    req.adminUser = adminUser;
    next();
  },
  require("./routes")
);

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running server");
  }
  console.log("server is running on port : ", port);
});
