const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

// create new user
router.post("/", createUserValid, async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  let user = UserService.search({ email });

  if (user) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }

  user = UserService.createUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  });

  res.status(200).json({ firstName, lastName, email, phoneNumber });
});

// delete user
router.delete("/:id", async (req, res) => {
  const user = UserService.search({ id: req.params.id });

  if (!user) {
    return res.status(404).json({ error: true, message: "User not found!" });
  }

  UserService.deleteUser(req.params.id);

  res.status(200).json(`User with ID ${req.params.id} removed!`);
});

module.exports = router;
