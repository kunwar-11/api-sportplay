const mongoose = require("mongoose");
const { Schema } = mongoose;
const { videos } = require("../dataset");

const VideoSchema = new Schema({
  _id: {
    type: String,
    required: [true, "playId is required"],
  },
  thumbnail: {
    type: String,
    required: [true, "Thumbnail is required"],
  },
  image: {
    type: String,
    required: [true, "Channel Profile Image is required"],
  },
  title: {
    type: String,
    required: [true, "Video Title is Required"],
  },
  channel: {
    type: String,
    required: [true, "Channel Name is Required"],
  },
  views: {
    type: Number,
  },
  date: {
    type: String,
  },
});

const Video = mongoose.model("Video", VideoSchema);

const addVideosToDb = () => {
  videos.forEach(async (video) => {
    const NewVideo = new Video(video);
    try {
      await NewVideo.save();
    } catch (error) {
      console.error("Error Adding Products", error);
    }
  });
};

module.exports = { Video, addVideosToDb };
