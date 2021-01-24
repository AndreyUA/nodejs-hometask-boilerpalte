const { fighter } = require("../models/fighter");
const FighterService = require("../services/fighterService");

const createFighterValid = (req, res, next) => {
  try {
    const { name, power, defense } = req.body;

    if (req.body.id) {
      throw Error("You can't declare id");
    }

    if (name === "" || !name) {
      throw Error("Please enter a valid fighter name");
    }

    if (!Number.isInteger(+power) || +power < 1 || +power > 10) {
      throw Error("Please enter a power value from 1 to 10");
    }

    if (!Number.isInteger(+defense) || +defense < 1 || +defense > 10) {
      throw Error("Please enter a defense value from 1 to 10");
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
};

const updateFighterValid = (req, res, next) => {
  try {
    const { power, defense } = req.body;

    if (!Number.isInteger(+power) || +power < 1 || +power > 10) {
      throw Error("Please enter a power value from 1 to 10");
    }

    if (!Number.isInteger(+defense) || +defense < 1 || +defense > 10) {
      throw Error("Please enter a defense value from 1 to 10");
    }

    const existFighter = FighterService.search({ id: req.params.id });

    if (Object.keys(existFighter).length === 0) {
      throw Error("Fighter not found");
    }
  } catch (err) {
    res.err = err;
  } finally {
    next();
  }
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
