const { UnlikedVideos } = require("../models/unlikedvideo.model");
const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const unLikedVideos = await UnlikedVideos.find({});
    res.status(200).json({ success: true, unLikedVideos });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to fetch unLiked Videos ! PLease try again",
    });
  }
});

router.param("userId", async (req, res, next, userId) => {
  try {
    const unLikedVideos = await UnlikedVideos.findOne({ uid: userId });
    if (!unLikedVideos) {
      return res.status(400).json({
        success: false,
        message: "unLikedVideos Not Found Please Sign Up!!",
      });
    }
    req.unLikedVideos = unLikedVideos;
    next();
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router
  .route("/:userId")
  .get(async (req, res) => {
    let { unLikedVideos } = req;
    try {
      unLikedVideos = await unLikedVideos
        .populate("playlist._id")
        .execPopulate();
      const NormalizedUnLikedVideos = unLikedVideos.playlist.map(
        (item) => item._id._doc
      );
      res
        .status(200)
        .json({ success: true, unlikedVideos: NormalizedUnLikedVideos });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  })
  .post(async (req, res) => {
    let { unLikedVideos } = req;
    const { videoId } = req.body;
    try {
      if (unLikedVideos.playlist.some((each) => each._id == videoId)) {
        return res.json({ success: false, message: "Video is Already Liked" });
      }
      unLikedVideos.playlist.push({ _id: videoId });
      unLikedVideos = await unLikedVideos.save();
      unLikedVideos = await unLikedVideos
        .populate("playlist._id")
        .execPopulate();
      const NormalizedUnLikedVideos = unLikedVideos.playlist.map(
        (item) => item._id._doc
      );
      const video = NormalizedUnLikedVideos.find((each) => each._id == videoId);
      if (video) {
        res.status(201).json({ success: true, video });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
router.route("/:userId/:videoId").delete(async (req, res) => {
  let { unLikedVideos } = req;
  const { videoId } = req.params;
  try {
    const video = unLikedVideos.playlist.find((each) => each._id == videoId);
    if (video) {
      unLikedVideos.playlist.pull({ _id: videoId });
      await unLikedVideos.save();
      res.status(200).json({ success: true, video });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
