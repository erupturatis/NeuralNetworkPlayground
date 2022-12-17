const express = require('express');
const router = express.Router();
const Recording = require('../models/Recording');
const ApiError = require('../error/ApiError');
const { asyncErr } = require('../error/error_handler');
router.get(
  '/:id',
  asyncErr(async (req, res, next) => {
    // gets the specified recording
    let id = req.params.id;
    let recording;
    try {
      recording = await Recording.findById('639b7d0ba0117ef4e0ed54e3');
    } catch (err) {
      throw 'Recording not found';
    }
    res.send({
      msg: 'found recording',
      recording,
    });
  })
);

router.post(
  '/createPost',
  asyncErr(async (req, res) => {
    // creates a new post
    let recording = req.body.recording;
    let response = await Recording.create(recording);
    res.status(201).send(response.id);
  })
);

router.delete(
  '/:id',
  asyncErr(async (req, res) => {
    // deletes the specified post
    let recording = await Recording.findByIdAndDelete(req.params.id);
    res.send({ msg: 'deleted recording' });
  })
);

router.put(
  '/:id',
  asyncErr(async (req, res) => {
    // deletes the specified post
    let replacement = req.body.recording;
    let recording = await Recording.findByIdAndUpdate(req.params.id, {
      ...replacement,
    });
    res.send({ msg: 'updated recording' });
  })
);

module.exports = router;
