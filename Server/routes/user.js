const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { asyncErr } = require('../error/error_handler');

router.post('/updateRecordings', async (req, res) => {
  // updating the user recordings IDS
  let recordings = req.body.recordings;
  recordings = recordings.slice(0, 3);
  await User.findOneAndUpdate(
    { email: req.user.email },
    { recordingID: recordings }
  );
  res.status(201).send('ok');
});

router.get('/getRecordings', async (req, res) => {
  // updating the user recordings IDS
  let recordings = req.body.recordings;
  recordings = recordings.slice(0, 3);
  await User.findOneAndUpdate(
    { email: req.user.email },
    { recordingID: recordings }
  );
  res.status(201).send('ok');
});

router.patch(
  '/networkIDS',
  asyncErr(async (req, res, next) => {
    console.log('pathcing ');
    let id = req.body.id;
    let networkIDS = req.body.networkIDS;
    console.log(id);
    console.log(networkIDS);
    // updating in database
    await User.findOneAndUpdate(id, {
      networkID: networkIDS,
    });
    res.status(201).send('ok');
  })
);

module.exports = router;
