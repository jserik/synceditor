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
        name = name.toLowerCase();

        for (i in users) {
            users[i] = users[i].toLowerCase();
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

// Input: ID
// Doing: creates ID and creates a database for same ID
// Output: if DB with that ID or not
const checkForID = (req, res, next) => {
    let ID = req.body.id;
    if (fs.existsSync(`./db/${ID}.json`)) {
        res.json({
            status: "success",
            id: ID,
        });
    }else{
        res.json({
            status: "failure",
            error: `Room doesn't exist!`,
        });
    }
    res.end();
}

// Input: None
// Doing: creates ID and creates a database for same ID
// Output: your ID

const createDB = (req, res, next) => {
    ID = gen(6);
    text = { content: "Let's start edeting!", users: [], lastEdited: "none" };
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
                status: "success",
                id: code,
                lastEditor: raw.lastEdited,
                data: data,
            });
        } else {
            res.json({
                status: "failure",
                error: "No Document with follwing ID could be found!",
            });
        }
    } catch (err) {
        res.send(err);
    }
};

// Input: ID, newText, last editor(user)
// Doing: updates database with your input
// Output: your ID + your input
const updateData = (req, res, next) => {
    let code = req.body.id;
    let user = req.body.editor;
    try {
        if (validate(code) & !checkName(code, user)) {
            const inputJSON = req.body.data;

            try {
                const dataJSON = fs.readFileSync(`./db/${code}.json`, "utf8");
                const raw = JSON.parse(dataJSON);
                raw.content = inputJSON;
                raw.lastEdited = user;
                var json = JSON.stringify(raw, null, 2);
                fs.writeFileSync(`./db/${code}.json`, json);
            } catch (err) {
                console.log(err);
            }

            res.json({
                status: "success, updated",
                id: code,
                data: inputJSON,
            });
        } else {
            res.json({
                status: "failure",
                error: "No Document with follwing ID could be found or the editor is no approved user!",
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
                status: "success",
                id: code,
                name: user,
            });
        } else {
            res.json({
                status: "failure",
                error:
                    //Wrong ID or the name aleready exsists or the name is mutual!
                    "User Name not allowed or allready exists!",
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
                status: "success",
                id: code,
                data: data,
            });
        } else {
            res.json({
                status: "failure",
                error: "No Document with follwing ID could be found!",
            });
        }
    } catch (err) {
        res.send(err);
    }
};

router.post("/api/checkID", checkForID);

router.post("/api/retrieve", getData);

router.post("/api/update", updateData);

router.post("/api/create", createDB);

router.post("/api/createUser", addUser);

router.post("/api/getUser", returnUser);

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
