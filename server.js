// const path = require("path");
// const express = require("express");
// const session = require("express-session");
// const exphbs = require("express-handlebars");
// const SequelizeStore = require("connect-session-sequelize")(session.Store);

// const routes = require("./controllers");
// const sequelize = require("./config/connection");
// const helpers = require("./utils/helpers");

// const app = express();
// const PORT = process.env.PORT || 3001;

// const sess = {
//   secret: "Super secret secret",
//   cookie: {},
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize,
//   }),
// };

// app.use(session(sess));

// const hbs = exphbs.create({ helpers });

// app.engine("handlebars", hbs.engine);
// app.set("view engine", "handlebars");

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, "public")));

// app.use(routes);

// // Serve uploaded images
// app.use("/images", express.static(path.join(__dirname, "public/images")));

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log("Now listening"));
// });


const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const multer = require("multer");
const sharp = require("sharp");

const routes = require("./controllers");
const sequelize = require("./config/connection");
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Set up multer for handling image file upload
const storage = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    const petName = req.body.name.toLowerCase().replace(/\s/g, "-"); // Generate a formatted pet name
    const fileName = `${petName}.png`; // Set the new file name with the PNG extension
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Handle the /profile/addPet route
app.post("/profile/addPet", upload.single("image"), async (req, res) => {
  const { name, type, breed, age, date_added, description, last_seenLocation, owner_name, owner_phone, owner_email, reward } = req.body;
  const image = req.file; // Uploaded image file information

  try {
    const imageBuffer = await sharp(image.path)
      .resize(800, 600) // Resize the image as desired
      .png() // Convert the image to PNG format
      .toBuffer();

    const newFileName = image.filename.replace(/\.\w+$/, ".png"); // Update the file name to use the PNG extension

    await sharp(imageBuffer).toFile(`public/images/${newFileName}`);

    // Process the pet data and the image file as needed

    // ...

    res.sendStatus(200); // Respond with a success status code
  } catch (error) {
    console.error(error);
    res.sendStatus(500); // Respond with an error status code
  }
});

// Serve uploaded images
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});