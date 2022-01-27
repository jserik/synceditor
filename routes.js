const express = require('express');
const router = express.Router();

// import files

//const schema = require('./schema')
// generic route handler
const genericHandler = (req, res, next) => {
  res.json({
    status: 'success',
    data: req.body
  });
};

// update text
router.post('/update', genericHandler);

// change auth credentials for teachers
router.get('/data', genericHandler);


module.exports = router;
