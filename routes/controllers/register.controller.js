const bcrypt = require("bcryptjs");
const User = require("../../models/User");

exports.register = (req, res, next) => {
  return res.render("register");
};

exports.postRegister = async (req, res, next) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: "please enter all fields" });
  }

  if (password !== password2) {
    errors.push({ msg: "passwords do not match" });
  }

  if (password.length < 4) {
    errors.push({ msg: "password must be at least 4 characters" });
  }

  if (errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    const user = await User.findOne({ email: email });
    let newUser;
    if (user) {
      errors.push({ msg: "account already exists" });
      res.render("register", {
        errors,
        name,
        email,
        password,
        password2,
      });
    } else {
      newUser = new User({
        name,
        email,
        password,
      });
    }

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, async (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        try {
          const userSaved = await newUser.save();
          req.flash(
            "success_msg",
            "You are now registered and can log in"
          );
          res.redirect("/login");
        } catch (err) {
          next(err);
        }
      });
    });
  }
};
