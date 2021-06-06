const mongoose = require("mongoose");
const { Schema } = mongoose;

const WatchLaterSchema = new Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  playlist: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
    },
  ],
});

const WatchLater = mongoose.model("WatchLater", WatchLaterSchema);

module.exports = { WatchLater };
