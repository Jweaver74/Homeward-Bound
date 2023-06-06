const router = require('express').Router();
const { User, Pet, Status, Notification} = require('../models');
const withAuth = require('../utils/auth');

// Include the file system module which provides an API for interacting with the file system
const fs = require('fs');
// Include the path module which provides utilities for working with file and directory paths
const path = require('path');
// Include the sharp module which is a high-performance image processing library
const sharp = require('sharp');
// Include the multer module which is a middleware for handling multipart/form-data, primarily used for uploading files
const multer = require('multer');

// Define the storage for multer which gives full control on storing files to disk.
// The destination is the folder where the uploaded files get stored.
// The filename is the name under which the file will be saved. Here we prefix it with a timestamp for uniqueness.
const storage = multer.diskStorage({
  // Set the destination of uploaded files to './public/images'
  destination: function(req, file, cb) {
    cb(null, './public/images');
  },
  // Set the filename of uploaded files to 'currentTimestamp-originalFilename'
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

// Define the multer upload variable with the storage details.
// This 'upload' can be used as middleware in the routes where we expect file uploads
const upload = multer({ storage: storage })

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

        const userData = await User.findByPk(req.session.user_id, {
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
const user = userData.get({ plain: true });

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

router.get('/addPet', withAuth, async (req, res) => {
    console.log('test');
    const petData = req.session.user_id;
    res.render('addPet', { petData, loggedIn: req.session.loggedIn });
  });
  


router.post("/addPet", upload.single("image"), withAuth, async (req, res) => {
  try {
    // Create new pet entry in database
    const newPet = await Pet.create({
      user_id: req.session.user_id,
      name: req.body.name,
      type: req.body.type,
      breed: req.body.breed,
      age: req.body.age,
      date_added: req.body.date_added,
      description: req.body.description,
      last_seenLocation: req.body.last_seenLocation,
      owner_name: req.body.owner_name,
      owner_phone: req.body.owner_phone,
      owner_email: req.body.owner_email,
      reward: req.body.reward,
      image: req.file.path, // Save the initial path for now
    });
   
    // Specify the new file path
    const newFilePath = path.join("public", "images", `${newPet.name}.png`);

    // Convert image to png using sharp
    await sharp(req.file.path).png().toFile(newFilePath);

    // Delete the original image file
    fs.unlinkSync(req.file.path);

    // Prepare a file path that can be used in URLs
    const urlFilePath = newFilePath
      .split(path.sep)
      .join("/")
      .replace("public", "");

    // Update the pet's image path in the database
    newPet.image = urlFilePath; // Use urlFilePath instead of newFilePath
    await newPet.save();

    const userPetData = await Pet.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: {
        model: User,
        attributes: {
          exclude: ["password"],
        },
      },
    });
    const pets = userPetData.map((pet) => pet.get({ plain: true }));

    res.render("profile", { pets, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

  router.get('/updatePet/:id', withAuth, async (req, res) => {
    try {
      const petData = await Pet.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: {
              exclude: ['password'],
            },
          },
        ],
      });
    
      const pet = petData.get({ plain: true });
      res.render('updatePet', { pet, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.put('/updatePet/:id', upload.single("image"), withAuth, async (req, res) => {
    try {
      const petId = req.params.id;
      const updatedPetData = req.body;

      const [numAffectedRows] = await Pet.update(updatedPetData, {
        where: {
          id: petId,
        },
      });

  
      if (numAffectedRows === 0) {
        res.status(404).json({ message: 'No pet with this id!' });
        return;
      }
  
      res.status(200).json({ message: 'Pet Updated' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

router.delete('/deletePet/:id', withAuth, async (req, res) => {
    try {
      const petData = await Pet.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!petData) {
        res.status(404).json({ message: 'No pet found with this id!' });
        return;
      }
      
      res.status(200).json(petData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err); 
    }
  });

module.exports = router;


       