const express = require("express");
const router = express.Router();
const { gen } = require("n-digit-token");
const fs = require("fs");
const path = require("path");
const { getSystemErrorMap } = require("util");

//const createUser = (req, res, next) => {
//    ID = gen(6);

//    res.json({
//        status: "success",
//        id: ID,
//    });
//};

// Input: None
// Doing: creates ID and creates a database for same ID
// Output: your ID
const createDB = (req, res, next) => {
    ID = gen(6);
    const welcomeText = JSON.stringify('Lets start edeting!');
    // let isNum= /^\d+$/.test(userID);
    // const inputJSON = JSON.stringify(req.body.data);
    if (fs.existsSync(`./db/${ID}.json`)) {
        res.json({
            status: "failure",
            error: `A room with following ID: ${ID} already exists!`,
        });
    // } else if (!isNum || userID.lenght > 6 || userID.lenght < 6) {
    //    res.json({
    //        status: "failure",
    //        error: `This Id does not fit the requirements: ${userID}`,
    //    });
    } else {
        try {
            fs.writeFileSync(`./db/${ID}.json`, welcomeText);
        } catch (err) {
            console.log(err);
        }

        res.json({
            status: "success",
            id: ID
        });
    }

    res.end();
};

// Input: ID
// Output: returns current data for that ID
const getData = (req, res, next) => {
    let code = req.body.id;
    try {
        if (fs.existsSync(`./db/${code}.json`)) {
            const dataJSON = fs.readFileSync(`./db/${code}.json`, "utf8");

            const data = JSON.parse(dataJSON);

            res.json({
                status: "sucess",
                id: code,
                data: data,
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
};

// Input: ID, newe Text
// Doing: updates database with your input
// Output: your ID + your input
const updateData = (req, res, next) => {
    let code = req.body.id;
    try {
        if (fs.existsSync(`./db/${code}.json`)) {
            const inputJSON = JSON.stringify(req.body.data);

            try {
                fs.writeFileSync(`./db/${code}.json`, inputJSON);
            } catch (err) {
                console.log(err);
            }

            res.json({
                status: "sucess, updated",
                id: code,
                data: inputJSON,
            });
        } else {
            res.json({
                status: "failure",
                message: "No Document with follwing ID could be found!",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

router.post("/api/retrieve", getData);

router.post("/api/update", updateData);

// router.get("/api/createid", createUser);

router.post("/api/create", createDB);

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./client/homePage/homePage.html"));
});

module.exports = router;
