const express = require('express');
const router = express.Router();
const { gen } = require('n-digit-token');
const fs = require('fs');

const createID = (req, res, next) => {
  ID = gen(6);
  const inputJSON = JSON.stringify(req.body.data);
  try {
    fs.writeFileSync(`./db/${ID}.json`, inputJSON);

  } catch (err) {
    res.send(err);
  }

  res.json({
    status: 'success',
    data: ID,
  });
};

const getData = (req, res, next) => {
  let code = req.body.id;
  try {
    if (fs.existsSync(`./db/${code}.json`)) {
      const dataJSON = fs.readFileSync(`./db/${code}.json`, 'utf8');

      const data = JSON.parse(dataJSON);

      res.json({
        status: "sucess",
        data: data
      });
    } else {
      res.json({
        status: "failure",
        message: "No Document with follwing ID could be found!",
      });
    }
  } catch (err) {
    res.send(err);
  }
}

const updateData = (req, res, next) => {
  let code = req.body.id;
  try {
    if (fs.existsSync(`./db/${code}.json`)) {
      const inputJSON = JSON.stringify(req.body.data);

      try {
        fs.writeFileSync(`./db/${code}.json`, inputJSON);

      } catch (err) {
        console.log(err)
      }

      res.json({
        status: "sucess, updated",
        data: inputJSON
      });
    } else {
      res.json({
        status: "failure",
        message: "No Document with follwing ID could be found!",
      });
    }
  } catch (err) {
    console.log(err)

  }
}


router.post('/retrieve', getData);

router.post('/update', updateData);

router.post('/create', createID);

module.exports = router;

