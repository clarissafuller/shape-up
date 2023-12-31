const router = require("express").Router();
const { Routine, Exercise, RoutineExercise } = require("../models");

// GET all routines for routine page
router.get("/", async (req, res) => {
  try {
    const dbRoutineData = await Routine.findAll();

    const routines = dbRoutineData.map((routine) =>
      routine.get({ plain: true })
    );

    res.render("routine", { routines, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// routine
router.get("/myroutines", async (req, res) => {
  try {
    const dbRoutineData = await Routine.findAll({
      include: [
        {
          model: Exercise,
          through: RoutineExercise,
          // as: "Workout",
          // attributes: [
          //   "name",
          //   "type",
          //   "muscle",
          //   "equipment",
          //   "difficulty",
          //   "instructions",
          // ],
        },
      ],
    });

    const routines = dbRoutineData.map((routine) =>
      routine.get({ plain: true })
    );
    res.render("myroutines", {
      routines,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one routine
router.get("/routine/:id", async (req, res) => {
  try {
    const dbRoutineData = await Routine.findByPk(req.params.id, {
      include: [
        {
          model: Exercise,
          attributes: ["name", "muscle", "equipment", "instructions"],
        },
      ],
    });

    const routine = dbRoutineData.get({ plain: true });
    res.render("routine", { routine });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
