const { Video } = require("../models/video.model");
const express = require("express");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const videos = await Video.find({});
    res.status(200).json({ success: true, videos });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Cannot Fetch Videos , Please Try Again",
    });
  }
});

router.param("videoId", async (req, res, next, videoId) => {
  const video = await Video.findById(videoId);
  if (!video) {
    return res.status(400).json({ success: false, message: "Video not found" });
  }
  req.video = video;
  next();
});

router.route("/:videoId").get((req, res) => {
  const { video } = req;
  video.__v = undefined;
  res.status(200).json({ success: true, video });
});

module.exports = router;
