const express = require('express');
const router = express.Router();
const Recording = require('../models/Recording');

router.get('/:id', async (req, res) => {
  // gets the specified recording
  let recording = await Recording.findById(req.params.id);
  res.send('found recording');
});

router.post('/createPost', async (req, res) => {
  // creates a new post
  let recording = req.body.recording;
  let response = await Recording.create(recording);
  console.log(response);
  console.log(response.id);

  res.status(201).send(response.id);
});

router.delete('/:id', async (req, res) => {
  // deletes the specified post
  let recording = await Recording.findByIdAndDelete(req.params.id);
  res.send('deleted recording');
});

module.exports = router;
