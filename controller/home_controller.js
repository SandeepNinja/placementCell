var CsvParser = require("json2csv").Parser;

module.exports.homeController = function (req, res) {
  // console.log("students::", req.studentList);
  // console.log("companyInterviewList::", req.companyInterviewList);
  if (req.cookies.user_id) {
    const user = req.adminUser.find(
      (eachUser) => eachUser.id == req.cookies.user_id
    );
    if (user) {
      return res.render("home", {
        title: "Home Placement Cell",
        studentList: req.studentList,
        companyInterviewList: req.companyInterviewList,
        user: user,
      });
    }
  }
  return res.redirect("/signin");
};

module.exports.exportToCsvCompanyData = function (req, res) {
  let companyList = [];
  const { id, name, DateOfInterview } = req.companyInterviewList;
  const csvFields = ["Id", "Name", "Date Of Interview"];

  const main = req.companyInterviewList.map((item) => {
    return item;
  });

  const csvParser = new CsvParser({ csvFields });

  const csvData = csvParser.parse(main);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attatchment: filename=CompanyList.csv");
  res.status(200).end(csvData);
};
module.exports.exportToCsvStudentData = function (req, res) {
  let companyList = [];
  const { id, name, DateOfInterview } = req.studentList;
  const csvFields = [
    "Id",
    "Name",
    "Email",
    "College",
    "status",
    "DSA Final Score",
    "Web Final Score",
    "React Final Score",
  ];

  const main = req.studentList.map((item) => {
    return item;
  });

  const csvParser = new CsvParser({ csvFields });

  const csvData = csvParser.parse(main);
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attatchment: filename=CompanyList.csv");
  res.status(200).end(csvData);
};
