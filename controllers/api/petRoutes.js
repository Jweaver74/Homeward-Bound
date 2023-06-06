const router = require("express").Router();
const { Pet, User, Notification, Status } = require("../../models");
const withAuth = require("../../utils/auth");

// GET /api/pets
router.get("/", withAuth, async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

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
    const pet = petData.get({ plain: true });
    const user = req.session.user_id;

    res.render("single-pet", {
      pet,
      user,
      notifications,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET /api/pets/:id
router.put("/isFound/:id", async (req, res) => {
  try {
    const petData = await Pet.update(
      {
        isFound: req.body.isFound,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(petData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.post("/", withAuth, async (req, res) => {
  try {
    const newPet = await Pet.create({
      name: req.body.name,
      species: req.body.species,
      description: req.body.description,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPet);
  } catch (err) {
    res.status(400).json(err);
  }
});


// DELETE /api/pets/:id
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const petData = await Pet.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!petData) {
      res.status(404).json({ message: "No pet found with this id!" });
      return;
    }

    res.status(200).json(petData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
