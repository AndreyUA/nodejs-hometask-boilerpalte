const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");

const router = Router();

router.get(
  "/",
  (req, res, next) => {
    try {
      const data = FighterService.getAllFighters();

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
      const fighter = FighterService.search({ id: req.params.id });

      res.data = fighter;
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
  createFighterValid,
  (req, res, next) => {
    if (res.err) {
      return res.status(400).json({ error: true, message: res.err.message });
    }
    const { name, power, defense } = req.body;

    const fighter = FighterService.createFighter({
      name,
      health: 100,
      power,
      defense,
    });

    res.data = fighter;

    next();
  },
  responseMiddleware
);

router.put(
  "/:id",
  updateFighterValid,
  (req, res, next) => {
    if (res.err) {
      return res.status(400).json({ error: true, message: res.err.message });
    }

    const { health, power, defense } = req.body;

    const figher = FighterService.updateFighter(req.params.id, {
      health,
      power,
      defense,
    });

    res.data = figher;

    next();
  },
  responseMiddleware
);

router.delete(
  "/:id",
  (req, res, next) => {
    try {
      FighterService.deleteFighter(req.params.id);

      res.data = { message: `Fighter removed!` };
    } catch (err) {
      res.err = err;
    } finally {
      next();
    }
  },
  responseMiddleware
);

module.exports = router;
