const router = require("express").Router();
const { Notification } = require("../../models");

// GET /api/notifications
router.post("/", async (req, res) => {
  try {
    const newNotification = await Notification.create({
      pet_id: req.body.pet_id,
      pet_owner: req.body.pet_owner,
      found_user: req.body.found_user,
    });

    res.status(200).json(newNotification);
  } catch (err) {
    res.status(400).json(err);
  }
});

// DELETE /api/notifications/:id
router.delete("/:id", async (req, res) => {
  try {
    const Notification = await Notification.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(Notification);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
