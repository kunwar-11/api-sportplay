const { Note } = require("../models/notes.model");
const express = require("express");
const { extend } = require("lodash");
const { verifyToken } = require("../middleware/verifytoken");
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const notes = await Note.find({});
    res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Unable to fetch notes ! PLease try again",
    });
  }
});

router.use(verifyToken);

router
  .route("/:userId")
  .get(async (req, res) => {
    let { userId } = req;
    try {
      let notes = await Note.findOne({ uid: userId });
      if (notes) return res.status(200).json({ success: true, notes });
      return res.status(400).json({
        success: false,
        message: "notes Not Found Please Sign Up!!",
      });
    } catch (error) {
      res.status(404).json({ success: false, message: error.message });
    }
  })
  .post(async (req, res) => {
    let { userId } = req;
    let notes = await Note.findOne({ uid: userId });
    const { videoId, text } = req.body;
    try {
      notes.notes.push({ videoId, text });
      notes = await notes.save();
      res
        .status(201)
        .json({ success: true, note: notes.notes[notes.notes.length - 1] });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });

router
  .route("/:userId/:noteId")
  .post(async (req, res) => {
    let { notes } = req;
    const { noteId } = req.params;
    const updateNote = req.body;
    try {
      let note = notes.notes.find((each) => each._id == noteId);
      if (note) {
        note = extend(note, updateNote);
        await notes.save();
        return res.status(200).json({ success: true, note });
      }
      res.status(400).json({ success: false, message: "note not found" });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  })
  .delete(async (req, res) => {
    let { userId } = req;
    let notes = await Note.findOne({ uid: userId });
    const { noteId } = req.params;
    try {
      const note = notes.notes.find((each) => each._id == noteId);
      if (note) {
        notes.notes.pull({ _id: noteId });
        await notes.save();
        res.status(200).json({ success: true, note });
      }
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  });
module.exports = router;
