const { WatchLater } = require("../models/watchlater.model");
const express = require("express");
const { verifyToken } = require("../middleware/verifytoken");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const watchlater = await WatchLater.find({});
    res.status(200).json({ success: true, watchlater });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to fetch watchlater Videos ! PLease try again",
    });
  }
});

router.use(verifyToken);

router.param("userId", async (req, res, next, userId) => {
  try {
    const watchlater = await WatchLater.findOne({ uid: userId });
    if (!watchlater) {
      return res.status(400).json({
        success: false,
        message: "watchlater Not Found Please Sign Up!!",
      });
    }
    req.watchlater = watchlater;
    next();
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router
  .route("/:userId")
  .get(async (req, res) => {
    let { userId } = req;
    try {
      let watchlater = await WatchLater.findOne({ uid: userId });
      if (watchlater) {
        watchlater = await watchlater.populate("playlist._id").execPopulate();
        const NormalizedWatchlater = watchlater.playlist.map(
          (item) => item._id._doc
        );
        return res
          .status(200)
          .json({ success: true, watchlater: NormalizedWatchlater });
      }
      return res.status(400).json({
        success: false,
        message: "watchlater Not Found Please Sign Up!!",
      });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  })
  .post(async (req, res) => {
    let { userId } = req;
    let watchlater = await WatchLater.findOne({ uid: userId });
    const { videoId } = req.body;
    try {
      if (watchlater.playlist.some((each) => each._id == videoId)) {
        return res.json({ success: false, message: "Video is Already Liked" });
      }
      watchlater.playlist.push({ _id: videoId });
      watchlater = await watchlater.save();
      watchlater = await watchlater.populate("playlist._id").execPopulate();
      const NormalizedWatchlater = watchlater.playlist.map(
        (item) => item._id._doc
      );
      const video = NormalizedWatchlater.find((each) => each._id == videoId);
      if (video) {
        res.status(201).json({ success: true, video });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
router.route("/:userId/:videoId").delete(async (req, res) => {
  let { userId } = req;
  let watchlater = await WatchLater.findOne({ uid: userId });
  const { videoId } = req.params;
  try {
    const video = watchlater.playlist.find((each) => each._id == videoId);
    if (video) {
      watchlater.playlist.pull({ _id: videoId });
      await watchlater.save();
      res.status(200).json({ success: true, video });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
