const { History } = require("../models/history.model");
const { Video } = require("../models/video.model");
const { extend } = require("lodash");
const express = require("express");
const { verifyToken } = require("../middleware/verifytoken");
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

router.use(verifyToken);

router
  .route("/:userId")
  .get(async (req, res) => {
    let { userId } = req;
    try {
      let historyVideos = await History.findOne({ uid: userId });
      if (historyVideos) {
        historyVideos = await historyVideos
          .populate("playlist._id")
          .execPopulate();
        const NormalizedHistoryVideos = historyVideos.playlist.map(
          (item) => item._id._doc
        );
        return res
          .status(200)
          .json({ success: true, historyVideos: NormalizedHistoryVideos });
      }
      return res.status(400).json({
        success: false,
        message: "historyVideos Not Found Please Sign Up!!",
      });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  })
  .post(async (req, res) => {
    let { userId } = req;
    const { videoId } = req.body;
    let historyVideos = await History.findOne({ uid: userId });
    let currentVideo = await Video.findOne({ _id: videoId });
    try {
      if (currentVideo) {
        currentVideo = extend(currentVideo, { views: currentVideo.views + 1 });
        await currentVideo.save();
      }
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
  let { userId } = req;
  let historyVideos = await History.findOne({ uid: userId });
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
