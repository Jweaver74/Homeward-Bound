const withAuth = require("../utils/auth");
const router = require("express").Router();
//GET all itemsand join with user data
router.get("/", async (req, res) => {
  try {
    const petData = await Pet.findAll({
      include: [
        {
          model: User,
          attributes: ["username", "email"],
        },
      ],
    });
    // Serialize data so the template can read it
    const pets = petData.map((pet) => pet.get({ plain: true }));

    if (req.session.logged_in) {
      const notificationData = await Notification.findAll({
        where: {
          pet_owner: req.session.user_id,
        },
        include: [
          {
            model: Pet,
            attributes: ["name"],
          },
        ],
      });

      const notifications = notificationData.map((n) => n.get({ plain: true }));
      res.render("homepage", {
        pets,
        notifications,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render("homepage", {
        pets,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET one item
router.get("/pet/:id", async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    // Serialize data so the template can read it
    const pet = petData.get({ plain: true });
    if (req.session.logged_in) {
      const notificationData = await Notification.findAll({
        where: {
          pet_owner: req.session.user_id,
        },
        include: [
          {
            model: Pet,
            attributes: ["name"],
          },
        ],
      });

      const notifications = notificationData.map((n) => n.get({ plain: true }));
      res.render("single-pet", {
        pet,
        notifications,
        logged_in: req.session.logged_in,
      });
    } else {
      res.render("single-pet", {
        pet,
        logged_in: req.session.logged_in,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET login
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.router("signup");
});

module.exports = router;
