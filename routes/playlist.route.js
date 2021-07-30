const { PlayList } = require("../models/playlist.model");
const express = require("express");
const { each } = require("lodash");
const { verifyToken } = require("../middleware/verifytoken");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const playlist = await PlayList.find({});
    res.status(200).json({ success: true, playlist });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

router.use(verifyToken);

router
  .route("/:userId")
  .get(async (req, res) => {
    let { userId } = req;
    try {
      let playlists = await PlayList.findOne({ uid: userId });
      if (playlists) {
        playlists = await playlists
          .populate("playlist.videos._id")
          .execPopulate();
        const NormalizedPlaylist = playlists.playlist.map((each) => {
          return {
            _id: each._id,
            name: each.name,
            videos: each.videos.map((item) => item._id._doc),
          };
        });
        return res.status(200).json({
          success: true,
          playlists: NormalizedPlaylist,
        });
      }
      return res.status(400).json({
        success: false,
        message: "playlist Not Found Please Sign Up!!",
      });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  })
  .post(async (req, res) => {
    let { userId } = req;
    let playlists = await PlayList.findOne({ uid: userId });
    const { name, videoId } = req.body;
    try {
      playlists.playlist.push({ name, videos: [{ _id: videoId }] });
      playlists = await playlists.save();
      playlists = await playlists
        .populate("playlist.videos._id")
        .execPopulate();
      const NormalizedPlaylist = playlists.playlist.map((each) => {
        return {
          _id: each._id,
          name: each.name,
          videos: each.videos.map((item) => item._id._doc),
        };
      });
      res.status(201).json({
        success: true,
        playlist: NormalizedPlaylist[NormalizedPlaylist.length - 1],
      });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  });
router
  .route("/:userId/:playlistId")
  .get(async (req, res) => {
    let { userId } = req;
    let playlists = await PlayList.findOne({ uid: userId });
    const { playlistId } = req.params;
    playlists = await playlists.populate("playlist.videos._id").execPopulate();
    const NormalizedPlaylist = playlists.playlist.map((each) => {
      return {
        _id: each._id,
        name: each.name,
        videos: each.videos.map((item) => item._id._doc),
      };
    });
    let playlist = NormalizedPlaylist.find((each) => each._id == playlistId);
    res.status(200).json({ success: true, playlist });
  })
  .post(async (req, res) => {
    let { userId } = req;
    let playlists = await PlayList.findOne({ uid: userId });
    const { videoId } = req.body;
    const { playlistId } = req.params;
    try {
      let playlist = playlists.playlist.find((each) => each._id == playlistId);
      if (playlist) {
        playlist.videos.push({ _id: videoId });
        playlists = await playlists.save();
        return res.status(201).json({ success: true, videoId });
      }
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  })
  .delete(async (req, res) => {
    let { userId } = req;
    let playlists = await PlayList.findOne({ uid: userId });
    const { playlistId } = req.params;
    try {
      playlists.playlist.pull({ _id: playlistId });
      playlists = await playlists.save();
      return res.status(200).json({ success: true, playlistId });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  });
router.route("/:userId/:playlistId/:videoId").delete(async (req, res) => {
  let { userId } = req;
  let playlists = await PlayList.findOne({ uid: userId });
  const { playlistId, videoId } = req.params;
  try {
    const playlist = playlists.playlist.find((each) => each._id == playlistId);
    if (playlist) {
      playlist.videos.pull({ _id: videoId });
      playlists = await playlists.save();
      return res.status(200).json({ success: true, videoId, playlistId });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});
module.exports = router;
