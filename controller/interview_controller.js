// add interview website page
module.exports.addInterviewPage = function (req, res) {
  if (req.cookies.user_id) {
    const user = req.adminUser.find(
      (eachUser) => eachUser.id == req.cookies.user_id
    );
    if (user) {
      return res.render("addNewInerview", {
        title: "Add Interview",
        user: user,
      });
    }
  }
  return res.redirect("/signin");
};

// create interview
function changeFormat(val) {
  const myArray = val.split("-");

  let year = myArray[0];
  let month = myArray[1];
  let day = myArray[2];

  let formatedDate = day + "-" + month + "-" + year;
  return formatedDate;
}

module.exports.createInterview = function (req, res) {
  req.body.DateOfInterview = changeFormat(req.body.DateOfInterview);
  req.body = {
    id: Date.now(),
    ...req.body,
    studentParticipatedList: [],
    studentSelected: [],
    studentOnHold: [],
  };
  req.companyInterviewList.push(req.body);
  return res.redirect("back");
};

module.exports.companyPage = function (req, res) {
  if (req.cookies.user_id) {
    const user = req.adminUser.find(
      (eachUser) => eachUser.id == req.cookies.user_id
    );
    if (user) {
      req.companyInterviewList.forEach((company) => {
        if (company.id == req.params.id) {
          // ---------------------------------------------
          // console.log(company);
          var pendingStudent = req.studentList.filter((stu) => {
            return !company.studentParticipatedList.some(
              (stuId) => stu.id == stuId
            );
          });
          // console.log("hi:::", pendingStudent);

          // ------------selection list in page----------------------
          var selectStudentListIds = company.studentParticipatedList.filter(
            (stu) => {
              return !company.studentSelected.some((stuId) => stuId == stu);
            }
          );

          var selectStudentList = req.studentList.filter((stu) => {
            return selectStudentListIds.some((stuId) => stuId == stu.id);
          });
          // console.log("selectStudentList::", selectStudentList);
          // -----ON HOLD LIST IN PAGE

          var selectOnHoldFromParticipentIds =
            company.studentParticipatedList.filter((stu) => {
              return (
                !company.studentSelected.some((stuId) => stuId == stu) &&
                !company.studentOnHold.some((stuId) => stuId == stu)
              );
            });
          var selectOnHoldFromParticipent = req.studentList.filter((stu) => {
            return selectOnHoldFromParticipentIds.some(
              (stuId) => stuId == stu.id
            );
          });

          // console.log(
          //   "selectOnHoldFromParticipentIds::",
          //   selectOnHoldFromParticipent
          // );
          return res.render("companyProfile", {
            title: "Company Profile",
            company: company,
            studentList: req.studentList,
            participatedStudent: pendingStudent,
            selectStudentList: selectStudentList,
            selectOnHoldFromParticipent: selectOnHoldFromParticipent,
            user: user,
          });
        }
      });
    }
  }
};

module.exports.appNewStudentInParticipationList = function (req, res) {
  // console.log("I am appNewStudentInParticipationList");
  // console.log("body", req.body);
  // console.log("body", req.companyInterviewList);
  req.companyInterviewList = req.companyInterviewList.map((comp) => {
    if (comp.id == req.body.id) {
      comp.studentParticipatedList.push(req.body.newStuToAdd);
    }
    // console.log(comp);
    return comp;
  });

  return res.redirect("back");
};

module.exports.appNewStudentInSelectedList = function (req, res) {
  req.companyInterviewList = req.companyInterviewList.map((comp) => {
    if (comp.id == req.body.id) {
      comp.studentSelected.push(req.body.newStuToAdd);
      comp.studentOnHold = comp.studentOnHold.filter((stu) => {
        return !stu == req.body.newStuToAdd;
      });
    }
    console.log(comp);
    return comp;
  });

  return res.redirect("back");
};

module.exports.appNewStudentInOnHoldList = function (req, res) {
  req.companyInterviewList = req.companyInterviewList.map((comp) => {
    if (comp.id == req.body.id) {
      comp.studentOnHold.push(req.body.newStuToAdd);
    }
    // console.log(comp);
    return comp;
  });

  return res.redirect("back");
};
