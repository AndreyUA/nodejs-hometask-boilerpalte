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

  const user = UserService.createUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  });

  res.status(200).json(user);
});

// delete user
router.delete("/:id", async (req, res) => {
  const delUserId = UserService.deleteUser(req.params.id);

  res.status(200).json(`User with ID ${req.params.id} removed!`);
});

module.exports = router;
