const { initializeConnection } = require("./Datbase/db.connnect");
const { addVideosToDb } = require("./models/video.model");
const { addUserToDb } = require("./models/user.model");
const videos = require("./routes/video.route");
const likedVideos = require("./routes/likedvideo.route");
const unlikedVideos = require("./routes/unlikedvideo.route");
const historyVideos = require("./routes/history.route");
const watchlater = require("./routes/watchlater.route");
const notes = require("./routes/notes.route");
const playlist = require("./routes/playlist.route");
const authentication = require("./routes/auth.route");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 8000;

initializeConnection();
//addVideosToDb();
//addUserToDb();
app.use("/videos", videos);
app.use("/likedvideos", likedVideos);
app.use("/unlikedvideos", unlikedVideos);
app.use("/history", historyVideos);
app.use("/watchlater", watchlater);
app.use("/notes", notes);
app.use("/playlists", playlist);
app.use("/auth", authentication);
app.get("/", (req, res) => {
  res.send("hello this is an  API for SPORTPLAY");
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "page ont found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "something went wrong",
    error: err.message,
  });
});

app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));
