const router = require("express").Router();
const { User, Pet } = require("../models");
const withAuth = require("../utils/auth");

// GET /api/pets
router.get("/:terms", async (req, res) => {
  let convert = req.params.terms.split("+").join(" ");
  console.log("++++++");
  console.log(req.params.terms);
  try {
    // Get all pets and JOIN with user data
    const petData = await Pet.findAll({
      where: { name: convert },
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
    });

    if (petData.length === 0) {
      // No search results found, render the "no-results" page
      return res.render("no-results");
    }
    // Serialize data so the template can read it
    const pets = petData.map((pet) => pet.get({ plain: true }));
    // Pass serialized data and session flag into template
    res.render("search", { pets, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;