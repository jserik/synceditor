const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const Routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// app configurations
app.set('port', PORT);

// load app middlewares
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// load our API routes
app.use('/', Routes);

// http server connection
app.listen(PORT, () =>
    console.log(`Server is listening at http://localhost:${PORT}`)
);

