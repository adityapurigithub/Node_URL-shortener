import express from "express";
import db from "./config/mongoose.js";
import ShortURL from "./models/shortURL.js";
const app = express();

const port = 8080;

app.set("view engine", "ejs");
app.use(express.static("views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortURL = await ShortURL.find({});
  res.render("index", { shortURL });
});

app.post("/shortUrl", async (req, res) => {
  await ShortURL.create({
    full: req.body.fullURL,
  });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortUrlData = await ShortURL.findOne({ short: req.params.shortUrl });

  if (shortUrlData == null) {
    return res.render("notFound");
  }

  shortUrlData.clicks++;

  await shortUrlData.save();

  res.redirect(shortUrlData.full);
});

app.listen(port, (err) => {
  if (err) {
    return console.warn(`Err in running server : ${err}`);
  }

  console.log(`Server up on Port ...${port}`);
});
