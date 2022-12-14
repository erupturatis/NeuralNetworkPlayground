const express = require('express');
const router = express.Router();
const network = require('../models/network');
const ApiError = require('../error/ApiError');
const { asyncErr } = require('../error/error_handler');

router.get(
  '/:id',
  asyncErr(async (req, res, next) => {
    // gets the specified network
    let id = req.params.id;
    let package;
    try {
      result = await network.findById(id);
    } catch (err) {
      throw 'network not found';
    }
    res.send({
      msg: 'found network',
      result,
    });
  })
);

router.post(
  '/create',
  asyncErr(async (req, res) => {
    // creates a new post
    console.log('here got');
    let package = req.body.network;
    let response = await network.create({ ...package });
    res.status(201).send({
      id: response.id,
      name: response.name,
    });
  })
);

router.delete(
  '/:id',
  asyncErr(async (req, res) => {
    // deletes the specified post
    let response = await network.findByIdAndDelete(req.params.id);
    res.send({ msg: 'deleted network' });
  })
);

router.put(
  '/:id',
  asyncErr(async (req, res) => {
    // deletes the specified post
    let replacement = req.body.network;
    let response = await network.findByIdAndUpdate(req.params.id, {
      ...replacement,
    });
    res.send({ msg: 'updated network' });
  })
);

module.exports = router;
