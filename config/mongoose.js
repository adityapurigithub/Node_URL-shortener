import mongoose from "mongoose";

mongoose.set("strictQuery", false);

mongoose.connect("mongodb://0.0.0.0:27017/url_shortener");

const db = mongoose.connection;

db.on("error", console.error.bind("err in connecting mongoos"));

db.on("open", () => console.log("mongo connected"));

export default db;
