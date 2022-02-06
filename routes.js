const express = require('express');
const router = express.Router();
const { gen } = require('n-digit-token');

const update = (req, res, next) => {
  res.json({
    status: 'success',
    data: req.body,
  });
};

const createID = (req, res, next) => {
  ID = gen(6);
  res.json({
    status: 'success',
    data: ID,
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

