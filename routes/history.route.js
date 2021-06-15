const { History } = require("../models/history.model");
const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const historyVideos = await History.find({});
    res.status(200).json({ success: true, historyVideos });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to fetch History Videos ! PLease try again",
    });
  }
});

router.param("userId", async (req, res, next, userId) => {
  try {
    const historyVideos = await History.findOne({ uid: userId });
    if (!historyVideos) {
      return res.status(400).json({
        success: false,
        message: "historyVideos Not Found Please Sign Up!!",
      });
    }
    req.historyVideos = historyVideos;
    next();
  } catch (error) {
    res.status(404).json({ success: false, message: error.message });
  }
});

router
  .route("/:userId")
  .get(async (req, res) => {
    let { historyVideos } = req;
    try {
      historyVideos = await historyVideos
        .populate("playlist._id")
        .execPopulate();
      const NormalizedHistoryVideos = historyVideos.playlist.map(
        (item) => item._id._doc
      );
      res
        .status(200)
        .json({ success: true, historyVideos: NormalizedHistoryVideos });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  })
  .post(async (req, res) => {
    let { historyVideos } = req;
    const { videoId } = req.body;
    try {
      if (historyVideos.playlist.some((each) => each._id == videoId)) {
        return res.json({ success: false, message: "Video is Already Liked" });
      }
      historyVideos.playlist.push({ _id: videoId });
      historyVideos = await historyVideos.save();
      historyVideos = await historyVideos
        .populate("playlist._id")
        .execPopulate();
      const NormalizedHistoryVideos = historyVideos.playlist.map(
        (item) => item._id._doc
      );
      const video = NormalizedHistoryVideos.find((each) => each._id == videoId);
      if (video) {
        res.status(201).json({ success: true, video });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
router.route("/:userId/:videoId").delete(async (req, res) => {
  let { historyVideos } = req;
  const { videoId } = req.params;
  try {
    const video = historyVideos.playlist.find((each) => each._id == videoId);
    if (video) {
      historyVideos.playlist.pull({ _id: videoId });
      await historyVideos.save();
      res.status(200).json({ success: true, video });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;
