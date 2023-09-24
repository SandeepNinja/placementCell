const express = require("express");

module.exports.signInPage = function (req, res) {
  if (req.cookies.user_id) {
    const user = req.adminUser.find(
      (eachUser) => eachUser.id == req.cookies.user_id
    );
    if (user) {
      return res.redirect("/");
    }
  }
  return res.render("signIn", {
    title: "SignIn Placement Cell",
    layout: false,
  });
};

module.exports.createSession = function (req, res) {
  console.log("signInTry");
  // console.log("signIn", req.adminUser);
  // find user
  const user = req.adminUser.find(
    (eachUser) => eachUser.email == req.body.email
  );
  // conditions
  if (user) {
    // handle password did'nt match
    if (req.body.password != user.password) {
      return res.redirect("back");
    }
    // handle session cookie
    res.cookie("user_id", user.id);
    res.redirect("/");
  } else {
    res.redirect("back");
  }
};

module.exports.signup = function (req, res) {
  console.log("I am signUp");
  if (req.cookies.user_id) {
    const user = req.adminUser.find(
      (eachUser) => eachUser.id == req.cookies.user_id
    );
    if (user) {
      return res.redirect("/");
    }
  }
  return res.render("signUp", {
    title: "Sign Up",
    layout: false,
  });
};

module.exports.createNewAdmin = function (req, res) {
  console.log("adminUser::", req.adminUser);
  console.log(req.body);
  if (req.body.password != req.body.confirm_password) {
    return res.redirect("back");
  }
  const user = req.adminUser.find(
    (eachUser) => eachUser.email == req.body.email
  );
  if (!user) {
    console.log("I am creating new user");
    const newUser = {
      id: Date.now(),
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };
    req.adminUser.push(newUser);
    // console.log("newUser::", req.adminUser);
    return res.redirect("/signin");
  } else {
    return res.redirect("back");
  }
};

module.exports.signOut = function (req, res) {
  res.clearCookie("user_id");
  res.redirect("/signin");
};
