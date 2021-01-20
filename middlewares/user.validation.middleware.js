const { user } = require("../models/user");

const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  if (firstName.length < 3) {
    return res.status(400).json({
      error: true,
      message: "Please enter a name with 3 or more characters",
    });
  }

  if (lastName.length < 3) {
    return res.status(400).json({
      error: true,
      message: "Please enter a lastname with 3 or more characters",
    });
  }

  if (password.length < 3) {
    return res.status(400).json({
      error: true,
      message: "Please enter a password with 3 or more characters",
    });
  }
  const gmailReg = /[a-zA-Z0-9]+\@gmail.com/;
  if (!gmailReg.test(email)) {
    return res
      .status(400)
      .json({ error: true, message: "Please include a valid gmail" });
  }

  if (phoneNumber.length !== 13 || phoneNumber.indexOf("+380") !== 0) {
    return res.status(400).json({
      error: true,
      message: "Please enter a correct phone number (+380xxxxxxxxx)",
    });
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update

  next();
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
