const { user } = require("../models/user");
const UserService = require("../services/userService");

const createUserValid = (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (req.body.id) {
      throw Error("You can't declare id");
    }

    if (firstName === "" || lastName === "" || !firstName || !lastName) {
      throw Error("Please enter valid name or lastname");
    }

    if (password.length < 3 || password === "") {
      throw Error("Please enter valid password with 3 or more characters");
    }

    const gmailReg = /[a-zA-Z0-9]+\@gmail.com/.test(email);

    if (!gmailReg) {
      throw Error("Please include a valid gmail post");
    }

    const phoneReg = /^[-]?\d+$/.test(phoneNumber.slice(4));

    if (
      phoneNumber.length !== 13 ||
      phoneNumber.indexOf("+380") !== 0 ||
      !phoneReg
    ) {
      throw Error("Please enter a correct phone number (+380xxxxxxxxx)");
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
};

const updateUserValid = (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (req.body.id) {
      throw Error("You can't declare id");
    }

    if (firstName === "" || lastName === "") {
      throw Error("Please enter valid name or lastname");
    }

    if (password.length < 3) {
      throw Error("Please enter valid password with 3 or more characters");
    }

    const phoneReg = /^[-]?\d+$/.test(phoneNumber.slice(4));

    if (
      phoneNumber.length !== 13 ||
      phoneNumber.indexOf("+380") !== 0 ||
      !phoneReg
    ) {
      throw Error("Please enter a correct phone number (+380xxxxxxxxx)");
    }

    const gmailReg = /[a-zA-Z0-9]+\@gmail.com/.test(email);

    if (!gmailReg) {
      throw Error("Please include a valid gmail post");
    }

    const existUser = UserService.search({ id: req.params.id });

    if (!existUser) {
      throw Error("User not found");
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
