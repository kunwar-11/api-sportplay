const mongoose = require("mongoose");
const { Schema } = mongoose;

const HistorySchema = new Schema({
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

const History = mongoose.model("History", HistorySchema);

module.exports = { History };
