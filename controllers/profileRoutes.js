const router = require('express').Router();
const { User, Pet,Notification} = require('../../models');
const withAuth = require('../../utils/auth');

// GET /api/pets
router.get('/', withAuth, async (req, res) => {
    try {
        const petData = await Pet.findAll({
            where:{ user_id: req.session.user_id},
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
            ],
        });

        const userdata = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Pet }],
        });

       const notificationData = await Notification.findAll({
        where:{ 
            pet_owner: req.session.user_id,
        },
        include: [
        {
        model: Pet,
        attributes: ['name'],
        },
        ],
        });

const notifications = notificationData.map((n) => n.get({ plain: true }));
const pets = petData.map((pet) => pet.get({ plain: true }));
const user = userdata.get({ plain: true });

res.render('profile', {
    user,
    pets,
    notifications,
    logged_in: req.session.logged_in,
});
} catch (err) {
    res.status(500).json(err);
}
});

// GET /api/pets/:id
router.put('/update/:id', withAuth, async (req, res) => {
    try {
        const petData = await Pet.update(
            {
                name: req.body.name,
                breed: req.body.breed,
                age: req.body.age,
                description: req.body.description,
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
}
);

module.exports = router;


       