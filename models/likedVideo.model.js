const mongoose = require("mongoose");
const { Schema } = mongoose;

const LikedVideoSchema = new Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  playlist: [
    {
      _id: { type: String, ref: "Video" },
    },
  ],
});

const LikedVideo = mongoose.model("LikedVideo", LikedVideoSchema);

module.exports = { LikedVideo };
