const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const Post = require("./models/Post") // new

var data = JSON.parse(db);

const update = (req, res, next) => {
  res.json({
    status: 'success',
    data: req.body,
  });
};

const createID = (req, res, next) => {
  res.json({
    status: 'success',
    data: userID
  });
};

const getData = (req, res, next) => {
  res.json({
    status: 'success',
    data: data
  });
};
router.post('/update', update);

router.get('/data/:ID/', getData);

router.post('/create', createID);

module.exports = router;

