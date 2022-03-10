require("dotenv").config({ path: "./config.env" });
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const Routes = require('./routes');
const cors = require('cors')

const app = express();
const PORT = process.env.PORT || 8080;

// app configurations
app.set('port', PORT);

// load app middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('./client/'));
app.use(cors());

// load our API routes
app.use('/', Routes);

//connectDB();

// http server connection
app.listen(PORT, () =>
    console.log(`Server is listening at http://localhost:${PORT}`)
);


