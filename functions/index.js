const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });
const accessControl = require("./cors.js").accessControl;
const app = express();
app.use(cors);

const pages = require('./src/routes/pages.js').route;

app.get('/*', accessControl);
app.get('/pages', pages);

exports.app = functions.https.onRequest(app);
