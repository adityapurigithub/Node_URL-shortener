import mongoose from "mongoose";
import shortid from "shortid";

const shortURLSchema = new mongoose.Schema(
  {
    full: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default new mongoose.model("ShortURL", shortURLSchema);
