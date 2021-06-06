const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
  uid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  notes: [
    {
      videoId: { type: mongoose.Schema.Types.ObjectId, ref: "Video" },
      text: {
        type: String,
        required: [true, "Note Cannot be empty"],
      },
    },
  ],
});

const Note = mongoose.model("Note", NotesSchema);

module.exports = { Note };
