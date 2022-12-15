const express = require('express');
const router = express.Router();
const User = require('../models/User');

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

module.exports = router;
