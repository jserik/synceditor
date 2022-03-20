const express = require("express");
const router = express.Router();
const { gen } = require("n-digit-token");
const fs = require("fs");
const path = require("path");

//const createUser = (req, res, next) => {
//    ID = gen(6);

//    res.json({
//        status: "success",
//        id: ID,
//    });
//};

const validate = (validateCode) => {
    let isNum = /^\d+$/.test(validateCode);
    try {
        if (isNum && fs.existsSync(`./db/${validateCode}.json`)) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log(err);
        return false;
    }
};

const checkName = (id, name) => {
    try {
        const dataJSON = fs.readFileSync(`./db/${id}.json`, "utf8");
        const raw = JSON.parse(dataJSON);
        const users = raw.users;

        for (i in users) {
            if (name == users[i]) {
                return false;
            }
        }
        const badwordsraw = fs.readFileSync(`./badwords.json`, "utf8");
        const badwords = JSON.parse(badwordsraw);
        for (i in badwords) {
            if (name == badwords[i]) {
                return false;
            }
        }
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Input: None
// Doing: creates ID and creates a database for same ID
// Output: your ID

const createDB = (req, res, next) => {
    ID = gen(6);
    text = { content: "Let's start edeting!", users: {} };
    const welcomeText = JSON.stringify(text);
    if (fs.existsSync(`./db/${ID}.json`)) {
        res.json({
            status: "failure",
            error: `A room with following ID: ${ID} already exists!`,
        });
    } else {
        try {
            fs.writeFileSync(`./db/${ID}.json`, welcomeText);
        } catch (err) {
            res.json({
                status: "failure",
                error: `Just try again`,
            });
        }
        res.json({
            status: "success",
            id: ID,
        });
    }
    res.end();
};

// Input: ID
// Output: returns current data for that ID
const getData = (req, res, next) => {
    let code = req.body.id;
    try {
        if (validate(code)) {
            const dataJSON = fs.readFileSync(`./db/${code}.json`, "utf8");
            const raw = JSON.parse(dataJSON);
            const data = raw.content;

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
        if (validate(code)) {
            input = { content: req.body.data, users: req.body.users };
            const inputJSON = JSON.stringify(input);

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

const addUser = (req, res, next) => {
    let code = req.body.id;
    let user = req.body.user;
    try {
        if (validate(code) && checkName(code, user)) {
            try {
                const dataJSON = fs.readFileSync(`./db/${code}.json`, "utf8");
                const raw = JSON.parse(dataJSON);
                raw.users.push(user);
                var json = JSON.stringify(raw, null, 2);
                fs.writeFileSync(`./db/${code}.json`, json);
            } catch (err) {
                console.log(err);
            }

            res.json({
                status: "sucess, updated",
                id: code,
                data: user,
            });
        } else {
            res.json({
                status: "failure",
                message: "Wrong ID or the name aleready exsists or the name is mutual!",
            });
        }
    } catch (err) {
        console.log(err);
    }
};

const returnUser = (req, res, next) => {
    let code = req.body.id;
    try {
        if (validate(code)) {
            const dataJSON = fs.readFileSync(`./db/${code}.json`, "utf8");

            const raw = JSON.parse(dataJSON);
            const data = raw.users;

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

router.post("/api/retrieve", getData);

router.post("/api/update", updateData);

router.post("/api/create", createDB);

router.post("/api/createuser", addUser);

router.post("/api/getuser", returnUser);

//home Page
router.get("/", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./client/homePage.html"));
});

//waiting Page
router.get("/wait", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./client/waitingPage.html"));
});

//editing Page
router.get("/edit", (req, res, next) => {
    res.sendFile(path.join(__dirname, "./client/editingPage.html"));
});

module.exports = router;
