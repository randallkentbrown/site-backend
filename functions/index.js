const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors')({ origin: true });
const accessControl = require("./cors.js").accessControl;
const app = express();
app.use(cors);

const pages = require("./src/routes/pages.js").route;
const resume_uri = require("./src/routes/resume_uri.js").route;

app.get('/*', accessControl);
app.get('/pages', pages);
app.get('/resume_uri', resume_uri);

exports.app = functions.https.onRequest(app);
