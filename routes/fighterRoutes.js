const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
  createFighterValid,
  updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");

const router = Router();

exports.fighter = {
  id: "",
  name: "",
  health: 100,
  power: 0,
  defense: 1, // 1 to 10
};

// @route       GET /api/fighters
// @desc        Get all fighters
router.get("/", async (req, res) => {
  const allFighters = FighterService.getAllFighters();

  res.status(200).json(allFighters);
});

// @route       GET /api/fighters/:id
// @desc        Get fighter by ID
router.get("/:id", async (req, res) => {
  const fighter = await FighterService.search({ id: req.params.id });

  if (!fighter) {
    return res.status(404).json({ error: true, message: "Fighter not found!" });
  }

  res.status(200).json(fighter);
});

// @route       POST /api/fighters
// @desc        Create new fighter
router.post("/", createFighterValid, async (req, res) => {
  const { name, health, power, defense } = req.body;
  let fighter;
  /*

  let user = await UserService.search({ email });

  if (user) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists" });
  }
  */

  fighter = await FighterService.createFighter({
    name,
    health,
    power,
    defense,
  });

  res.status(200).json(fighter);
});

// @route       PUT /api/fighters/:id
// @desc        Change fighters credentials
router.put("/:id", async (req, res) => {
  const { name, health, power, defense } = req.body;

  let figher;
  /*
  let user = await UserService.search({ id: req.params.id });

  if (!user) {
    return res.status(404).json({ error: true, message: "User not found!" });
  }
  */

  figher = await FighterService.updateFighter(req.params.id, {
    name,
    health,
    power,
    defense,
  });

  res.status(200).json(figher);
});

// @route       DELETE /api/fighters/:id
// @desc        Delete fighter
router.delete("/:id", async (req, res) => {
  FighterService.deleteFighter(req.params.id);
  res.status(200).json(`Fighter with ID ${req.params.id} removed!`);
});

module.exports = router;
