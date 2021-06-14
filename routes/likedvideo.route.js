const { LikedVideo } = require("../models/likedVideo.model");
const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const likedVideos = await LikedVideo.find({});
    res.status(200).json({ success: true, likedVideos });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to fetch Liked Videos ! PLease try again",
    });
  }
});

router.param("userId", async (req, res, next, userId) => {
  try {
    const likedVideos = await LikedVideo.findOne({ uid: userId });
    if (!likedVideos) {
      return res.status(400).json({
        success: false,
        message: "LikedVideos Not Found Please Sign Up!!",
      });
    }
    req.likedVideos = likedVideos;
    next();
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router.route("/:userId").get(async (req, res) => {
  let { likedVideos } = req;
  try {
    likedVideos = await likedVideos.populate("playlist._id").execPopulate();
    const NormalizedLikedVideos = likedVideos.playlist.map(
      (item) => item._id._doc
    );
    res.status(200).json({ success: true, likedVideos: NormalizedLikedVideos });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

module.exports = router;
