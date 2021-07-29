const { LikedVideo } = require("../models/likedVideo.model");
const express = require("express");
const { verifyToken } = require("../middleware/verifytoken");
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

router.use(verifyToken);

router.param("userId", async (req, res, next, userId) => {
  try {
    const likedVideos = await LikedVideo.findOne({ uid: userId });
    if (likedVideos) {
      req.likedVideos = likedVideos;
      return next();
    }
    return res.status(400).json({
      success: false,
      message: "LikedVideos Not Found Please Sign Up!!",
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router
  .route("/:userId")
  .get(async (req, res) => {
    let { likedVideos } = req;
    try {
      likedVideos = await likedVideos.populate("playlist._id").execPopulate();
      const NormalizedLikedVideos = likedVideos.playlist.map(
        (item) => item._id._doc
      );
      res
        .status(200)
        .json({ success: true, likedVideos: NormalizedLikedVideos });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  })
  .post(async (req, res) => {
    let { likedVideos } = req;
    const { videoId } = req.body;
    try {
      if (likedVideos.playlist.some((each) => each._id == videoId)) {
        return res.json({ success: false, message: "Video is Already Liked" });
      }
      likedVideos.playlist.push({ _id: videoId });
      likedVideos = await likedVideos.save();
      likedVideos = await likedVideos.populate("playlist._id").execPopulate();
      const NormalizedLikedVideos = likedVideos.playlist.map(
        (item) => item._id._doc
      );
      const video = NormalizedLikedVideos.find((each) => each._id == videoId);
      if (video) {
        res.status(201).json({ success: true, video });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
router.route("/:userId/:videoId").delete(async (req, res) => {
  let { likedVideos } = req;
  const { videoId } = req.params;
  try {
    const video = likedVideos.playlist.find((each) => each._id == videoId);
    if (video) {
      likedVideos.playlist.pull({ _id: videoId });
      await likedVideos.save();
      res.status(200).json({ success: true, video });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
