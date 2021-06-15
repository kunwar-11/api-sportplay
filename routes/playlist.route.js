const { PlayList } = require("../models/playlist.model");
const express = require("express");
const { each } = require("lodash");
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

router.param("userId", async (req, res, next, userId) => {
  try {
    const playlists = await PlayList.findOne({ uid: userId });
    if (!playlists) {
      return res.status(400).json({
        success: false,
        message: "playlist Not Found Please Sign Up!!",
      });
    }
    req.playlists = playlists;
    next();
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router
  .route("/:userId")
  .get(async (req, res) => {
    let { playlists } = req;
    try {
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
      res.status(200).json({
        success: true,
        playlists: NormalizedPlaylist,
      });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  })
  .post(async (req, res) => {
    let { playlists } = req;
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
  .post(async (req, res) => {
    let { playlists } = req;
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
    let { playlists } = req;
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
  let { playlists } = req;
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
