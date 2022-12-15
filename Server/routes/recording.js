const express = require('express');
const router = express.Router();

router.get('/:num', (req, res) => {
  // gets the num recording for logged user
  console.log(req.user);
  // let index = req.params.num;
  // let recording = req.user.recording[index];
  res.send('work');
});

module.exports = router;
