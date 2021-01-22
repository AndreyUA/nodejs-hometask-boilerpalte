const { Router } = require("express");
const UserService = require("../services/userService");
const {
  createUserValid,
  updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      const data = UserService.getAllUsers();

      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.get(
  "/:id",
  (req, res, next) => {
    try {
      const data = UserService.search({ id: req.params.id });

      if (!data) {
        throw Error("User not found");
      }

      res.data = data;
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

router.post(
  "/",
  createUserValid,
  (req, res, next) => {
    if (res.err) {
      return res.status(400).json({ error: true, message: res.err.message });
    }

    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const data = UserService.createUser({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });

    res.data = data;

    next();
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateUserValid,
  (req, res, next) => {
    if (res.err) {
      return res.status(400).json({ error: true, message: res.err.message });
    }

    const { firstName, lastName, phoneNumber, password } = req.body;

    const updateUser = UserService.updateUser(req.params.id, {
      firstName,
      lastName,
      phoneNumber,
      password,
    });

    res.data = updateUser;

    next();
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      const user = UserService.search({ id: req.params.id });

      if (!user) {
        throw Error("User not found");
      }

      UserService.deleteUser(req.params.id);

      res.data = { message: `User ${user.email} removed!` };
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
