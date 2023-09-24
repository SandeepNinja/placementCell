// this will show the student details
module.exports.studentProfilePage = function (req, res) {
  if (req.cookies.user_id) {
    const user = req.adminUser.find(
      (eachUser) => eachUser.id == req.cookies.user_id
    );
    if (user) {
      req.studentList.find((student) => {
        // console.log(student.interviews);
        if (student.id == req.params.id) {
          return res.render("studentProfile", {
            title: "Student Profile",
            student: student,
            interviews: student.interviews,
            user: user,
          });
        }
      });
    }
  }
};

// form for adding new student
module.exports.addNewStudent = function (req, res) {
  if (req.cookies.user_id) {
    const user = req.adminUser.find(
      (eachUser) => eachUser.id == req.cookies.user_id
    );
    if (user) {
      return res.render("addNewStudent", {
        title: "Add New Student Profile",
        user: user,
      });
    }
  }
  return res.redirect("/signin");
};

// create new student and add in our directry
module.exports.createNewStudent = function (req, res) {
  if (req.cookies.user_id) {
    const user = req.adminUser.find(
      (eachUser) => eachUser.id == req.cookies.user_id
    );
    if (user) {
      console.log(req.body);

      req.body = { id: Date.now(), ...req.body, interviews: [] };
      req.studentList.push(req.body);
      console.log(req.studentList);
      return res.redirect("back");
    }
  }
  return res.redirect("/signin");
};

module.exports.updateStudentProfile = function (req, res) {
  if (req.cookies.user_id) {
    const user = req.adminUser.find(
      (eachUser) => eachUser.id == req.cookies.user_id
    );
    if (user) {
      req.studentList.map((student) => {
        if (student.id == req.body.id) {
          student.status = req.body.status;
        }
        return student;
      });

      // console.log(req.studentList);
      return res.redirect("back");
    }
  }
  return res.redirect("/signin");
};
