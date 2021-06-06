const mongoose = require("mongoose");
const { Schema } = mongoose;

const PlayListSchema = new Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  playlist: [
    {
      name: {
        type: String,
        required: [true, "Playlist Name is Required"],
      },
      videos: [
        {
          videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
        },
      ],
    },
  ],
});

const PlayList = mongoose.model("PlayList", PlayListSchema);

module.exports = { PlayList };
