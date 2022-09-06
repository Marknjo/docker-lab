const express = require("express");
const axios = require("axios").default;
const mongoose = require("mongoose");

const Favorite = require("./models/favorite");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.status(200).json({ status: "success" });
});

app.get("/favorites", async (req, res) => {
  const favorites = await Favorite.find();
  res.status(200).json({
    favorites: favorites,
  });
});

app.post("/favorites", async (req, res) => {
  const favName = req.body.name;
  const favType = req.body.type;
  const favUrl = req.body.url;

  try {
    if (favType !== "movie" && favType !== "character") {
      throw new Error('"type" should be "movie" or "character"!');
    }
    const existingFav = await Favorite.findOne({ name: favName });
    if (existingFav) {
      throw new Error("Favorite exists already!");
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }

  const favorite = new Favorite({
    name: favName,
    type: favType,
    url: favUrl,
  });

  try {
    await favorite.save();
    res
      .status(201)
      .json({ message: "Favorite saved!", favorite: favorite.toObject() });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.get("/movies", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/films");
    res.status(200).json({ movies: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

app.get("/people", async (req, res) => {
  try {
    const response = await axios.get("https://swapi.dev/api/people");
    res.status(200).json({ people: response.data });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong." });
  }
});

async function initDb() {
  try {
    const options = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    // const db_user = process.env.ME_CONFIG_MONGODB_ADMINUSERNAME || "root";
    // const db_pass = process.env.ME_CONFIG_MONGODB_ADMINPASSWORD || "secret";
    const db_host = "mongodb";
    // mongodb://${db_user}:${db_pass}@${db_host}:27017/swfavorites
    const db_conn_str = `mongodb://${db_host}:27017/swfavorites`;

    await mongoose.connect(db_conn_str, options);
    console.log(`Mongodb connection successful 😃😃😃`);
  } catch (err) {
    console.log(`Mongodb connection failed 😢😢😢: ${err.message} \n`);
    console.log(err);
    process.exit(1);
  }
}

initDb();

/// Start app if everything is okay
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
