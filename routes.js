const express = require("express");
const router = express.Router();
const { gen } = require("n-digit-token");
const fs = require("fs");
const path = require("path");
const { getSystemErrorMap } = require("util");

const createUser = (req, res, next) => {
    ID = gen(6);

    res.json({
        status: "success",
        id: ID,
    });
};

const createDB = (req, res, next) => {
    userID = req.body.id;
    let isNum= /^\d+$/.test(userID);

    const inputJSON = JSON.stringify(req.body.data);
    if (fs.existsSync(`./db/${userID}.json`)) {
        res.json({
            status: "failure",
            error: `A room with following ID: ${userID} already exists!`,
        });
    } else if (!isNum ||userID.lenght > 6 || userID.lenght < 6) {
        res.json({
            status: "failure",
            error: `This Id does not fit the requirements: ${userID}`,
        });
    } else {
        try {
            fs.writeFileSync(`./db/${userID}.json`, inputJSON);
        } catch (err) {
            console.log(err);
        }

        res.json({
            status: "success",
            id: userID,
            data: inputJSON,
        });
    }

    res.end();
};

const getData = (req, res, next) => {
    let code = req.body.id;
    console.log(code);
    try {
        if (fs.existsSync(`./db/${code}.json`)) {
            const dataJSON = fs.readFileSync(`./db/${code}.json`, "utf8");

            const data = JSON.parse(dataJSON);

            res.json({
                status: "sucess",
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

router.get("/api/createid", createUser);

router.post("/api/createdb", createDB);

router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./client/homePage/homePage.html"));
});

module.exports = router;
