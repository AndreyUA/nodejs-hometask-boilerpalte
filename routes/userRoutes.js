const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

// @route       GET /api/users
// @desc        Get all users
router.get("/", async (req, res) => {
  const allUsers = await UserService.getAllUsers();

  if (allUsers.length === 0) {
    return res.status(400).json({ error: true, message: "No active users" });
  }

  res.status(200).json(allUsers);
});

// @route       GET /api/users/:id
// @desc        Get user by ID
router.get("/:id", async (req, res) => {
  const user = await UserService.search({ id: req.params.id });

  if (!user) {
    return res.status(404).json({ error: true, message: "User not found!" });
  }

  res.status(200).json(user);
});

// @route       POST /api/users
// @desc        Create new user
router.post("/", createUserValid, async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  let user = await UserService.search({ email });

  if (user) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }

  user = await UserService.createUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  });

  res.status(200).json({ firstName, lastName, email, phoneNumber });
});

// @route       PUT /api/users/:id
// @desc        Change users credentials
router.put("/:id", async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  let user = await UserService.search({ id: req.params.id });

  if (!user) {
    return res.status(404).json({ error: true, message: "User not found!" });
  }

  user = await UserService.updateUser(req.params.id, {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  });

  res.status(200).json(user);
});

// @route       DELETE /api/users/:id
// @desc        Delete user
router.delete("/:id", async (req, res) => {
  const user = await UserService.search({ id: req.params.id });

  if (!user) {
    return res.status(404).json({ error: true, message: "User not found!" });
  }

  UserService.deleteUser(req.params.id);

  res.status(200).json(`User with ID ${req.params.id} removed!`);
});

module.exports = router;
