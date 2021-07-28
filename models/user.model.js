const mongoose = require("mongoose");
const { Schema } = mongoose;
const { user } = require("../dataset");
const { LikedVideo } = require("./likedVideo.model");
const { History } = require("./history.model");
const { Note } = require("./notes.model");
const { PlayList } = require("./playlist.model");
const { UnlikedVideos } = require("./unlikedvideo.model");
const { WatchLater } = require("./watchlater.model");
const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, "First Name Required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name Required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
    unique: [true, "email alredy exists"],
    validate: {
      validator: (v) => {
        return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        );
      },
      message: (props) => `${props.value} is not a valid Email Id`,
    },
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

const User = mongoose.model("User", UserSchema);

const addUserToDb = () => {
  user.forEach(async (user) => {
    const NewUser = new User(user);
    try {
      await NewUser.save();
      const NewLikedVideo = new LikedVideo({ uid: NewUser._id, playlist: [] });
      await NewLikedVideo.save();
      const NewHistory = new History({ uid: NewUser._id, playlist: [] });
      await NewHistory.save();
      const NewUnlikedVideos = new UnlikedVideos({
        uid: NewUser._id,
        playlist: [],
      });
      await NewUnlikedVideos.save();
      const NewWatchLater = new WatchLater({ uid: NewUser._id, playlist: [] });
      await NewWatchLater.save();
      const NewPlayList = new PlayList({ uid: NewUser._id, playlist: [] });
      await NewPlayList.save();
      const NewNote = new Note({ uid: NewUser._id, notes: [] });
      await NewNote.save();
    } catch (error) {
      console.error("cannot add to Databse", error);
    }
  });
};

module.exports = { User, addUserToDb };
