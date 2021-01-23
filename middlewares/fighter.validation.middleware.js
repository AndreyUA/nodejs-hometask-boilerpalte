const { fighter } = require("../models/fighter");
const FighterService = require("../services/fighterService");

const createFighterValid = (req, res, next) => {
  try {
    const { name, power, defense } = req.body;

    if (name === "") {
      throw Error("Please enter a valid fighter name");
    }

    if (!Number.isInteger(+power) || +power < 1 || +power > 10) {
      throw Error("Please enter a power value from 1 to 10");
    }

    if (!Number.isInteger(+defense) || +defense < 1 || +defense > 10) {
      throw Error("Please enter a defense value from 1 to 10");
    }

    const existFighter = FighterService.search({ name });

    if (existFighter) {
      throw Error("Fighter already exists");
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
};

const updateFighterValid = (req, res, next) => {
  try {
    const { name, power, defense } = req.body;

    if (!Number.isInteger(+power) || +power < 1 || +power > 10) {
      throw Error("Please enter a power value from 1 to 10");
    }

    if (!Number.isInteger(+defense) || +defense < 1 || +defense > 10) {
      throw Error("Please enter a defense value from 1 to 10");
    }

    const existFighter = FighterService.search({ id: req.params.id });

    if (!existFighter) {
      throw Error("Fighter not found");
    }

    if (existFighter.name !== name) {
      throw Error("You can't change fighter's name");
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
