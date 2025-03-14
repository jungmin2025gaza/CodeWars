const passport = require("passport");

exports.login = (req, res, next) => {
  return res.render("login");
};

exports.postLogin = async (req, res, next) => {
  let { email, password } = req.body;
  if (!email || !password) {
    req.flash("error", "All fields are required");
  }
  passport.authenticate("local", {
    successRedirect: "/problems",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};