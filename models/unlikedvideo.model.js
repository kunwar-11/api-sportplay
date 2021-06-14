const mongoose = require("mongoose");
const { Schema } = mongoose;

const UnlikedVideoSchema = new Schema({
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

const UnlikedVideos = mongoose.model("UnlikedVideos", UnlikedVideoSchema);

module.exports = { UnlikedVideos };
